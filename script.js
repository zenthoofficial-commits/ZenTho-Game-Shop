// Firebase SDK imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getFirestore, doc, setDoc, updateDoc, deleteDoc, onSnapshot, collection, addDoc, getDocs, getDoc } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
import { getAuth, signInAnonymously, onAuthStateChanged, deleteUser, signInWithCustomToken } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { setLogLevel } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
setLogLevel('debug');

document.addEventListener('DOMContentLoaded', () => {
    // Global variables for Firebase configuration provided by the environment
    const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
    const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {
        apiKey: "AIzaSyAifhHu0hep48QYsdeXPdS8yLF3O8EIEu4",
        authDomain: "zentho-game-shop.firebaseapp.com",
        projectId: "zentho-game-shop",
        storageBucket: "zentho-game-shop.firebasestorage.app",
        messagingSenderId: "920536221397",
        appId: "1:920536221397:web:dcfaaec14fd86358f9045c",
        measurementId: "G-TRDJCTMGEJ"
    };
    const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;
    
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const auth = getAuth(app);

    // Translations
    const translations = {
        my: {
            title_home: 'ZenTho Game Shop',
            title_games: 'ဂိမ်းများ',
            title_wallet: 'ပိုက်ဆံအိတ်',
            title_purchase_history: 'ဝယ်ယူမှုမှတ်တမ်း',
            title_deposit_history: 'ငွေသွင်းမှုမှတ်တမ်း',
            title_settings: 'ချိန်ညှိမှုများ',
            title_profile: 'ပရိုဖိုင်',
            title_help_center: 'အကူအညီစင်တာ',
            title_about: 'အကြောင်း',
            menu: 'Menu',
            close: 'ပိတ်မည်',
            wallet_balance: 'လက်ရှိပိုက်ဆံအိတ်လက်ကျန်',
            ks: 'Ks',
            buy_now: 'ဝယ်ယူမည်',
            how_to_buy: 'ဝယ်ယူနည်း',
            fill_info: 'အချက်အလက်ဖြည့်ရန်',
            game_id: 'Game ID',
            enter_game_id: 'ဂိမ်းအိုင်ဒီ ထည့်ပါ',
            server_id: 'Server ID',
            enter_server_id: 'ဆာဗာအိုင်ဒီ',
            check_name: 'စစ်ဆေးပါ',
            game_name: 'ဂိမ်းအမည်',
            game_name_not_found: 'ဂိမ်းနာမည်ကို ရှာမတွေ့ပါ။',
            items: 'ပစ္စည်းများ',
            date: 'ရက်စွဲ',
            item_name: 'ပစ္စည်းအမည်',
            price: 'စျေးနှုန်း',
            status: 'အခြေအနေ',
            success: 'အောင်မြင်ပါသည်',
            failed: 'မအောင်မြင်ပါ',
            reason_not_enough_balance: 'ငွေမလုံလောက်ခြင်း',
            deposit_title: 'ငွေသွင်းရန်',
            deposit_instruction: 'ငွေသွင်းရန် အောက်ပါနံပါတ်သို့ လွှဲပေးပါ။',
            account_name: 'အကောင့်အမည်',
            amount: 'ငွေပမာဏ',
            receipt: 'ငွေလွှဲပြေစာ',
            receipt_id: 'ငွေလွှဲပြေစာ ID',
            submit_deposit: 'ငွေသွင်းရန်',
            deposit_success: 'ငွေသွင်းမှု အောင်မြင်ပါသည်',
            deposit_received: 'သင်၏ငွေသွင်းမှု လျှောက်လွှာကို လက်ခံရရှိပါပြီ။ စစ်ဆေးပြီးနောက် သင့် Wallet တွင် ငွေဖြည့်ပေးပါမည်။',
            deposit_failed_fields: 'ငွေပမာဏနှင့် ပြေစာ ID ဖြည့်ရန် လိုအပ်ပါသည်။',
            login_required_title: 'အကောင့်ဝင်ရန် လိုအပ်သည်',
            login_required_message: 'ဤလုပ်ဆောင်ချက်ကို အသုံးပြုရန်အတွက် အကောင့်ဝင်ရန် လိုအပ်ပါသည်။ ပရိုဖိုင်စာမျက်နှာမှတဆင့် အကောင့်ဖွင့်ပေးပါ။',
            no_account: 'အကောင့်မရှိသေးပါ',
            no_account_desc: 'အကောင့်မရှိသေးပါက အကောင့်ဖွင့်ရန် အောက်ပါခလုတ်ကို နှိပ်ပါ။',
            create_account: 'အကောင့်ဖွင့်မည်',
            save_profile: 'အချက်အလက်သိမ်းမည်',
            profile_saved_success: 'ပရိုဖိုင် အောင်မြင်စွာ ပြင်ဆင်ပြီးပါပြီ။',
            profile_save_error: 'ပရိုဖိုင်ကို သိမ်းဆည်းရန် မအောင်မြင်ပါ။',
            share_app: 'App ကို မျှဝေမည်',
            delete_account: 'အကောင့်ဖျက်ရန်',
            delete_confirm_title: 'အကောင့်ဖျက်မည်',
            delete_confirm_message: 'အကောင့်ကို ဖျက်ရန် သေချာပါသလား။ ဤလုပ်ဆောင်ချက်ကို ပြန်လည်ပြင်ဆင်နိုင်မည် မဟုတ်ပါ။',
            privacy_policy: 'ကိုယ်ရေးအချက်အလက်မူဝါဒ',
            language_change: 'ဘာသာစကားပြောင်းလဲရန်',
            language_select: 'ဘာသာစကား ရွေးချယ်ပါ',
            notifications: 'အကြောင်းကြားချက်များ',
            dark_mode: 'Dark Mode',
            help_title: 'ဆက်သွယ်ရန်အချက်အလက်',
            faq_title: 'မေးလေ့ရှိသောမေးခွန်းများ',
            faq1_q: 'ဂိမ်းအိုင်ဒီဘယ်လိုရှာမလဲ။',
            faq1_a: 'ဂိမ်းအိုင်ဒီသည် ဂိမ်းပရိုဖိုင်တွင် ရှိပါသည်။ အိုင်ဒီနံပါတ်ကို ကူးယူ၍ ဤနေရာတွင် ထည့်သွင်းပါ။',
            faq2_q: 'ငွေလွှဲပြီးရင် ဘယ်လောက်ကြာမှ ပိုက်ဆံဝင်မလဲ။',
            faq2_a: 'ပုံမှန်အားဖြင့် မိနစ်အနည်းငယ်အတွင်း ဝင်ပါသည်။ အကယ်၍ အချိန်ကြာပါက၊ ငွေသွင်းမှုမှတ်တမ်းတွင် စစ်ဆေးပါ။',
            about_desc1: 'ZenTho Game Shop သည် သင့်ဂိမ်းများအတွက် လိုအပ်သောပစ္စည်းများကို အမြန်ဆုံးနှင့် အလုံခြုံဆုံး ဝယ်ယူနိုင်ရန် တည်ထောင်ထားခြင်း ဖြစ်ပါသည်။',
            about_desc2: 'ကျွန်ုပ်တို့သည် SEAGM ကဲ့သို့သော နာမည်ကြီးဝန်ဆောင်မှုများကို အသုံးပြု၍ သင်၏ ဂိမ်းအကောင့်သို့ ပစ္စည်းများကို တိုက်ရိုက်ဖြည့်သွင်းပေးပါသည်။',
            about_desc3: 'သင်၏အချက်အလက်လုံခြုံမှုကို အလေးထားပါသည်။ အဆင်ပြေပြေနှင့် စိတ်ချရသော ဝယ်ယူမှုအတွေ့အကြုံကို ပေးနိုင်ရန် ကျွန်ုပ်တို့ အမြဲကြိုးစားနေပါသည်။',
            name: 'အမည်',
            enter_your_name: 'သင်၏အမည်',
            birthdate: 'မွေးနေ့',
            not_entered_yet: 'မထည့်သွင်းရသေးပါ',
            myanmar_name: 'မြန်မာ',
            english_name: 'English',
            exit_title: 'အပလီကေးရှင်းမှ ထွက်ရန်',
            exit_message: 'နောက်တစ်ကြိမ် back ခလုတ်ကို နှိပ်ပါ။'
        },
        en: {
            title_home: 'ZenTho Game Shop',
            title_games: 'Games',
            title_wallet: 'Wallet',
            title_purchase_history: 'Purchase History',
            title_deposit_history: 'Deposit History',
            title_settings: 'Settings',
            title_profile: 'Profile',
            title_help_center: 'Help Center',
            title_about: 'About',
            menu: 'Menu',
            close: 'Close',
            wallet_balance: 'Current Wallet Balance',
            ks: 'Ks',
            buy_now: 'Buy Now',
            how_to_buy: 'How to Buy',
            fill_info: 'Fill in Info',
            game_id: 'Game ID',
            enter_game_id: 'Enter Game ID',
            server_id: 'Server ID',
            enter_server_id: 'Server ID',
            check_name: 'Check Name',
            game_name: 'Game Name',
            game_name_not_found: 'Game name not found.',
            items: 'Items',
            date: 'Date',
            item_name: 'Item Name',
            price: 'Price',
            status: 'Status',
            success: 'Success',
            failed: 'Failed',
            reason_not_enough_balance: 'Not enough balance',
            deposit_title: 'Deposit',
            deposit_instruction: 'Please transfer to the number below to deposit.',
            account_name: 'Account Name',
            amount: 'Amount',
            receipt: 'Receipt',
            receipt_id: 'Receipt ID',
            submit_deposit: 'Submit Deposit',
            deposit_success: 'Deposit successful',
            deposit_received: 'Your deposit request has been received. Your wallet will be credited after verification.',
            deposit_failed_fields: 'Amount and receipt ID are required.',
            login_required_title: 'Login Required',
            login_required_message: 'You need to be logged in to use this feature. Please create an account from the Profile page.',
            no_account: 'No account exists yet',
            no_account_desc: 'If you do not have an account, please click the button below to create one.',
            create_account: 'Create Account',
            save_profile: 'Save Profile',
            profile_saved_success: 'Profile successfully updated.',
            profile_save_error: 'Failed to save profile.',
            share_app: 'Share App',
            delete_account: 'Delete Account',
            delete_confirm_title: 'Delete Account',
            delete_confirm_message: 'Are you sure you want to delete your account? This action cannot be undone.',
            privacy_policy: 'Privacy Policy',
            language_change: 'Change Language',
            language_select: 'Select Language',
            notifications: 'Notifications',
            dark_mode: 'Dark Mode',
            help_title: 'Contact Information',
            faq_title: 'Frequently Asked Questions',
            faq1_q: 'How to find my Game ID?',
            faq1_a: 'Your Game ID can be found in your game profile. Copy the ID number and paste it here.',
            faq2_q: 'How long does it take for the money to be credited after transfer?',
            faq2_a: 'It usually takes a few minutes. If it takes longer, please check your deposit history.',
            about_desc1: 'ZenTho Game Shop was established to provide you with the fastest and most secure way to buy in-game items.',
            about_desc2: 'We use popular services like SEAGM to directly credit items to your game account.',
            about_desc3: 'We prioritize the security of your information. We always strive to provide a convenient and reliable buying experience.',
            name: 'Name',
            enter_your_name: 'Your Name',
            birthdate: 'Birthdate',
            not_entered_yet: 'Not entered yet',
            myanmar_name: 'Myanmar',
            english_name: 'English',
            exit_title: 'Exit Application',
            exit_message: 'Press back again to exit.'
        }
    };
    
    // DOM Elements
    const contentArea = document.getElementById('content-area');
    const sideMenu = document.getElementById('side-menu');
    const menuOverlay = document.getElementById('menu-overlay');
    const menuBtn = document.getElementById('menu-btn');
    const profileBtn = document.getElementById('profile-btn');
    const profileIconContainer = document.getElementById('profile-icon-container');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const messageModal = document.getElementById('message-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalMessage = document.getElementById('modal-message');
    const modalActions = document.getElementById('modal-actions');
    const closeHowToModalBtn = document.getElementById('close-how-to-modal');
    const closeLanguageModalBtn = document.getElementById('close-language-modal');
    const headerBalance = document.getElementById('header-balance');
    const howToModal = document.getElementById('how-to-modal');
    const languageModal = document.getElementById('language-modal');
    
    // State
    let state = {
        currentView: 'home',
        isMenuOpen: false,
        walletBalance: 0,
        purchaseHistory: [],
        depositHistory: [],
        selectedGame: null,
        lang: 'my'
    };
    
    let userProfile = {
        name: 'အမည်မရှိပါ',
        profilePicData: null,
        id: null
    };
    
    let isAuthReady = false;
    let unsubscribePurchaseHistory = null;
    let unsubscribeDepositHistory = null;
    let unsubscribeUserProfile = null;

    // Modal State
    let currentModal = null;
    let lastBackPress = 0;

    const ads = [
        'images/PICLUMEN_1757937496184.webp',
        'images/Picsart_25-09-15_18-30-51-292.jpg',
        'images/PUBG-Battlegrounds-2025-Roadmap.jpg',
        'images/clash-of-clans-pictures-f88iyeweabo3r6kz.jpg',
        'images/cover-12-1024x576.webp'
    ];
    let currentAdIndex = 0;
    let adInterval;

    const games = [
        {
            id: 'mlbb',
            name: 'Mobile Legends: Bang Bang',
            logo: 'images/ap_resize.jpeg',
            items: [
                { name: '56 Diamonds', price: 1000 },
                { name: '112 Diamonds', price: 2000 },
                { name: '224 Diamonds', price: 4000 },
                { name: '336 Diamonds', price: 6000 },
                { name: '560 Diamonds', price: 10000 },
            ],
            howTo: {
                my: `
                    <p><strong>Game ID & Server ID ဘယ်လိုရှာမလဲ။</strong></p>
                    <p>သင်၏ MLBB ပရိုဖိုင်ကို နှိပ်ပြီး ညာဘက်အပေါ်ထောင့်ရှိ နံပါတ်ကို ကြည့်ပါ။ ဥပမာ: 12345678 (1234) ဖြစ်ပါက Game ID က 12345678 ဖြစ်ပြီး Server ID က 1234 ဖြစ်ပါသည်။</p>
                    <br>
                    <p><strong>ဝယ်ယူပုံအဆင့်ဆင့်</strong></p>
                    <p>၁။ သင်၏ Game ID နှင့် Server ID ကို မှန်ကန်စွာ ဖြည့်ပါ။</p>
                    <p>၂။ သင်လိုချင်သော Diamond ပမာဏကို ရွေးချယ်ပါ။</p>
                    <p>၃။ Buy Now ကိုနှိပ်ပြီး ငွေပေးချေပါ။</p>
                `,
                en: `
                    <p><strong>How to find Game ID & Server ID?</strong></p>
                    <p>Click your MLBB profile and look at the number in the top right corner. For example: If it is 12345678 (1234), your Game ID is 12345678 and your Server ID is 1234.</p>
                    <br>
                    <p><strong>How to Buy Step-by-Step</strong></p>
                    <p>1. Enter your correct Game ID and Server ID.</p>
                    <p>2. Select the amount of Diamonds you want.</p>
                    <p>3. Click "Buy Now" and pay.</p>
                `
            }
        },
        {
            id: 'pubg',
            name: 'PUBG Mobile',
            logo: 'images/66702b2b8632a3f88322937d_pubg - small - new.webp',
            items: [
                { name: '60 UC', price: 1500 },
                { name: '325 UC', price: 7000 },
                { name: '660 UC', price: 13000 },
            ],
            howTo: {
                my: `
                    <p><strong>Game ID ဘယ်လိုရှာမလဲ။</strong></p>
                    <p>သင့် PUBG ပရိုဖိုင်ကို ဝင်ပြီး ဖန်သားပြင်ထိပ်ရှိ အကောင့် ID နံပါတ်ကို ကြည့်ပါ။ ၎င်းသည် Game ID ဖြစ်ပါသည်။</p>
                    <br>
                    <p><strong>ဝယ်ယူပုံအဆင့်ဆင့်</strong></p>
                    <p>၁။ သင်၏ Game ID ကို မှန်ကန်စွာ ဖြည့်ပါ။</p>
                    <p>၂။ သင်လိုချင်သော UC ပမာဏကို ရွေးချယ်ပါ။</p>
                    <p>၃။ Buy Now ကိုနှိပ်ပြီး ငွေပေးချေပါ။</p>
                `,
                en: `
                    <p><strong>How to find Game ID?</strong></p>
                    <p>Go to your PUBG profile and look at the account ID number at the top of the screen. This is your Game ID.</p>
                    <br>
                    <p><strong>How to Buy Step-by-Step</strong></p>
                    <p>1. Enter your correct Game ID.</p>
                    <p>2. Select the amount of UC you want.</p>
                    <p>3. Click "Buy Now" and pay.</p>
                `
            }
        },
        {
            id: 'coc',
            name: 'Clash of Clans',
            logo: 'images/unnamed (1).png',
            items: [
                { name: '80 Gems', price: 1200 },
                { name: '500 Gems', price: 7000 },
                { name: '1200 Gems', price: 15000 },
            ],
            howTo: {
                my: `
                    <p><strong>Game ID ဘယ်လိုရှာမလဲ။</strong></p>
                    <p>ဂိမ်းတွင် သင့်ပရိုဖိုင်ကို နှိပ်ပါ။ သင်၏ Player Tag (Game ID) သည် # ဖြင့် စတင်ပါသည်။</p>
                    <br>
                    <p><strong>ဝယ်ယူပုံအဆင့်ဆင့်</strong></p>
                    <p>၁။ သင်၏ Player Tag (Game ID) ကို မှန်ကန်စွာ ဖြည့်ပါ။</p>
                    <p>၂။ သင်လိုချင်သော Gem ပမာဏကို ရွေးချယ်ပါ။</p>
                    <p>၃။ Buy Now ကိုနှိပ်ပြီး ငွေပေးချေပါ။</p>
                `,
                en: `
                    <p><strong>How to find Game ID?</strong></p>
                    <p>Click on your profile in the game. Your Player Tag (Game ID) starts with a #.</p>
                    <br>
                    <p><strong>How to Buy Step-by-Step</strong></p>
                    <p>1. Enter your correct Player Tag (Game ID).</p>
                    <p>2. Select the amount of Gems you want.</p>
                    <p>3. Click "Buy Now" and pay.</p>
                `
            }
        },
        {
            id: 'efootball',
            name: 'eFootball™',
            logo: 'images/images (2).jpeg',
            items: [
                { name: '100 Coins', price: 1000 },
                { name: '500 Coins', price: 4500 },
            ],
            howTo: {
                my: `
                    <p><strong>Game ID ဘယ်လိုရှာမလဲ။</strong></p>
                    <p>သင်၏ EFootball ပရိုဖိုင်ကို ဝင်ပြီး ဖန်သားပြင်အောက်ခြေရှိ User ID ကို ရှာပါ။</p>
                    <br>
                    <p><strong>ဝယ်ယူပုံအဆင့်ဆင့်</strong></p>
                    <p>၁။ သင်၏ User ID (Game ID) ကို မှန်ကန်စွာ ဖြည့်ပါ။</p>
                    <p>၂။ သင်လိုချင်သော Coin ပမာဏကို ရွေးချယ်ပါ။</p>
                    <p>၃။ Buy Now ကိုနှိပ်ပြီး ငွေပေးချေပါ။</p>
                `,
                en: `
                    <p><strong>How to find Game ID?</strong></p>
                    <p>Go to your EFootball profile and find the User ID at the bottom of the screen.</p>
                    <br>
                    <p><strong>How to Buy Step-by-Step</strong></p>
                    <p>1. Enter your correct User ID (Game ID).</p>
                    <p>2. Select the amount of Coins you want.</p>
                    <p>3. Click "Buy Now" and pay.</p>
                `
            }
        },
        {
            id: 'fcmobile',
            name: 'EA SPORTS FC™ Mobile',
            logo: 'images/images (3).jpeg',
            items: [
                { name: '500 FC Points', price: 10000 },
                { name: '1000 FC Points', price: 20000 },
            ],
            howTo: {
                my: `
                    <p><strong>Game ID ဘယ်လိုရှာမလဲ။</strong></p>
                    <p>ဂိမ်းထဲမှာ Settings ကို နှိပ်ပြီး ဖန်သားပြင်အပေါ်ပိုင်းရှိ UID နံပါတ်ကို ကြည့်ပါ။</p>
                    <br>
                    <p><strong>ဝယ်ယူပုံအဆင့်ဆင့်</strong></p>
                    <p>၁။ သင်၏ UID (Game ID) ကို မှန်ကန်စွာ ဖြည့်ပါ။</p>
                    <p>၂။ သင်လိုချင်သော FC Point ပမာဏကို ရွေးချယ်ပါ။</p>
                    <p>၃။ Buy Now ကိုနှိပ်ပြီး ငွေပေးချေပါ။</p>
                `,
                en: `
                    <p><strong>How to find Game ID?</strong></p>
                    <p>In the game, click on Settings and look for the UID number at the top of the screen.</p>
                    <br>
                    <p><strong>How to Buy Step-by-Step</strong></p>
                    <p>1. Enter your correct UID (Game ID).</p>
                    <p>2. Select the amount of FC Points you want.</p>
                    <p>3. Click "Buy Now" and pay.</p>
                `
            }
        },
        {
            id: 'freefire',
            name: 'Garena Free Fire',
            logo: 'images/free-fire-thumbnail.png',
            items: [
                { name: '100 Diamonds', price: 1200 },
                { name: '310 Diamonds', price: 3500 },
            ],
            howTo: {
                my: `
                    <p><strong>Game ID ဘယ်လိုရှာမလဲ။</strong></p>
                    <p>ဂိမ်းထဲက ပရိုဖိုင်ကို နှိပ်ပြီး သင်၏ ID နံပါတ်ကို ရှာပါ။ ၎င်းသည် ဂဏန်းအရှည်တစ်ခု ဖြစ်ပါသည်။</p>
                    <br>
                    <p><strong>ဝယ်ယူပုံအဆင့်ဆင့်</strong></p>
                    <p>၁။ သင်၏ ID (Game ID) ကို မှန်ကန်စွာ ဖြည့်ပါ။</p>
                    <p>၂။ သင်လိုချင်သော Diamond ပမာဏကို ရွေးချယ်ပါ။</p>
                    <p>၃။ Buy Now ကိုနှိပ်ပြီး ငွေပေးချေပါ။</p>
                `,
                en: `
                    <p><strong>How to find Game ID?</strong></p>
                    <p>In the game, click on your profile and find your ID number. It is a long string of numbers.</p>
                    <br>
                    <p><strong>How to Buy Step-by-Step</strong></p>
                    <p>1. Enter your correct ID (Game ID).</p>
                    <p>2. Select the amount of Diamonds you want.</p>
                    <p>3. Click "Buy Now" and pay.</p>
                `
            }
        },
    ];

    const dummyGameNames = {
        '12345678': 'Mg Mg',
        '98765432': 'Aung Aung',
        '11223344': 'Hla Hla',
        '55667788': 'Myo Myo'
    };

    // Translation Helper
    function T(key) {
        return translations[state.lang][key] || key;
    }

    // Modal Logic
    function showModal(modalElement) {
        if (currentModal) {
            currentModal.classList.add('hidden');
        }
        modalElement.classList.remove('hidden');
        currentModal = modalElement;
    }

    function hideModal(modalElement) {
        if (modalElement) {
            modalElement.classList.add('hidden');
            currentModal = null;
        }
    }
    
    function showMessage(title, message, isConfirm = false, onConfirm = () => {}) {
        modalTitle.textContent = title;
        modalMessage.textContent = message;
        
        modalActions.innerHTML = '';
        
        const closeBtn = document.createElement('button');
        closeBtn.id = 'close-message-modal';
        closeBtn.className = 'py-2 px-4 bg-gray-700 rounded-lg embossed text-sm';
        closeBtn.textContent = T('close');
        closeBtn.addEventListener('click', () => hideModal(messageModal));
        modalActions.appendChild(closeBtn);
        
        if (isConfirm) {
            const confirmBtn = document.createElement('button');
            confirmBtn.id = 'confirm-action-btn';
            confirmBtn.className = 'py-2 px-4 bg-red-600 text-white rounded-lg embossed text-sm';
            confirmBtn.textContent = T('delete_account');
            confirmBtn.addEventListener('click', () => {
                onConfirm();
                hideModal(messageModal);
            });
            modalActions.appendChild(confirmBtn);
        }
        
        showModal(messageModal);
    }

    function checkLoginAndNotify() {
        if (!userProfile.id) {
            showMessage(T('login_required_title'), T('login_required_message'));
            return false;
        }
        return true;
    }

    async function handleSaveProfile() {
        if (!checkLoginAndNotify()) return;

        const nameInput = document.getElementById('profile-name-input');
        const name = nameInput.value;
        
        try {
            const userDocRef = doc(db, `artifacts/${appId}/users/${userProfile.id}/profile/data`);
            await setDoc(userDocRef, { name }, { merge: true });
            showMessage(T('success'), T('profile_saved_success'));
        } catch (error) {
            console.error("Error saving profile:", error);
            showMessage(T('failed'), T('profile_save_error'));
        }
    }
    
    async function handleCreateAccount() {
        const btn = document.getElementById('create-account-btn');
        if (btn) {
            btn.disabled = true;
            // Centered loader HTML
            btn.innerHTML = `<div class="flex items-center justify-center h-full"><div class="loader"></div></div>`;
        }
        try {
            await signInAnonymously(auth);
        } catch(error) {
            console.error("Error signing in:", error);
            showMessage(T('failed'), `${T('create_account')} ${T('failed')}. ${error.message}`);
        } finally {
            if (btn) {
                btn.disabled = false;
                btn.innerHTML = T('create_account');
            }
        }
    }

    async function handleDeleteAccount() {
        if (!checkLoginAndNotify()) return;

        try {
            // Delete user data from Firestore first
            const profileDocRef = doc(db, `artifacts/${appId}/users/${userProfile.id}/profile/data`);
            await deleteDoc(profileDocRef);

            const purchaseHistoryCollectionRef = collection(db, `artifacts/${appId}/users/${userProfile.id}/purchase_history`);
            const purchaseDocs = await getDocs(purchaseHistoryCollectionRef);
            const deletePurchasePromises = purchaseDocs.docs.map(d => deleteDoc(d.ref));
            await Promise.all(deletePurchasePromises);

            const depositHistoryCollectionRef = collection(db, `artifacts/${appId}/users/${userProfile.id}/deposit_history`);
            const depositDocs = await getDocs(depositHistoryCollectionRef);
            const deleteDepositPromises = depositDocs.docs.map(d => deleteDoc(d.ref));
            await Promise.all(deleteDepositPromises);

            // Now, delete the user account
            const user = auth.currentUser;
            await deleteUser(user);
            
            showMessage(T('success'), `${T('delete_account')} ${T('success')}.`);
            state.currentView = 'home';
            render();
        } catch (error) {
            console.error("Error deleting account:", error);
            showMessage(T('failed'), `${T('delete_account')} ${T('failed')}. ${error.message}`);
        }
    }

    function handleShare() {
        if (!checkLoginAndNotify()) return;
        
        if (navigator.share) {
            navigator.share({
                title: 'ZenTho Game Shop',
                text: 'ZenTho Game Shop ဖြင့် သင်အကြိုက်ဆုံး ဂိမ်းများကို အလွယ်တကူ ဝယ်ယူလိုက်ပါ။',
                url: window.location.href
            }).catch((error) => console.log('Error sharing:', error));
        } else {
            showMessage('မျှဝေခြင်း', 'သင်၏ ဘရောက်ဆာသည် မျှဝေခြင်းကို မထောက်ပံ့ပါ။');
        }
    }
    
    function render() {
        // Update profile button
        const profileBtnContainer = document.getElementById('profile-icon-container');
        if (userProfile.profilePicData) {
            profileBtnContainer.innerHTML = `<img src="${userProfile.profilePicData}" alt="Profile" class="w-full h-full object-cover rounded-full">`;
        } else {
            profileBtnContainer.innerHTML = `<i class="fas fa-user-circle fa-lg"></i>`;
        }

        headerBalance.textContent = userProfile.id ? `(${state.walletBalance.toLocaleString()} ${T('ks')})` : '';
        
        stopAdSlider();
        if (howToModal) {
            howToModal.classList.add('hidden');
        }
        if (languageModal) {
            languageModal.classList.add('hidden');
        }
        if (messageModal) {
            messageModal.classList.add('hidden');
        }

        sideMenu.classList.add('-translate-x-full');
        menuOverlay.classList.remove('opacity-50', 'pointer-events-auto');
        state.isMenuOpen = false;
        
        document.querySelectorAll('.view-btn').forEach(btn => btn.classList.remove('font-bold', 'bg-gray-700'));
        
        document.getElementById('nav-games').textContent = T('title_games');
        document.getElementById('nav-wallet').textContent = T('title_wallet');
        document.getElementById('nav-purchase-history').textContent = T('title_purchase_history');
        document.getElementById('nav-deposit-history').textContent = T('title_deposit_history');
        document.getElementById('nav-settings').textContent = T('title_settings');
        document.getElementById('nav-profile').textContent = T('title_profile');
        document.getElementById('nav-help-center').textContent = T('title_help_center');
        document.getElementById('nav-about').textContent = T('title_about');
        document.getElementById('menu-title').textContent = T('menu');

        let html = '';
        let currentTitle = T('title_home');
        
        // Get the current view from the URL hash, default to 'home'
        const hashView = window.location.hash.slice(1);
        state.currentView = hashView || 'home';

        switch (state.currentView) {
            case 'home':
                html = `
                    <div id="ad-slider" class="mb-4 rounded-lg embossed overflow-hidden ad-container">
                        ${ads.map((ad, index) => `<img src="${ad}" alt="Advertisement ${index + 1}" class="${index === 0 ? 'active' : ''}">`).join('')}
                    </div>
                    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        ${games.map(game => `
                            <button data-game-id="${game.id}" class="game-btn flex flex-col items-center justify-center p-2 rounded-lg bg-gray-800 embossed">
                                <img src="${game.logo}" alt="${game.name} Logo" class="h-16 w-16 mb-2 rounded-lg">
                                <span class="text-sm text-yellow-500 font-semibold text-center">${game.name}</span>
                            </button>
                        `).join('')}
                    </div>
                `;
                document.querySelector('[data-view="home"]').classList.add('font-bold', 'bg-gray-700');
                setTimeout(startAdSlider, 0);
                break;
            case 'game':
                const selectedGame = games.find(g => g.id === state.selectedGame);
                if (!selectedGame) {
                    state.currentView = 'home';
                    render();
                    return;
                }
                currentTitle = selectedGame.name;
                html = `
                    <div class="flex items-center gap-2 mb-4">
                        <button class="back-btn p-2 rounded-lg embossed bg-gray-700 text-yellow-500">
                            <i class="fas fa-arrow-left"></i>
                        </button>
                        <img src="${selectedGame.logo}" alt="${selectedGame.name} Logo" class="h-10 w-10 rounded-full embossed">
                        <h2 class="text-md font-bold embossed-text">${selectedGame.name}</h2>
                    </div>
                    <div class="flex flex-col md:flex-row gap-6">
                        <div class="md:w-1/2 p-4 bg-gray-800 rounded-lg embossed">
                            <div class="flex items-center justify-between mb-4">
                                <h3 class="text-xl font-bold">${T('fill_info')}</h3>
                                <button id="show-how-to-btn" class="text-xs py-1.5 px-3.5 bg-gray-700 text-yellow-500 rounded-lg embossed">
                                    ${T('how_to_buy')}
                                </button>
                            </div>
                            <div class="space-y-4 mb-4">
                                <div class="flex items-end gap-2">
                                    <div class="flex-grow">
                                        <label for="game-id" class="block text-sm font-medium mb-1">${T('game_id')}</label>
                                        <input type="text" id="game-id" placeholder="${T('enter_game_id')}" class="w-full p-2 text-sm rounded-lg bg-gray-700 embossed-input placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500">
                                    </div>
                                    ${selectedGame.id === 'mlbb' ? `
                                        <div class="w-28">
                                            <label for="server-id" class="block text-sm font-medium mb-1">${T('server_id')}</label>
                                            <input type="text" id="server-id" placeholder="${T('enter_server_id')}" class="w-full p-2 text-sm rounded-lg bg-gray-700 embossed-input placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500">
                                        </div>
                                    ` : ''}
                                    <button id="check-name-btn" class="py-2 px-4 bg-gray-700 rounded-lg embossed">
                                        <i class="fas fa-check"></i>
                                    </button>
                                </div>
                                <p id="game-name-display" class="text-xs text-gray-400 mt-1"></p>
                            </div>
                        </div>
                        <div class="md:w-1/2 p-4 bg-gray-800 rounded-lg embossed">
                            <h3 class="text-xl font-bold mb-4">${T('items')}</h3>
                            <div class="space-y-3">
                                ${selectedGame.items.map(item => `
                                    <div class="flex items-center justify-between p-3 bg-gray-700 rounded-lg embossed game-item-card transition-all duration-200">
                                        <div>
                                            <div class="text-sm font-semibold text-sky-400">${item.name}</div>
                                        </div>
                                        <div class="flex items-center gap-2">
                                            <span class="text-base font-bold">${item.price} ${T('ks')}</span>
                                            <button data-item-price="${item.price}" data-item-name="${item.name}" class="buy-btn text-xs py-1 px-3 bg-yellow-500 text-gray-900 rounded-lg embossed">
                                                ${T('buy_now')}
                                            </button>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                `;
                document.querySelector('[data-view="home"]').classList.add('font-bold', 'bg-gray-700');
                break;
            case 'wallet':
                currentTitle = T('title_wallet');
                html = `
                    <div class="flex items-center gap-2 mb-4">
                        <button class="back-btn p-2 rounded-lg embossed bg-gray-700 text-yellow-500">
                            <i class="fas fa-arrow-left"></i>
                        </button>
                        <h2 class="text-xl font-bold embossed-text">${T('title_wallet')}</h2>
                    </div>
                    <div class="space-y-6">
                        <div class="p-6 bg-gray-800 rounded-lg embossed text-center">
                            <h2 class="text-2xl font-bold mb-2 embossed-text">${T('title_wallet')}</h2>
                            <p class="text-sm text-gray-400 mb-4">${T('wallet_balance')}</p>
                            <span class="text-5xl font-bold text-yellow-400">${state.walletBalance.toLocaleString()} ${T('ks')}</span>
                        </div>
                        
                        <div class="p-6 bg-gray-800 rounded-lg embossed">
                            <h3 class="text-xl font-bold mb-4 embossed-text">${T('deposit_title')}</h3>
                            <div class="flex flex-col sm:flex-row gap-4 mb-4">
                                <button data-deposit-type="KBZ Pay" class="deposit-btn flex-1 py-3 px-4 bg-blue-700 text-white rounded-lg embossed flex items-center justify-center gap-2">
                                    <i class="fas fa-money-bill-wave"></i> KBZ Pay
                                </button>
                                <button data-deposit-type="Wave Money" class="deposit-btn flex-1 py-3 px-4 bg-yellow-600 text-white rounded-lg embossed flex items-center justify-center gap-2">
                                    <i class="fas fa-money-bill-alt"></i> Wave Money
                                </button>
                            </div>
                            <div id="deposit-form-container" class="hidden p-4 mt-4 rounded-lg bg-gray-700 embossed">
                                <div class="text-sm text-center mb-4">
                                    <p>${T('deposit_instruction')}</p>
                                    <div class="flex items-center justify-center gap-2 font-semibold">
                                        <p class="text-yellow-400">နံပါတ်: <span id="deposit-number">09762302322</span></p>
                                        <button id="copy-btn" class="py-1 px-2 bg-gray-800 rounded-lg embossed text-xs">
                                            <i class="fas fa-copy"></i>
                                        </button>
                                    </div>
                                    <p class="font-semibold text-yellow-400">အကောင့်အမည်: Mg S P A</p>
                                </div>
                                <form id="deposit-form" class="space-y-3">
                                    <div>
                                        <label for="transfer-type" class="block text-sm">လွှဲပြောင်းမှုအမျိုးအစား</label>
                                        <input type="text" id="transfer-type" class="w-full p-2 text-sm rounded-lg bg-gray-600 embossed-input" readonly>
                                    </div>
                                    <div>
                                        <label for="account-name" class="block text-sm">${T('account_name')}</label>
                                        <input type="text" id="account-name" placeholder="${T('enter_your_name')}" class="w-full p-2 text-sm rounded-lg bg-gray-600 embossed-input">
                                    </div>
                                    <div>
                                        <label for="amount" class="block text-sm">${T('amount')}</label>
                                        <input type="number" id="amount" placeholder="${T('amount')}" class="w-full p-2 text-sm rounded-lg bg-gray-600 embossed-input">
                                    </div>
                                    <div>
                                        <label for="receipt" class="block text-sm">${T('receipt')}</label>
                                        <input type="text" id="receipt" placeholder="${T('receipt_id')}" class="w-full p-2 text-sm rounded-lg bg-gray-600 embossed-input">
                                    </div>
                                    <button type="submit" class="w-full py-2 bg-yellow-500 text-gray-900 rounded-lg embossed font-bold">
                                         ${T('submit_deposit')}
                                    </button>
                                   </form>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                document.querySelector('[data-view="wallet"]').classList.add('font-bold', 'bg-gray-700');
                break;
            case 'purchase-history':
                currentTitle = T('title_purchase_history');
                html = `
                    <div class="flex items-center gap-2 mb-4">
                        <button class="back-btn p-2 rounded-lg embossed bg-gray-700 text-yellow-500">
                            <i class="fas fa-arrow-left"></i>
                        </button>
                        <h2 class="text-xl font-bold embossed-text">${T('title_purchase_history')}</h2>
                    </div>
                    <div class="bg-gray-800 rounded-lg p-4 embossed">
                        ${state.purchaseHistory.length === 0 ? `<p class="text-center text-gray-400">${T('no_purchase_history')}</p>` : `
                            <table class="w-full text-left text-sm">
                                <thead>
                                    <tr class="border-b border-gray-700">
                                        <th class="p-2">${T('date')}</th>
                                        <th class="p-2">${T('item_name')}</th>
                                        <th class="p-2">${T('price')}</th>
                                        <th class="p-2">${T('status')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${state.purchaseHistory.map(item => `
                                        <tr class="border-b border-gray-700 last:border-b-0">
                                            <td class="p-2">${new Date(item.date).toLocaleString()}</td>
                                            <td class="p-2">${item.itemName}</td>
                                            <td class="p-2">${item.price} ${T('ks')}</td>
                                            <td class="p-2">
                                                <span class="${item.success ? 'text-green-400' : 'text-red-400'}">
                                                    ${item.success ? T('success') : `${T('failed')} (${T(item.reason)})`}
                                                </span>
                                            </td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        `}
                    </div>
                `;
                document.querySelector('[data-view="purchase-history"]').classList.add('font-bold', 'bg-gray-700');
                break;
            case 'deposit-history':
                currentTitle = T('title_deposit_history');
                html = `
                    <div class="flex items-center gap-2 mb-4">
                        <button class="back-btn p-2 rounded-lg embossed bg-gray-700 text-yellow-500">
                            <i class="fas fa-arrow-left"></i>
                        </button>
                        <h2 class="text-xl font-bold embossed-text">${T('title_deposit_history')}</h2>
                    </div>
                    <div class="bg-gray-800 rounded-lg p-4 embossed">
                        ${state.depositHistory.length === 0 ? `<p class="text-center text-gray-400">${T('no_deposit_history')}</p>` : `
                            <table class="w-full text-left text-sm">
                                <thead>
                                    <tr class="border-b border-gray-700">
                                        <th class="p-2">${T('date')}</th>
                                        <th class="p-2">${T('amount')}</th>
                                        <th class="p-2">${T('transfer_type') || 'လွှဲပြောင်းမှုအမျိုးအစား'}</th>
                                        <th class="p-2">${T('status')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${state.depositHistory.map(item => `
                                        <tr class="border-b border-gray-700 last:border-b-0">
                                            <td class="p-2">${new Date(item.date).toLocaleString()}</td>
                                            <td class="p-2">${item.amount} ${T('ks')}</td>
                                            <td class="p-2">${item.type}</td>
                                            <td class="p-2">
                                                <span class="${item.status === 'Accepted' ? 'text-green-400' : 'text-yellow-400'}">
                                                    ${item.status === 'Accepted' ? T('success') : T('in_progress') || 'ဆောင်ရွက်ဆဲ'}
                                                </span>
                                            </td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        `}
                    </div>
                `;
                document.querySelector('[data-view="deposit-history"]').classList.add('font-bold', 'bg-gray-700');
                break;
            case 'profile':
                currentTitle = T('title_profile');
                const profilePicSrc = userProfile.profilePicData || `https://placehold.co/96x96/4a4a4a/ffffff?text=${userProfile.name[0] || '?'}`;
                if (userProfile.id) {
                    html = `
                        <div class="flex items-center gap-2 mb-4">
                            <button class="back-btn p-2 rounded-lg embossed bg-gray-700 text-yellow-500">
                                <i class="fas fa-arrow-left"></i>
                            </button>
                            <h2 class="text-xl font-bold embossed-text">${T('title_profile')}</h2>
                        </div>
                        <div class="p-6 bg-gray-800 rounded-lg embossed space-y-4 text-center">
                            <div id="profile-pic-container-page" class="cursor-pointer flex flex-col items-center justify-center mb-4">
                                <div class="relative w-24 h-24 rounded-full overflow-hidden border-2 border-yellow-500 bg-gray-700 flex items-center justify-center">
                                    <img id="profile-pic-display" src="${profilePicSrc}" alt="Profile" class="w-full h-full object-cover rounded-full">
                                    <input type="file" id="profile-pic-upload" accept="image/*" class="hidden">
                                </div>
                                <h3 class="mt-2 text-xl font-bold">${userProfile.name}</h3>
                                <p class="text-sm text-gray-400 mt-1">အကောင့် ID: ${userProfile.id}</p>
                            </div>
                            
                            <div>
                                <label for="profile-name-input" class="block text-sm font-medium mb-1 text-left">${T('name')}</label>
                                <input type="text" id="profile-name-input" class="w-full p-2 text-sm rounded-lg bg-gray-700 embossed-input placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white" value="${userProfile.name}" placeholder="${T('enter_your_name')}">
                            </div>
                            <button id="save-profile-btn" class="w-full py-2 bg-yellow-500 text-gray-900 rounded-lg embossed font-bold">
                                 ${T('save_profile')}
                            </button>
                        </div>
                        
                        <div class="mt-6 p-6 bg-gray-800 rounded-lg embossed">
                            <details class="rounded-lg bg-gray-700 p-3">
                                <summary class="font-semibold cursor-pointer">${T('privacy_policy')}</summary>
                                <div class="text-sm mt-2 text-gray-300 space-y-2">
                                    <p>${T('about_desc1')}</p>
                                    <p>${T('about_desc2')}</p>
                                    <p>${T('about_desc3')}</p>
                                </div>
                            </details>
                        </div>
                        
                        <div class="mt-6 space-y-4">
                            <button id="share-btn" class="w-full py-3 px-4 bg-gray-800 rounded-lg embossed text-left flex items-center gap-4">
                                <i class="fas fa-share-alt"></i> ${T('share_app')}
                            </button>
                        </div>

                        <div class="mt-6 pt-4 border-t border-gray-700">
                            <h3 class="text-sm font-bold text-red-400 mb-2">အန္တရာယ်ရှိသော လုပ်ဆောင်ချက်များ</h3>
                            <button id="delete-account-btn" class="w-full py-3 px-4 bg-red-600 text-white rounded-lg embossed text-left flex items-center gap-4">
                                <i class="fas fa-trash-alt"></i> ${T('delete_account')}
                            </button>
                        </div>
                    `;
                } else {
                    html = `
                        <h2 class="text-2xl font-bold mb-6 embossed-text">${T('title_profile')}</h2>
                        <div class="p-6 bg-gray-800 rounded-lg embossed space-y-4 text-center">
                            <div class="flex flex-col items-center justify-center mb-4">
                                <div class="relative w-32 h-32 rounded-full overflow-hidden border-2 border-yellow-500 bg-gray-700 flex items-center justify-center">
                                    <i class="fas fa-user-circle fa-5x text-gray-400"></i>
                                </div>
                                <h3 class="mt-2 text-xl font-bold">${T('no_account')}</h3>
                                <p class="text-sm text-gray-400 mt-1">${T('no_account_desc')}</p>
                            </div>
                            <button id="create-account-btn" class="w-full py-3 px-8 bg-yellow-500 text-gray-900 rounded-lg embossed font-bold text-lg hover:bg-yellow-400 transition-colors flex items-center justify-center">
                                ${T('create_account')}
                            </button>
                        </div>
                    `;
                }
                document.querySelector('[data-view="profile"]').classList.add('font-bold', 'bg-gray-700');
                break;
            case 'settings':
                currentTitle = T('title_settings');
                html = `
                    <div class="flex items-center gap-2 mb-4">
                        <button class="back-btn p-2 rounded-lg embossed bg-gray-700 text-yellow-500">
                            <i class="fas fa-arrow-left"></i>
                        </button>
                        <h2 class="text-xl font-bold embossed-text">${T('title_settings')}</h2>
                    </div>
                    <div class="space-y-4">
                        <button id="change-language-btn" class="w-full py-3 px-4 bg-gray-800 rounded-lg embossed text-left">
                            <i class="fas fa-language mr-2"></i> ${T('language_change')}
                        </button>
                        <button id="notifications-btn" class="w-full py-3 px-4 bg-gray-800 rounded-lg embossed text-left">
                            <i class="fas fa-bell mr-2"></i> ${T('notifications')}
                        </button>
                        <button id="dark-mode-toggle" class="w-full py-3 px-4 bg-gray-800 rounded-lg embossed text-left flex items-center justify-between">
                            <span><i class="fas fa-moon mr-2"></i> ${T('dark_mode')}</span>
                            <i id="dark-mode-icon" class="fas fa-toggle-on text-yellow-500"></i>
                        </button>
                    </div>
                `;
                document.querySelector('[data-view="settings"]').classList.add('font-bold', 'bg-gray-700');
                break;
            case 'help-center':
                currentTitle = T('title_help_center');
                html = `
                    <div class="flex items-center gap-2 mb-4">
                        <button class="back-btn p-2 rounded-lg embossed bg-gray-700 text-yellow-500">
                            <i class="fas fa-arrow-left"></i>
                        </button>
                        <h2 class="text-xl font-bold embossed-text">${T('title_help_center')}</h2>
                    </div>
                    <div class="p-6 bg-gray-800 rounded-lg embossed">
                        <h3 class="text-xl font-bold mb-2">${T('help_title')}</h3>
                        <div class="text-sm space-y-2 mb-4">
                            <p><i class="fas fa-envelope mr-2"></i> ${T('email') || 'အီးမေးလ်'}: zentho.official@gmail.com</p>
                            <p><a href="https://t.me/ZenTho01" target="_blank" class="hover:underline"><i class="fab fa-telegram-plane mr-2"></i> Telegram: @ZenTho01</a></p>
                            <p><i class="fas fa-map-marker-alt mr-2"></i> ${T('address') || 'လိပ်စာ'}: Myanmar, Yangon</p>
                        </div>
                        <h3 class="text-xl font-bold mb-2">${T('faq_title')}</h3>
                        <div class="text-sm space-y-3 text-gray-300">
                            <details class="rounded-lg bg-gray-700 p-3">
                                <summary class="font-semibold cursor-pointer">${T('faq1_q')}</summary>
                                <p class="mt-2">${T('faq1_a')}</p>
                            </details>
                            <details class="rounded-lg bg-gray-700 p-3">
                                <summary class="font-semibold cursor-pointer">${T('faq2_q')}</summary>
                                <p class="mt-2">${T('faq2_a')}</p>
                            </details>
                        </div>
                    </div>
                `;
                document.querySelector('[data-view="help-center"]').classList.add('font-bold', 'bg-gray-700');
                break;
            case 'about':
                currentTitle = T('title_about');
                html = `
                    <div class="flex items-center gap-2 mb-4">
                        <button class="back-btn p-2 rounded-lg embossed bg-gray-700 text-yellow-500">
                            <i class="fas fa-arrow-left"></i>
                        </button>
                        <h2 class="text-xl font-bold embossed-text">${T('title_about')}</h2>
                    </div>
                    <div class="p-6 bg-gray-800 rounded-lg embossed">
                        <p class="text-sm text-gray-300 leading-relaxed">
                            ${T('about_desc1')}  
                            ${T('about_desc2')}
                        </p>
                        <p class="text-sm text-gray-300 leading-relaxed mt-4">
                            ${T('about_desc3')}
                        </p>
                    </div>
                `;
                document.querySelector('[data-view="about"]').classList.add('font-bold', 'bg-gray-700');
                break;
        }
        
        contentArea.innerHTML = html;
        document.getElementById('app-title').textContent = currentTitle;
        
        if (state.currentView === 'home') {
            setTimeout(startAdSlider, 0);
        } else if (state.currentView === 'game') {
            const gameIdInput = document.getElementById('game-id');
            const checkNameBtn = document.getElementById('check-name-btn');
            
            if (checkNameBtn) {
                checkNameBtn.addEventListener('click', () => {
                    const gameNameDisplay = document.getElementById('game-name-display');
                    const gameIdValue = gameIdInput.value.trim();
                    if (gameIdValue === '') {
                        gameNameDisplay.textContent = `${T('enter_game_id')}`;
                        return;
                    }
                    const gameName = dummyGameNames[gameIdValue];
                    gameNameDisplay.textContent = gameName ? `${T('game_name')}: ${gameName}` : T('game_name_not_found');
                });
            }
        }
    }

    function startAdSlider() {
        if (adInterval) clearInterval(adInterval);
        const adImages = document.querySelectorAll('#ad-slider img');
        if (adImages.length === 0) return;
        adImages[currentAdIndex].classList.add('active');
        adInterval = setInterval(() => {
            adImages[currentAdIndex].classList.remove('active');
            currentAdIndex = (currentAdIndex + 1) % adImages.length;
            adImages[currentAdIndex].classList.add('active');
        }, 5000);
    }

    function stopAdSlider() {
        if (adInterval) {
            clearInterval(adInterval);
            adInterval = null;
        }
    }

    function showHowToModal(gameId) {
        const game = games.find(g => g.id === gameId);
        if (game) {
            const howToModal = document.getElementById('how-to-modal');
            const howToTitle = document.getElementById('how-to-title');
            const howToContent = document.getElementById('how-to-content');
            
            howToTitle.textContent = `${game.name} ${T('how_to_buy')}`;
            howToContent.innerHTML = game.howTo[state.lang];
            showModal(howToModal);
        }
    }
    
    function showLanguageModal() {
        document.getElementById('lang-modal-title').textContent = T('language_select');
        showModal(languageModal);
    }
    
    function handleLanguageChange(lang) {
        state.lang = lang;
        hideModal(languageModal);
        showMessage(T('language_change'), lang === 'my' ? `ဘာသာစကားကို မြန်မာဘာသာသို့ ပြောင်းလဲပြီးပါပြီ။` : `The language has been changed to English.`);
        render();
    }

    async function handlePurchase(e) {
        if (!checkLoginAndNotify()) return;
        
        const price = parseInt(e.target.dataset.itemPrice);
        const itemName = e.target.dataset.itemName;
        const gameIdInput = document.getElementById('game-id');
        const gameId = gameIdInput.value.trim();
        const serverId = state.selectedGame === 'mlbb' ? document.getElementById('server-id').value.trim() : null;

        if (!gameId) {
            showMessage(`${T('buy_now')} ${T('failed')}`, `${T('game_id')} ${T('enter_game_id')}.`);
            return;
        }

        if (state.selectedGame === 'mlbb' && !serverId) {
            showMessage(`${T('buy_now')} ${T('failed')}`, `${T('server_id')} ${T('enter_server_id')}.`);
            return;
        }

        if (state.walletBalance < price) {
            showMessage(`${T('buy_now')} ${T('failed')}`, `${T('wallet')} ${T('reason_not_enough_balance')}. (${state.walletBalance.toLocaleString()} ${T('ks')})`);
            try {
                await addDoc(collection(db, `artifacts/${appId}/users/${userProfile.id}/purchase_history`), {
                    date: new Date().toISOString(),
                    itemName: itemName,
                    price: price,
                    success: false,
                    reason: 'not_enough_balance'
                });
            } catch (error) {
                console.error("Error logging purchase history:", error);
            }
            return;
        }

        try {
            // Update wallet balance
            const profileDocRef = doc(db, `artifacts/${appId}/users/${userProfile.id}/profile/data`);
            await updateDoc(profileDocRef, { walletBalance: state.walletBalance - price });

            // Log purchase history
            await addDoc(collection(db, `artifacts/${appId}/users/${userProfile.id}/purchase_history`), {
                date: new Date().toISOString(),
                itemName: itemName,
                price: price,
                success: true,
                reason: 'success'
            });

            showMessage(`${T('buy_now')} ${T('success')}`, `${itemName} ${T('buy_now')} ${T('success')}.`);
        } catch (error) {
            console.error("Error making purchase:", error);
            showMessage(`${T('buy_now')} ${T('failed')}`, `${T('buy_now')} ${T('failed')}. ${error.message}`);
        }
    }

    async function handleDeposit(e) {
        e.preventDefault();
        if (!checkLoginAndNotify()) return;

        const formContainer = document.getElementById('deposit-form-container');
        const type = document.getElementById('transfer-type').value;
        const amount = parseInt(document.getElementById('amount').value);
        const receipt = document.getElementById('receipt').value.trim();

        if (!amount || amount <= 0 || !receipt) {
            showMessage(`${T('deposit_title')} ${T('failed')}`, T('deposit_failed_fields'));
            return;
        }

        try {
            const newDepositRef = await addDoc(collection(db, `artifacts/${appId}/users/${userProfile.id}/deposit_history`), {
                date: new Date().toISOString(),
                type: type,
                amount: amount,
                receipt: receipt,
                status: 'In Progress'
            });
            
            showMessage(T('deposit_success'), T('deposit_received'));
            formContainer.classList.add('hidden');
            
            // Simulate a deposit acceptance after 5 seconds
            setTimeout(async () => {
                try {
                    const profileDocRef = doc(db, `artifacts/${appId}/users/${userProfile.id}/profile/data`);
                    const profileSnap = await getDoc(profileDocRef);
                    const currentBalance = profileSnap.exists() ? profileSnap.data().walletBalance : 0;
                    await updateDoc(profileDocRef, { walletBalance: currentBalance + amount });
                    await updateDoc(newDepositRef, { status: 'Accepted' });
                } catch (error) {
                    console.error("Error simulating deposit approval:", error);
                }
            }, 5000);

        } catch (error) {
            console.error("Error making deposit request:", error);
            showMessage(`${T('deposit_title')} ${T('failed')}`, `${T('deposit_title')} ${T('failed')}. ${error.message}`);
        }
    }

    function handleCopy() {
        const depositNumberElement = document.getElementById('deposit-number');
        if (!depositNumberElement) {
            showMessage(T('copy_failed') || 'ကူးယူရန် မအောင်မြင်ပါ', T('copy_failed_message') || 'ကူးယူရန်အတွက် နံပါတ်ကို ရှာမတွေ့ပါ။');
            return;
        }
        const number = depositNumberElement.textContent;
        const tempInput = document.createElement('input');
        document.body.appendChild(tempInput);
        tempInput.value = number;
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        showMessage(T('copy_success') || 'ကူးယူရန် အောင်မြင်ပါသည်', T('copy_success_message') || 'ဖုန်းနံပါတ်ကို ကူးယူပြီးပါပြီ။');
    }
    
    function handleDarkModeToggle() {
        const body = document.body;
        body.classList.toggle('dark');
        body.classList.toggle('light');
        const icon = document.getElementById('dark-mode-icon');
        if (body.classList.contains('dark')) {
            icon.classList.remove('fa-toggle-off');
            icon.classList.add('fa-toggle-on', 'text-yellow-500');
        } else {
            icon.classList.remove('fa-toggle-on', 'text-yellow-500');
            icon.classList.add('fa-toggle-off');
        }
    }

    function toggleMenuOverlay(show) {
        if (show) {
            menuOverlay.classList.remove('pointer-events-none');
            menuOverlay.classList.add('opacity-50', 'pointer-events-auto');
        } else {
            menuOverlay.classList.remove('opacity-50', 'pointer-events-auto');
            menuOverlay.classList.add('pointer-events-none');
        }
    }

    // Event Listeners
    menuBtn.addEventListener('click', () => {
        if (state.isMenuOpen) {
            sideMenu.classList.add('-translate-x-full');
            toggleMenuOverlay(false);
            state.isMenuOpen = false;
        } else {
            sideMenu.classList.remove('-translate-x-full');
            toggleMenuOverlay(true);
            state.isMenuOpen = true;
        }
    });
    
    closeMenuBtn.addEventListener('click', () => {
        sideMenu.classList.add('-translate-x-full');
        toggleMenuOverlay(false);
        state.isMenuOpen = false;
    });

    menuOverlay.addEventListener('click', () => {
        sideMenu.classList.add('-translate-x-full');
        toggleMenuOverlay(false);
        state.isMenuOpen = false;
    });
    
    closeHowToModalBtn.addEventListener('click', () => {
        hideModal(document.getElementById('how-to-modal'));
    });
    
    closeLanguageModalBtn.addEventListener('click', () => {
        hideModal(document.getElementById('language-modal'));
    });


    document.addEventListener('click', (e) => {
        const target = e.target.closest('button, [data-view], [data-game-id]');

        if (target && target.tagName === 'BUTTON') {
            // ခလုတ်နှိပ်သည့်အခါ လှုပ်ရှားမှုထည့်ရန်
            target.classList.add('shake-on-click');
            setTimeout(() => {
                target.classList.remove('shake-on-click');
            }, 500);
        }

        if (!target) return;
        
        if (target.matches('#create-account-btn')) {
            handleCreateAccount();
        } else if (target.matches('.back-btn')) {
            window.history.back();
        } else if (target.matches('[data-view]')) {
            const view = target.dataset.view;
            history.pushState({ view: view }, '', `#${view}`);
            state.selectedGame = null;
            render();
        } else if (target.matches('[data-game-id]')) {
            const gameId = target.dataset.gameId;
            state.selectedGame = gameId;
            history.pushState({ view: 'game', gameId: gameId }, '', `#game`);
            render();
        } else if (target.matches('.buy-btn')) {
            handlePurchase(e);
        } else if (target.matches('.deposit-btn')) {
            if (!checkLoginAndNotify()) return;
            const formContainer = document.getElementById('deposit-form-container');
            const transferType = document.getElementById('transfer-type');
            transferType.value = target.dataset.depositType;
            formContainer.classList.remove('hidden');
        } else if (target.matches('#show-how-to-btn')) {
            showHowToModal(state.selectedGame);
        } else if (target.matches('#copy-btn')) {
            handleCopy();
        } else if (target.matches('#dark-mode-toggle')) {
            handleDarkModeToggle();
        } else if (target.matches('#change-language-btn')) {
            showLanguageModal();
        } else if (target.matches('#notifications-btn')) {
            if (!checkLoginAndNotify()) return;
            showMessage(T('notifications'), `ဤလုပ်ဆောင်ချက်ကို မကြာမီ ထည့်သွင်းပေးပါမည်။`);
        } else if (target.matches('#save-profile-btn')) {
            handleSaveProfile();
        } else if (target.matches('#share-btn')) {
            handleShare();
        } else if (target.matches('#delete-account-btn')) {
            showMessage(T('delete_confirm_title'), T('delete_confirm_message'), true, handleDeleteAccount);
        } else if (target.matches('#profile-btn')) {
            const view = 'profile';
            history.pushState({ view: view }, '', `#${view}`);
            render();
        } else if (target.matches('#close-message-modal')) {
            hideModal(messageModal);
        } else if (target.matches('#confirm-action-btn')) {
            // This is handled by the showMessage function's onConfirm callback
        } else if (target.matches('#profile-pic-container-page')) { // changed id here
            const fileInput = document.getElementById('profile-pic-upload');
            if (fileInput) fileInput.click();
        } else if (target.matches('#lang-my')) {
            handleLanguageChange('my');
        } else if (target.matches('#lang-en')) {
            handleLanguageChange('en');
        }
    });

    document.addEventListener('change', async (e) => {
        if (e.target.id === 'profile-pic-upload') {
            const file = e.target.files[0];
            if (!file) return;

            if (!checkLoginAndNotify()) {
                   // Clear the file input if login is required
                   e.target.value = '';
                   return;
            }

            // Show a loader
            const profilePicDisplay = document.getElementById('profile-pic-display');
            profilePicDisplay.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"%3E%3Cpath fill="%23fca311" d="M12 2a10 10 0 0 1 10 10c0 5.523-4.477 10-10 10S2 17.523 2 12A10 10 0 0 1 12 2zm0 2a8 8 0 1 0 0 16A8 8 0 0 0 12 4zm-1.5 6a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3z"/%3E%3C/svg%3E';
            profilePicDisplay.style.animation = 'spin 1s linear infinite';

            const reader = new FileReader();
            reader.onloadend = async () => {
                try {
                    const profileDocRef = doc(db, `artifacts/${appId}/users/${userProfile.id}/profile/data`);
                    await updateDoc(profileDocRef, { profilePicData: reader.result });
                    showMessage(T('success'), T('profile_saved_success'));
                } catch (error) {
                    console.error("Error uploading profile pic:", error);
                    showMessage(T('failed'), `${T('profile_saved_success')} ${T('failed')}. ${error.message}`);
                } finally {
                    profilePicDisplay.style.animation = 'none';
                    render();
                }
            };
            reader.readAsDataURL(file);
        }
    });

    document.addEventListener('submit', (e) => {
        if (e.target.id === 'deposit-form') {
            handleDeposit(e);
        }
    });

    // Handle back button on mobile devices
    window.addEventListener('popstate', (event) => {
        if (state.currentView === 'home') {
            // This is the "double tap to exit" logic.
            // The first back press on the home screen shows a message.
            // The second press within 2 seconds will be allowed to exit.
            const now = new Date().getTime();
            if (now - lastBackPress < 2000) {
                // The browser will handle the exit behavior. This is the intended exit.
                console.log('Exiting app...');
            } else {
                // Show a message and push a dummy state to keep the user on the page
                lastBackPress = now;
                showMessage(T('exit_title'), T('exit_message'));
                history.pushState(null, null, window.location.href);
            }
        } else {
            // Handle normal navigation for other views.
            if (event.state && event.state.view) {
                state.currentView = event.state.view;
                if (event.state.gameId) {
                    state.selectedGame = event.state.gameId;
                }
                render();
            } else if (window.location.hash.slice(1)) {
                const hashView = window.location.hash.slice(1);
                state.currentView = hashView;
                render();
            } else {
                state.currentView = 'home';
                render();
            }
        }
    });
    
    // Firebase Auth State Listener & Firestore Data Subscription
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            userProfile.id = user.uid;
            
            const profileDocRef = doc(db, `artifacts/${appId}/users/${user.uid}/profile/data`);
            
            unsubscribeUserProfile = onSnapshot(profileDocRef, (docSnap) => {
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    userProfile.name = data.name || 'အမည်မရှိပါ';
                    userProfile.profilePicData = data.profilePicData || null;
                    state.walletBalance = data.walletBalance || 0;
                } else {
                    // This part is for new anonymous user creation. It's triggered only when a user successfully signs in.
                    setDoc(profileDocRef, {
                        name: 'ZenTho သုံးစွဲသူ',
                        walletBalance: 0,
                        profilePicData: null,
                    }, { merge: true }).then(() => console.log("New user profile created."));
                }
                if (isAuthReady) {
                    render();
                }
            });

            unsubscribePurchaseHistory = onSnapshot(collection(db, `artifacts/${appId}/users/${user.uid}/purchase_history`), (snapshot) => {
                const history = [];
                snapshot.forEach(doc => {
                    history.push(doc.data());
                });
                state.purchaseHistory = history.sort((a, b) => new Date(b.date) - new Date(a.date));
                if (isAuthReady) {
                    render();
                }
            });
            
            unsubscribeDepositHistory = onSnapshot(collection(db, `artifacts/${appId}/users/${user.uid}/deposit_history`), (snapshot) => {
                const history = [];
                snapshot.forEach(doc => {
                    history.push(doc.data());
                });
                state.depositHistory = history.sort((a, b) => new Date(b.date) - new Date(a.date));
                if (isAuthReady) {
                    render();
                }
            });
            
        } else {
            userProfile.id = null;
            userProfile.name = 'အမည်မရှိပါ';
            userProfile.profilePicData = null;
            state.walletBalance = 0;
            state.purchaseHistory = [];
            state.depositHistory = [];
            
            if (unsubscribeUserProfile) unsubscribeUserProfile();
            if (unsubscribePurchaseHistory) unsubscribePurchaseHistory();
            if (unsubscribeDepositHistory) unsubscribeDepositHistory();
        }

        if (!isAuthReady) {
            isAuthReady = true;
            if (initialAuthToken) {
                try {
                    await signInWithCustomToken(auth, initialAuthToken);
                } catch (e) {
                    console.error("Auto sign in failed:", e);
                }
            } else {
                    // Removed signInAnonymously(auth) to stop automatic account creation.
            }
            render();
        }
    });
    
    // Initial render
    const initialView = window.location.hash.slice(1) || 'home';
    state.currentView = initialView;
    render();
});