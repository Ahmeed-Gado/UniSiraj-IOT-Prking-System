// Firebase Database Initialization Script
// Run this once to set up your parking slots

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCTb48HEiCdGR3SkvRgMIobjLEJXGX8zdA",
    authDomain: "unisiraj-parking-2026.firebaseapp.com",
    projectId: "unisiraj-parking-2026",
    storageBucket: "unisiraj-parking-2026.firebasestorage.app",
    messagingSenderId: "515222709575",
    appId: "1:515222709575:web:63de69dd3a773165781862"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

async function initializeDatabase() {
    console.log('🚀 Initializing Firebase Database...\n');

    // Create 5 parking slots (A1-A5)
    const slots = ['A1', 'A2', 'A3', 'A4', 'A5'];

    for (const slotId of slots) {
        await setDoc(doc(db, 'slots', slotId), {
            id: slotId,
            status: 'available',
            lastUpdated: new Date().toISOString(),
            deviceId: `ESP32-${slotId}`,
        });
        console.log(`✅ Created slot: ${slotId}`);
    }

    console.log('\n✅ All parking slots created successfully!');
    console.log('\n📊 Database initialized with 5 parking slots (A1-A5)');
    console.log('\n🔐 Next step: Create admin user in Firebase Console');
    console.log('   Email: GADO21774@GMAIL.COM');
    console.log('   Password: Parking123#');
    console.log('\n🎉 Setup complete! Run: npm run dev');
}

initializeDatabase()
    .then(() => {
        console.log('\n✨ Initialization completed successfully!');
        process.exit(0);
    })
    .catch((error) => {
        console.error('❌ Error initializing database:', error);
        process.exit(1);
    });
