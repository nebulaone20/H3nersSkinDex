import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';

import {
    getDatabase,
    ref,
    onValue,
    update,
    get
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js';

/* ==========================================
   FIREBASE SETUP
========================================== */

const firebaseConfig = {
    apiKey: "AIzaSyAzeUIWTkUDSnkFGz1us1x9yRBENp4ZK5U",
    authDomain: "skindex-d7440.firebaseapp.com",
    databaseURL: "https://skindex-d7440-default-rtdb.firebaseio.com",
    projectId: "skindex-d7440",
    storageBucket: "skindex-d7440.firebasestorage.app",
    messagingSenderId: "964711838862",
    appId: "1:964711838862:web:73cbf1ac47f96263fa45df"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

/* ==========================================
   SKIN CONFIG
========================================== */

// Preferred display order for weapon categories
const WEAPON_ORDER = [
    'Classic', 'Shorty', 'Frenzy', 'Ghost', 'Bandit', 'Sheriff',
    'Stinger', 'Spectre', 'Bucky', 'Judge',
    'Bulldog', 'Guardian', 'Phantom', 'Vandal',
    'Marshal', 'Outlaw', 'Operator', 'Ares', 'Odin', 'Melee'
];

// Collections to exclude — matched against theme display name (partial match)
const EXCLUDED_COLLECTIONS = [
    '5 Years // Beta Remastered',
    'Champions 2021',
    'Champions 2022',
    'Champions 2023',
    'Champions 2024',
    'Champions 2025',

    // VCT
    'VCT',

    // Standard
    'Standard',

    // Battlepass Collections
    '.EXE',
    '.SYS',
    '9 Lives',
    'Aero',
    'Aerosol',
    'ATLAS // CMD',
    'Aquatica',
    'Artisan',
    'Belaflaire',
    'Blush',
    'Bound',
    'Bubble Pop',
    'Bulletbox',
    'Bumble Brigade',
    'Byteshift',
    'Cavalier',
    'Celestia',
    'Cloudweaver',
    'Coalition',
    'Coalition: Cobra',
    'Composite',
    'Convergence',
    'Couture',
    'Comet',
    'Crash Out',
    'Depths',
    'Digihex',
    'Divine Swine',
    'Doom Wing',
    'Dragon Gate',
    'Fiber Optic',
    'Freehand',
    'Frequency',
    'Genesis',
    'Goldwing',
    'Gridcrash',
    'Guardrail',
    'Haloform',
    'Heartbreaker',
    'Heartseeker',
    'Heartstopper',
    'Hieroscape',
    'Hivemind',
    'Hue Shift',
    'Hydrodip',
    'Immortalized',
    'Infinity',
    'Insidious',
    'Interhelm',
    'Iridian Thorn',
    'Jigsaw',
    'K/TAC',
    'KTAC',
    'Keys to Elysium',
    'Kingdom',
    'Libretto',
    'Lightwave',
    'Lycan\'s Bane',
    'Monarch',
    'Monstrocity',
    'Montage',
    'Moon Scout',
    'Moondash',
    'Nanobreak',
    'Nitro',
    'Outpost',
    'Overlay',
    'Paceline',
    'Panoramic',
    'Perch',
    'Piedra del Sol',
    'POLYfox',
    'POLYfrog',
    'Premiere Collision',
    'Prism III',
    'RDVR',
    'Red Alert',
    'Refractrix',
    'Retrowave',
    'Ruin',
    'Rune Stone',
    'Sandswept',
    'Schema',
    'Serenity',
    'Shellspire',
    'Shimmer',
    'Signature',
    'Silhouette',
    'Solarex',
    'Songsteel',
    'Soulburst',
    'Space Piercer',
    'Spellbound',
    'Spitfire',
    'Starlit Odyssey',
    'Stormborne',
    'Striker',
    'Superset',
    'Surge',
    'Tacti-Series',
    'Tacti-Treat',
    'Tactiplay',
    'Task Force 809',
    'Tilde',
    'Topotek',
    'Torque',
    'Transition',
    'Varnish',
    'Velocity',
    'Venturi',
    'Yoonseul',

    // Agent gear
    'Astra',
    'Breach',
    'Brimstone',
    'Chamber',
    'Clove',
    'Cypher',
    'Deadlock',
    'Fade',
    'Gekko',
    'Harbor',
    'Iso',
    'Jett',
    'KAY/O',
    'Killjoy',
    'Miks',
    'Neon',
    'Omen',
    'Phoenix',
    'Raze',
    'Reyna',
    'Sage',
    'Skye',
    'Sova',
    'Tejo',
    'Veto',
    'Viper',
    'Vyse',
    'Waylay',
    'Yoru',
];

// Individual skin display names to exclude (exact match)
const EXCLUDED_SKIN_NAMES = new Set([
    'Random Favorite Skin',
]);

/* ==========================================
   SKINS STATE
========================================== */

let skins = {};
let skinsLoaded = false;

async function loadSkins() {
    try {
        showLoader('Fetching skins...');

        const [weaponsRes, themesRes] = await Promise.all([
            fetch('https://valorant-api.com/v1/weapons?language=en-US'),
            fetch('https://valorant-api.com/v1/themes?language=en-US')
        ]);

        const weaponsJson = await weaponsRes.json();
        const themesJson  = await themesRes.json();

        // Build theme UUID → display name map
        const themeMap = {};
        for (const theme of themesJson.data) {
            themeMap[theme.uuid] = theme.displayName;
        }

        const result = {};

        for (const weapon of weaponsJson.data) {
            // Use the weapon's displayName as the key (e.g. "Classic", "Bandit", "Melee")
            // The melee weapon in the API is literally named "Melee"
            const weaponKey = weapon.displayName;

            result[weaponKey] = [];

            for (const skin of weapon.skins) {
                // Skip default/standard skins (no theme = bare gun model)
                if (!skin.themeUuid) continue;

                // Skip battlepass and agent gear skins — store bundle skins always
                // have a contentTierUuid (Select/Deluxe/Premium/Exclusive/Ultra).
                // Battlepass and agent gear skins have contentTierUuid: null.
                if (!skin.contentTierUuid) continue;

                const collectionName = themeMap[skin.themeUuid] || '';

                if (
                    EXCLUDED_COLLECTIONS.some(ex =>
                        collectionName.toLowerCase().includes(ex.toLowerCase())
                    )
                ) continue;

                // Skip excluded collections (theme name partial match)
                if (EXCLUDED_COLLECTIONS.some(ex => collectionName.includes(ex))) continue;

                // Skip excluded individual skins (exact name match)
                if (EXCLUDED_SKIN_NAMES.has(skin.displayName)) continue;

                // Prefer level 1 icon, fall back to skin icon
                const image =
                    skin.levels?.[0]?.displayIcon ||
                    skin.displayIcon ||
                    null;

                if (!image) continue;

                result[weaponKey].push({
                    id:         skin.uuid,
                    name:       skin.displayName,
                    collection: collectionName + ' Collection',
                    image,
                });
            }

            // Sort alphabetically
            result[weaponKey].sort((a, b) => a.name.localeCompare(b.name));
        }

        // Sort weapon keys: preferred order first, then any new ones alphabetically
        const sorted = {};
        // First add weapons in preferred order if they exist
        for (const key of WEAPON_ORDER) {
            if (result[key]) sorted[key] = result[key];
        }
        // Then add any weapons the API has that aren't in our order list
        for (const key of Object.keys(result)) {
            if (!sorted[key]) sorted[key] = result[key];
        }

        skins = sorted;
        skinsLoaded = true;

        // Rebuild the filter dropdown to match whatever weapons the API returned
        rebuildFilterDropdown();

    } catch (err) {
        console.error('Failed to load skins:', err);
        document.getElementById('app').innerHTML =
            `<p style="padding:24px;color:#f87171;">
                Failed to load skins from Valorant API. Check your connection and refresh.
             </p>`;
    }
}

/* ==========================================
   REBUILD FILTER DROPDOWN DYNAMICALLY
========================================== */

function rebuildFilterDropdown() {
    const select = document.getElementById('filterOwned');
    select.innerHTML = '<option value="all">All Guns</option>';
    for (const weaponKey of Object.keys(skins)) {
        // Only add to dropdown if it has at least one skin
        if (skins[weaponKey].length > 0) {
            const opt = document.createElement('option');
            opt.value = weaponKey;
            opt.textContent = weaponKey;
            select.appendChild(opt);
        }
    }
}

/* ==========================================
   LOADER
========================================== */

function showLoader(msg = 'Loading skins...') {
    document.getElementById('app').innerHTML = `
        <div style="
            display:flex;flex-direction:column;align-items:center;
            justify-content:center;gap:16px;padding:80px 24px;
        ">
            <div style="
                width:48px;height:48px;border-radius:50%;
                border:3px solid rgba(255,70,85,0.2);
                border-top-color:#ff4655;
                animation:spin 0.8s linear infinite;
            "></div>
            <p style="opacity:0.6;font-family:Orbitron,sans-serif;font-size:0.85rem;letter-spacing:1px;">
                ${msg}
            </p>
        </div>
        <style>@keyframes spin { to { transform: rotate(360deg); } }</style>
    `;
}

/* ==========================================
   ELEMENTS
========================================== */

const appElement    = document.getElementById('app');
const ownedCountEl  = document.getElementById('ownedCount');
const totalCountEl  = document.getElementById('totalCount');
const completionEl  = document.getElementById('completion');
const searchInput   = document.getElementById('search');
const filterOwned   = document.getElementById('filterOwned');
const modeLabel     = document.getElementById('modeLabel');
const loginBtn      = document.getElementById('loginBtn');
const passwordInput = document.getElementById('adminPassword');

/* ==========================================
   STATE
========================================== */

let ownedSkins = {};
let fullyOwnedSkins = {};
let adminMode  = false;

/* ==========================================
   OWNER LOGIN
========================================== */

loginBtn.onclick = async () => {
    const password = passwordInput.value.trim();
    if (!password) { alert('Enter password'); return; }

    const snapshot = await get(ref(db, 'ownerPassword'));
    const correctPassword = snapshot.val();

    if (password === correctPassword) {
        adminMode = true;
        modeLabel.textContent = 'Owner Mode';
        modeLabel.style.color = '#4ade80';
        passwordInput.value = '';
        render();
    } else {
        alert('Invalid password');
    }
};

/* ==========================================
   OPTIONAL LOGOUT
========================================== */

window.logoutAdmin = function () {
    adminMode = false;
    modeLabel.textContent = 'Viewer Mode';
    modeLabel.style.color = 'white';
    render();
};

/* ==========================================
   RENDER
========================================== */

function render() {
    if (!skinsLoaded) return;

    appElement.innerHTML = '';

    const query  = searchInput.value.toLowerCase();
    const filter = filterOwned.value;

    let total = 0;
    let owned = 0;

    for (const [weapon, weaponSkins] of Object.entries(skins)) {

        const section = document.createElement('section');
        section.className = 'weapon-section';

        const title = document.createElement('div');
        title.className = 'weapon-title';
        title.textContent = weapon;

        const grid = document.createElement('div');
        grid.className = 'skin-grid';

        let visibleCards = 0;

        for (const skin of weaponSkins) {

            total++;

            const appearances = ownedSkins[skin.id] || 0;
            if (appearances > 0) owned++;

            const matchesSearch =
                skin.name.toLowerCase().includes(query) ||
                skin.collection.toLowerCase().includes(query);

            const matchesFilter =
                filter === 'all' ||
                filter === weapon;

            if (!matchesSearch || !matchesFilter) continue;

            visibleCards++;

            const card = document.createElement('div');

            const isFullyOwned = fullyOwnedSkins[skin.id] === true;

            card.className = 'skin-card';

            if (isFullyOwned) {
                card.classList.add('skin-card-owned');
            }

            card.innerHTML = `
                <img
                    class="skin-image"
                    src="${skin.image}"
                    alt="${skin.name}"
                    loading="lazy"
                    onerror="this.src='https://placehold.co/400x200/111827/ffffff?text=No+Image'"
                >
                <div class="skin-content">
                    <div class="skin-name">${skin.name}</div>
                    <div class="skin-collection">${skin.collection}</div>
                    <div class="owner-tag ${appearances > 0 ? 'owner-yes' : 'owner-no'}">
                        Seen ${appearances} time${appearances === 1 ? '' : 's'}
                    </div>
                </div>
            `;

            /* ==========================================
               ADMIN CONTROLS
            ========================================== */

            if (adminMode) {
                const controls = document.createElement('div');
                controls.className = 'owned';

                const minusBtn  = document.createElement('button');
                minusBtn.textContent = '-';

                const countText = document.createElement('span');
                countText.textContent = appearances;

                const plusBtn = document.createElement('button');
                plusBtn.textContent = '+';

                plusBtn.onclick = async () => {
                    const snap    = await get(ref(db, `ownedSkins/${skin.id}`));
                    const current = snap.val() || 0;
                    await update(ref(db, 'ownedSkins'), { [skin.id]: current + 1 });
                };

                minusBtn.onclick = async () => {
                    const snap    = await get(ref(db, `ownedSkins/${skin.id}`));
                    const current = snap.val() || 0;
                    await update(ref(db, 'ownedSkins'), { [skin.id]: Math.max(0, current - 1) });
                };

                controls.appendChild(minusBtn);
                controls.appendChild(countText);
                controls.appendChild(plusBtn);

                const ownedBtn = document.createElement('button');

                ownedBtn.textContent = isFullyOwned ? '★' : '☆';
                ownedBtn.title = 'Toggle Fully Owned';

                ownedBtn.style.background = isFullyOwned
                    ? 'linear-gradient(135deg,#ff4655,#ff7b86)'
                    : '#222';

                ownedBtn.onclick = async () => {

                    const current =
                        fullyOwnedSkins[skin.id] === true;

                    await update(ref(db, 'fullyOwnedSkins'), {
                        [skin.id]: !current
                    });
                };

                controls.appendChild(ownedBtn);

                card.querySelector('.skin-content').appendChild(controls);
            }

            grid.appendChild(card);
        }

        if (visibleCards > 0) {
            section.appendChild(title);
            section.appendChild(grid);
            appElement.appendChild(section);
        }
    }

    ownedCountEl.textContent = owned;
    totalCountEl.textContent = total;
    completionEl.textContent = total > 0 ? Math.round((owned / total) * 100) + '%' : '0%';
}

/* ==========================================
   EVENTS
========================================== */

searchInput.addEventListener('input', render);
filterOwned.addEventListener('change', render);

/* ==========================================
   BOOT — load skins then subscribe to Firebase
========================================== */

(async () => {
    await loadSkins();

    onValue(ref(db, 'ownedSkins'), snapshot => {
        ownedSkins = snapshot.val() || {};
        render();
    });

    onValue(ref(db, 'fullyOwnedSkins'), snapshot => {
        fullyOwnedSkins = snapshot.val() || {};
        render();
    });
})();
