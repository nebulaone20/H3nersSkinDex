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
    Classic: [
        {
            id: 'Avalanche',
            name: 'Avalanche Classic',
            collection: 'Avalanche Collection',
            image: 'https://static.wikia.nocookie.net/valorant/images/9/92/Avalanche_Classic.png/revision/latest?cb=20230711192713'
        },
        {
            id: 'black.market_classic',
            name: 'Black Market Classic',
            collection: 'Black Market Collection',
            image: 'https://static.wikia.nocookie.net/valorant/images/e/e8/Black.Market_Classic.png/revision/latest?cb=20230711192817'
        },
        {
            id: 'blackthorn_classic',
            name: 'Blackthorn Classic',
            collection: 'Blackthorn Collection',
            image: 'https://static.wikia.nocookie.net/valorant/images/5/5d/Blackthorn_Classic.png/revision/latest?cb=20260317165948'
        },
    ],

    Shorty: [
        {
            id: 'araxys_shorty',
            name: 'Araxys Shorty',
            collection: 'Araxys Collection',
            image: 'https://static.wikia.nocookie.net/valorant/images/e/e4/Araxys_Shorty.png/revision/latest?cb=20230711192434'
        },
        {
            id: 'chromedek_shorty',
            name: 'Chromedek Shorty',
            collection: 'Chromedek Collection',
            image: 'https://static.wikia.nocookie.net/valorant/images/8/86/Chromedek_Shorty.png/revision/latest?cb=20231114172535'
        }
    ],

    Frenzy: [
        {
            id: 'blastX_frenzy',
            name: 'BlastX Frenzy',
            collection: 'BlastX Collection',
            image: 'https://static.wikia.nocookie.net/valorant/images/b/b4/BlastX_Frenzy.png/revision/latest?cb=20230711192904'
        },
        {
            id: 'bolt_frenzy',
            name: 'Bolt Frenzy',
            collection: 'Bolt Collection',
            image: 'https://static.wikia.nocookie.net/valorant/images/a/a9/Bolt_Frenzy.png/revision/latest?cb=20250402172926'
        },
        {
            id: 'celestial_frenzy',
            name: 'Celestial Frenzy',
            collection: 'Celestial Collection',
            image: 'https://static.wikia.nocookie.net/valorant/images/1/1b/Celestial_Frenzy.png/revision/latest?cb=20230711193156'
        },
    ],

    Ghost: [
        {
            id: 'Aperture_ghost',
            name: 'Aperture Ghost',
            collection: 'Aperture Collection',
            image: 'https://static.wikia.nocookie.net/valorant/images/8/8e/Aperture_Ghost.png/revision/latest?cb=20240910162922'
        },
        {
            id : 'Ayakashi_ghost',
            name: 'Ayakashi Ghost',
            collection: 'Ayakashi Collection',
            image: 'https://static.wikia.nocookie.net/valorant/images/9/9e/Ayakashi_Ghost.png/revision/latest?cb=20260106171429'
        },
    ],

    Bandit: [

    ],

    Sheriff: [
        {
            id: 'abyssal_sheriff',
            name: 'Abyssal Sheriff',
            collection: 'Abyssal Collection',
            image: 'https://static.wikia.nocookie.net/valorant/images/e/ec/Abyssal_Sheriff.png/revision/latest?cb=20230711192027'
        },
        {
            id: 'Aemondir_sheriff',
            name: 'Aemondir Sheriff',
            collection: 'Aemondir Collection',
            image: 'https://static.wikia.nocookie.net/valorant/images/0/02/Aemondir_Sheriff.png/revision/latest?cb=20240621121632'
        },
        {
            id: 'Altitude_sheriff',
            name: 'Altitude Sheriff',
            collection: 'Altitude Collection',
            image: 'https://static.wikia.nocookie.net/valorant/images/e/eb/Altitude_Sheriff.png/revision/latest?cb=20230711192240'
        },
        {
            id: 'araxys_sheriff',
            name: 'Araxys Sheriff',
            collection: 'Araxys Collection',
            image: 'https://static.wikia.nocookie.net/valorant/images/3/31/Araxys_Sheriff.png/revision/latest?cb=20241210223757'
        },
        {
            id: 'aristocrat_sheriff',
            name: 'Aristocrat Sheriff',
            collection: 'Aristocrat Collection',
            image: 'https://static.wikia.nocookie.net/valorant/images/e/ea/Aristocrat_Sheriff.png/revision/latest?cb=20230711192530'
        },
        {
            id: 'bubblegum_deathwish_sheriff',
            name: 'Bubblegum Deathwish Sheriff',
            collection: 'Bubblegum Collection',
            image: 'https://static.wikia.nocookie.net/valorant/images/3/31/Bubblegum_Deathwish_Sheriff.png/revision/latest?cb=20250820141143'
        },
    ],

    Stinger: [
        {
            id: 'aristocrat_stinger',
            name: 'Aristocrat Stinger',
            collection: 'Aristocrat Collection',
            image: 'https://static.wikia.nocookie.net/valorant/images/b/bf/Aristocrat_Stinger.png/revision/latest?cb=20230711192540'
        },
        {
            id: 'bubblegum_deathwish_stinger',
            name: 'Bubblegum Deathwish Stinger',
            collection: 'Bubblegum Collection',
            image: 'https://static.wikia.nocookie.net/valorant/images/0/03/Bubblegum_Deathwish_Stinger.png/revision/latest?cb=20250820141147'
        },
    ],

    Spectre: [
        {
            id: 'abyssal_spectre',
            name: 'Abyssal Spectre',
            collection: 'Abyssal Collection',
            image: 'https://static.wikia.nocookie.net/valorant/images/6/61/Abyssal_Spectre.png/revision/latest?cb=20230711192034'
        },
        {
            id: 'avalanche_spectre',
            name: 'Avalanche Spectre',
            collection: 'Avalanche Collection',
            image: 'https://static.wikia.nocookie.net/valorant/images/f/f5/Avalanche_Spectre.png/revision/latest?cb=20230711192751'
        },
        {
            id: 'blastX_spectre',
            name: 'BlastX Spectre',
            collection: 'BlastX Collection',
            image: 'https://static.wikia.nocookie.net/valorant/images/c/c6/BlastX_Spectre.png/revision/latest?cb=20230711193004'
        },
        {
            id: 'bolt_spectre',
            name: 'Bolt Spectre',
            collection: 'Bolt Collection',
            image: 'https://static.wikia.nocookie.net/valorant/images/7/74/Bolt_Spectre.png/revision/latest?cb=20250402172959'
        },
    ],

    Bucky: [
        {
            id: 'Aemondir_bucky',
            name: 'Aemondir Bucky',
            collection: 'Aemondir Collection',
            image: 'https://static.wikia.nocookie.net/valorant/images/a/ac/Aemondir_Bucky.png/revision/latest?cb=20240621121556'
        },
        {
            id: 'altitude_bucky',
            name: 'Altitude Bucky',
            collection: 'Altitude Collection',
            image: 'https://static.wikia.nocookie.net/valorant/images/d/db/Altitude_Bucky.png/revision/latest?cb=20230711192217'
        }
    ],

    Judge: [
        {
            id: 'celestial_judge',
            name: 'Celestial Judge',
            collection: 'Celestial Collection',
            image: 'https://static.wikia.nocookie.net/valorant/images/0/00/Celestial_Judge.png/revision/latest?cb=20230711193201'
        },
    ],

    Bulldog: [
        {
            id: 'aemondir_bulldog',
            name: 'Aemondir Bulldog',
            collection: 'Aemondir Collection',
            image: 'https://static.wikia.nocookie.net/valorant/images/f/f3/Aemondir_Bulldog.png/revision/latest?cb=20240621121616'
        },
        {
            id: 'aperture_bulldog',
            name: 'Aperture Bulldog',
            collection: 'Aperture Collection',
            image: 'https://static.wikia.nocookie.net/valorant/images/a/ae/Aperture_Bulldog.png/revision/latest?cb=20240910162921'
        },
        {
            id: 'araxys_bulldog',
            name: 'Araxys Bulldog',
            collection: 'Araxys Collection',
            image: 'https://static.wikia.nocookie.net/valorant/images/2/24/Araxys_Bulldog.png/revision/latest?cb=20230711192336'
        },
        {
            id: 'aristocrat_bulldog',
            name: 'Aristocrat Bulldog',
            collection: 'Aristocrat Collection',
            image: 'https://static.wikia.nocookie.net/valorant/images/4/4b/Aristocrat_Bulldog.png/revision/latest?cb=20230711192524'
        },
        {
            id: 'black.market_bulldog',
            name: 'Black Market Bulldog',
            collection: 'Black Market Collection',
            image: 'https://static.wikia.nocookie.net/valorant/images/4/4b/Black.Market_Bulldog.png/revision/latest?cb=20230711192805'
        },
        {
            id: 'chromedek_bulldog',
            name: 'Chromedek Bulldog',
            collection: 'Chromedek Collection',
            image: 'https://static.wikia.nocookie.net/valorant/images/1/1a/Chromedek_Bulldog.png/revision/latest?cb=20231114172535'
        },
    ],

    Guardian: [
        {
            id: 'abyssal_guardian',
            name: 'Abyssal Guardian',
            collection: 'Abyssal Collection',
            image: 'https://static.wikia.nocookie.net/valorant/images/a/a3/Abyssal_Guardian.png/revision/latest?cb=20230711192014'
        },
        {
            id: 'araxys_guardian',
            name: 'Araxys Guardian',
            collection: 'Araxys Collection',
            image: 'https://static.wikia.nocookie.net/valorant/images/d/d4/Araxys_Guardian.png/revision/latest?cb=20241210223722'
        },
        {
            id: 'blackthorn_guardian',
            name: 'Blackthorn Guardian',
            collection: 'Blackthorn Collection',
            image: 'https://static.wikia.nocookie.net/valorant/images/d/d1/Blackthorn_Guardian.png/revision/latest?cb=20260317165954'
        },
    ],

    Phantom: [
        {
            id: 'abyssal_phantom',
            name: 'Abyssal Phantom',
            collection: 'Abyssal Collection',
            image: 'https://static.wikia.nocookie.net/valorant/images/9/95/Abyssal_Phantom.png/revision/latest?cb=20230711192020'
        },
        {
            id: 'aperture_phantom',
            name: 'Aperture Phantom',
            collection: 'Aperture Collection',
            image: 'https://static.wikia.nocookie.net/valorant/images/0/09/Aperture_Phantom.png/revision/latest?cb=20240910162924'
        },
        {
            id: 'araxys_phantom',
            name: 'Araxys Phantom',
            collection: 'Araxys Collection',
            image: 'https://static.wikia.nocookie.net/valorant/images/c/c5/Araxys_Phantom.png/revision/latest?cb=20241210223744'
        },
        {
            id: 'avalanche_phantom',
            name: 'Avalanche Phantom',
            collection: 'Avalanche Collection',
            image: 'https://static.wikia.nocookie.net/valorant/images/9/9e/Avalanche_Phantom.png/revision/latest?cb=20230711192736'
        },
        {
            id: 'ayakashi_phantom',
            name: 'Ayakashi Phantom',
            collection: 'Ayakashi Collection',
            image: 'https://static.wikia.nocookie.net/valorant/images/b/b0/Ayakashi_Phantom.png/revision/latest?cb=20260106171433'
        },
        {
            id: 'blastX_phantom',
            name: 'BlastX Phantom',
            collection: 'BlastX Collection',
            image: 'https://static.wikia.nocookie.net/valorant/images/b/b1/BlastX_Phantom.png/revision/latest?cb=20230711192940'
        },
        {
            id: 'bolt_phantom',
            name: 'Bolt Phantom',
            collection: 'Bolt Collection',
            image: 'https://static.wikia.nocookie.net/valorant/images/2/2f/Bolt_Phantom.png/revision/latest?cb=20250402172950'
        },
        {
            id: 'bubblegum_deathwish_phantom',
            name: 'Bubblegum Deathwish Phantom',
            collection: 'Bubblegum Collection',
            image: 'https://static.wikia.nocookie.net/valorant/images/e/e6/Bubblegum_Deathwish_Phantom.png/revision/latest?cb=20250820141125'
        },
        {
            id: 'celestial_phantom',
            name: 'Celestial Phantom',
            collection: 'Celestial Collection',
            image: 'https://static.wikia.nocookie.net/valorant/images/6/6e/Celestial_Phantom.png/revision/latest?cb=20230711193207'
        },
        {
            id: 'chromedek_phantom',
            name: 'Chromedek Phantom',
            collection: 'Chromedek Collection',
            image: 'https://static.wikia.nocookie.net/valorant/images/0/07/Chromedek_Phantom.png/revision/latest?cb=20231114172557'
        },
    ],

    Vandal: [
        {
            id: 'aemondir_vandal',
            name: 'Aemondir Vandal',
            collection: 'Aemondir Collection',
            image: 'https://static.wikia.nocookie.net/valorant/images/2/22/Aemondir_Vandal.png/revision/latest?cb=20240621121648'
        },
        {
            id: 'altitude_vandal',
            name: 'Altitude Vandal',
            collection: 'Altitude Collection',
            image: 'https://static.wikia.nocookie.net/valorant/images/8/84/Altitude_Vandal.png/revision/latest?cb=20230711192248'
        },
        {
            id: 'araxys_vandal',
            name: 'Araxys Vandal',
            collection: 'Araxys Collection',
            image: 'https://static.wikia.nocookie.net/valorant/images/e/e1/Araxys_Vandal.png/revision/latest?cb=20230711192502'
        },
        {
            id: 'aristocrat_vandal',
            name: 'Aristocrat Vandal',
            collection: 'Aristocrat Collection',
            image: 'https://static.wikia.nocookie.net/valorant/images/d/d4/Aristocrat_Vandal.png/revision/latest?cb=20230711192546'
        },
        {
            id: 'avalanche_vandal',
            name: 'Avalanche Vandal',
            collection: 'Avalanche Collection',
            image: 'https://static.wikia.nocookie.net/valorant/images/b/b2/Avalanche_Vandal.png/revision/latest?cb=20230711192758'
        },
        {
            id: 'black.market_vandal',
            name: 'Black Market Vandal',
            collection: 'Black Market Collection',
            image: 'https://static.wikia.nocookie.net/valorant/images/3/31/Black.Market_Vandal.png/revision/latest?cb=20230711192829'
        },
        {
            id: 'blackthorn_vandal',
            name: 'Blackthorn Vandal',
            collection: 'Blackthorn Collection',
            image: 'https://static.wikia.nocookie.net/valorant/images/9/9a/Blackthorn_Vandal.png/revision/latest?cb=20260317170002'
        },
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

    Melee: [
        {
            id: 'abyssal_melee',
            name: 'Caeruleus',
            collection: 'Abyssal Collection',
            image: 'https://static.wikia.nocookie.net/valorant/images/8/87/Caeruleus.png/revision/latest?cb=20240416151509'
        },
        {
            id: 'aemondir_melee',
            name: 'Blade of Aemondir',
            collection: 'Aemondir Collection',
            image: 'https://static.wikia.nocookie.net/valorant/images/9/92/Blade_of_Aemondir.png/revision/latest?cb=20240621121705'
        },
        {
            id: 'altitude_melee',
            name: 'Altitude Knuckle Knife',
            collection: 'Altitude Collection',
            image: 'https://static.wikia.nocookie.net/valorant/images/7/78/Altitude_Knuckle_Knife.png/revision/latest?cb=20230711192224'
        },
        {
            id: 'Aperture_melee',
            name: 'Aperture Stiletto',
            collection: 'Aperture Collection',
            image: 'https://static.wikia.nocookie.net/valorant/images/1/10/Aperture_Stiletto.png/revision/latest?cb=20240910162925'
        },
        {
            id: 'araxys_meleeV1',
            name: 'Araxys Bio Harvester',
            collection: 'Araxys Collection',
            image: 'https://static.wikia.nocookie.net/valorant/images/0/07/Araxys_Bio_Harvester.png/revision/latest?cb=20230711192312'
        },
        {
            id: 'araxys_meleeV2',
            name: 'Araxys Bio-Atomizers',
            collection: 'Araxys Collection',
            image: 'https://static.wikia.nocookie.net/valorant/images/7/70/Araxys_Bio-Atomizers.png/revision/latest?cb=20241210223710'
        },
        {
            id: 'ayakashi_melee',
            name: 'Kogitsune',
            collection: 'Ayakashi Collection',
            image: 'https://static.wikia.nocookie.net/valorant/images/5/53/Kogitsune.png/revision/latest?cb=20260106171437'
        },
        {
            id: 'black.market_melee',
            name: 'Black Market Butterfly Knife',
            collection: 'Black Market Collection',
            image: 'https://static.wikia.nocookie.net/valorant/images/5/5f/Black.Market_Butterfly_Knife.png/revision/latest?cb=20230711192811'
        },
        {
            id: 'blackthorn_melee',
            name: 'Blackthorn Blades',
            collection: 'Blackthorn Collection',
            image: 'https://static.wikia.nocookie.net/valorant/images/f/fe/Blackthorn_Blades.png/revision/latest?cb=20260317165935'
        },
        {
            id: 'blastX_melee',
            name: 'BlastX Polymer KnifeTech Coated Knife',
            collection: 'BlastX Collection',
            image: 'https://static.wikia.nocookie.net/valorant/images/2/2a/BlastX_Polymer_KnifeTech_Coated_Knife.png/revision/latest?cb=20230711192950'
        },
        {
            id: 'bolt_melee',
            name: 'Bolt Knife',
            collection: 'Bolt Collection',
            image: 'https://static.wikia.nocookie.net/valorant/images/a/a8/Bolt_Knife.png/revision/latest?cb=20250402172934'
        },
        {
            id: 'bubblegum_deathwish_melee',
            name: 'Bubblegum Deathwish Chainsaw',
            collection: 'Bubblegum Collection',
            image: 'https://static.wikia.nocookie.net/valorant/images/2/28/Bubblegum_Deathwish_Chainsaw.png/revision/latest?cb=20250820141118'
        },
        {
            id: 'celestial_melee',
            name: 'Celestial Fan',
            collection: 'Celestial Collection',
            image: 'https://static.wikia.nocookie.net/valorant/images/c/c0/Celestial_Fan.png/revision/latest?cb=20240416151519'
        },
        {
            id: 'chromedek_melee',
            name: 'Chromedek Gauntlet',
            collection: 'Chromedek Collection',
            image: 'https://static.wikia.nocookie.net/valorant/images/0/0b/Chromedek_Gauntlet.png/revision/latest?cb=20231114172605'
        },
    ],

    Marshal: [
        {
            id: 'avalanche_marshal',
            name: 'Avalanche Marshal',
            collection: 'Avalanche Collection',
            image: 'https://static.wikia.nocookie.net/valorant/images/f/f0/Avalanche_Marshal.png/revision/latest?cb=20230711192721'
        },
        {
            id: 'black.market_marshal',
            name: 'Black Market Marshal',
            collection: 'Black Market Collection',
            image: 'https://static.wikia.nocookie.net/valorant/images/0/08/Black.Market_Marshal.png/revision/latest?cb=20230711192824'
        },
        {
            id: 'blackthorn_marshal',
            name: 'Blackthorn Marshal',
            collection: 'Blackthorn Collection',
            image: 'https://static.wikia.nocookie.net/valorant/images/f/ff/Blackthorn_Marshal.png/revision/latest?cb=20260317165958'
        },
        {
            id: 'chromedek_marshal',
            name: 'Chromedek Marshal',
            collection: 'Chromedek Collection',
            image: 'https://static.wikia.nocookie.net/valorant/images/f/f4/Chromedek_Marshal.png/revision/latest?cb=20231114172546'
        },
    ],

    Outlaw: [
        {
            id: 'aperture_outlaw',
            name: 'Aperture Outlaw',
            collection: 'Aperture Collection',
            image: 'https://static.wikia.nocookie.net/valorant/images/8/86/Aperture_Outlaw.png/revision/latest?cb=20240910162923'
        },
        {
            id: 'araxys_outlaw',
            name: 'Araxys Outlaw',
            collection: 'Araxys Collection',
            image: 'https://static.wikia.nocookie.net/valorant/images/c/c9/Araxys_Outlaw.png/revision/latest?cb=20241210223733'
        },
        {
            id: 'bolt_outlaw',
            name: 'Bolt Outlaw',
            collection: 'Bolt Collection',
            image: 'https://static.wikia.nocookie.net/valorant/images/7/7f/Bolt_Outlaw.png/revision/latest?cb=20250402172942'
        },
    ],

    Operator: [
        {
            id: 'araxys_operator',
            name: 'Araxys Operator',
            collection: 'Araxys Collection',
            image: 'https://static.wikia.nocookie.net/valorant/images/f/fe/Araxys_Operator.png/revision/latest?cb=20230711192359'
        },
        {
            id: 'bubblegum_deathwish_operator',
            name: 'Bubblegum Deathwish Operator',
            collection: 'Bubblegum Collection',
            image: 'https://static.wikia.nocookie.net/valorant/images/a/ad/Bubblegum_Deathwish_Operator.png/revision/latest?cb=20250820141121'
        },
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
        },
    ],

    Ares: [
        {
            id: 'aristocrat_ares',
            name: 'Aristocrat Ares',
            collection: 'Aristocrat Collection',
            image: 'https://static.wikia.nocookie.net/valorant/images/8/8c/Aristocrat_Ares.png/revision/latest?cb=20230711192519'
        },
        {
            id: 'celestial_ares',
            name: 'Celestial Ares',
            collection: 'Celestial Collection',
            image: 'https://static.wikia.nocookie.net/valorant/images/0/03/Celestial_Ares.png/revision/latest?cb=20230711193142'
        }
    ],

    Odin: [
        {
            id: 'altitude_odin',
            name: 'Altitude Odin',
            collection: 'Altitude Collection',
            image: 'https://static.wikia.nocookie.net/valorant/images/f/fc/Altitude_Odin.png/revision/latest?cb=20230711192230'
        },
        {
            id: 'blastX_odin',
            name: 'BlastX Odin',
            collection: 'BlastX Collection',
            image: 'https://static.wikia.nocookie.net/valorant/images/1/13/BlastX_Odin.png/revision/latest?cb=20230711192921'
        },
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
                filter === weapon;

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
