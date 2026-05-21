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

const ADMIN_EMAIL = 'shoveltonnoah80@gmail.com';

const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

/* ==========================================
   SKINS
========================================== */

const skins = {
    Vandal: [
        {
            id: 'prime_vandal',
            name: 'Prime Vandal',
            collection: 'Prime Collection',
            image: 'https://static.wikia.nocookie.net/valorant/images/a/aa/Prime_Vandal.png/revision/latest'
        },
        {
            id: 'reaver_vandal',
            name: 'Reaver Vandal',
            collection: 'Reaver Collection',
            image: 'https://static.wikia.nocookie.net/valorant/images/2/27/Reaver_Vandal.png/revision/latest?cb=20230711203347'
        },
        {
            id: 'kuronami_vandal',
            name: 'Kuronami Vandal',
            collection: 'Kuronami Collection',
            image: 'https://static.wikia.nocookie.net/valorant/images/2/2e/Kuronami_Vandal.png/revision/latest?cb=20240109154323'
        }
    ],

    Phantom: [
        {
            id: 'oni_phantom',
            name: 'Oni Phantom',
            collection: 'Oni Collection',
            image: 'https://static.wikia.nocookie.net/valorant/images/6/65/Oni_Phantom.png/revision/latest?cb=20230711201948'
        },
        {
            id: 'champions24_phantom',
            name: 'Champions 2024 Phantom',
            collection: 'Champions',
            image: 'https://static.wikia.nocookie.net/valorant/images/8/8c/Champions_2024_Phantom.png/revision/latest?cb=20240730145457'
        }
    ],

    Operator: [
        {
            id: 'reaver_operator',
            name: 'Reaver Operator',
            collection: 'Reaver Collection',
            image: 'https://static.wikia.nocookie.net/valorant/images/e/e7/Reaver_Operator.png/revision/latest?cb=20230711203258'
        },
        {
            id: 'ion_operator',
            name: 'Ion Operator',
            collection: 'Ion Collection',
            image: 'https://static.wikia.nocookie.net/valorant/images/b/b8/Ion_Operator.png/revision/latest?cb=20230711195909'
        }
    ]
};

/* ==========================================
   ELEMENTS
========================================== */

const appElement = document.getElementById('app');

const ownedCountEl = document.getElementById('ownedCount');
const totalCountEl = document.getElementById('totalCount');
const completionEl = document.getElementById('completion');

const searchInput = document.getElementById('search');
const filterOwned = document.getElementById('filterOwned');

const modeLabel = document.getElementById('modeLabel');

const loginBtn = document.getElementById('loginBtn');
const passwordInput = document.getElementById('adminPassword');

/* ==========================================
   STATE
========================================== */

let ownedSkins = {};
let adminMode = false;

/* ==========================================
   OWNER LOGIN
========================================== */

loginBtn.onclick = async () => {
    const password = passwordInput.value.trim();

    if (!password) {
        alert('Enter password');
        return;
    }

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
   REALTIME DATABASE
========================================== */

onValue(ref(db, 'ownedSkins'), snapshot => {

    ownedSkins = snapshot.val() || {};

    render();
});

/* ==========================================
   RENDER
========================================== */

function render() {

    appElement.innerHTML = '';

    const query = searchInput.value.toLowerCase();
    const filter = filterOwned.value;

    let total = 0;
    let owned = 0;

    Object.entries(skins).forEach(([weapon, weaponSkins]) => {

        const section = document.createElement('section');
        section.className = 'weapon-section';

        const title = document.createElement('div');
        title.className = 'weapon-title';
        title.textContent = weapon;

        const grid = document.createElement('div');
        grid.className = 'skin-grid';

        let visibleCards = 0;

        weaponSkins.forEach(skin => {

            total++;

            const appearances = ownedSkins[skin.id] || 0;

            const isOwned = appearances > 0;

            if (isOwned) owned++;

            const matchesSearch =
                skin.name.toLowerCase().includes(query) ||
                skin.collection.toLowerCase().includes(query);

            const matchesFilter =
                filter === 'all' ||
                (filter === 'owned' && isOwned) ||
                (filter === 'missing' && !isOwned);

            if (!matchesSearch || !matchesFilter) return;

            visibleCards++;

            const card = document.createElement('div');

            card.className = 'skin-card';

            card.innerHTML = `
                <img 
                    class="skin-image" 
                    src="${skin.image}" 
                    alt="${skin.name}"
                    loading="lazy"
                    onerror="this.src='https://placehold.co/400x200/111827/ffffff?text=No+Image'"
                >

                <div class="skin-content">

                    <div class="skin-name">
                        ${skin.name}
                    </div>

                    <div class="skin-collection">
                        ${skin.collection}
                    </div>

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

                const minusBtn = document.createElement('button');
                minusBtn.textContent = '-';

                const countText = document.createElement('span');
                countText.textContent = appearances;

                const plusBtn = document.createElement('button');
                plusBtn.textContent = '+';

                plusBtn.onclick = async () => {
                    const snapshot = await get(ref(db, `ownedSkins/${skin.id}`));
                    const current = snapshot.val() || 0;
                    await update(ref(db, 'ownedSkins'), {
                        [skin.id]: current + 1
                    });
                };

                minusBtn.onclick = async () => {
                    const snapshot = await get(ref(db, `ownedSkins/${skin.id}`));
                    const current = snapshot.val() || 0;
                    await update(ref(db, 'ownedSkins'), {
                        [skin.id]: Math.max(0, current - 1)
                    });
                };

                controls.appendChild(minusBtn);
                controls.appendChild(countText);
                controls.appendChild(plusBtn);

                card
                    .querySelector('.skin-content')
                    .appendChild(controls);
            }

            grid.appendChild(card);
        });

        if (visibleCards > 0) {

            section.appendChild(title);
            section.appendChild(grid);

            appElement.appendChild(section);
        }
    });

    ownedCountEl.textContent = owned;
    totalCountEl.textContent = total;

    const percent =
        total > 0
            ? Math.round((owned / total) * 100)
            : 0;

    completionEl.textContent = percent + '%';
}

/* ==========================================
   EVENTS
========================================== */

searchInput.addEventListener(
    'input',
    render
);

filterOwned.addEventListener(
    'change',
    render
);

/* ==========================================
   INITIAL RENDER
========================================== */

render();
