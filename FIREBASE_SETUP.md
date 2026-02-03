# Firebase Project Setup Guide

## Step 1: Create a New Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"** or **"Create a project"**
3. Enter project name: `unisiraj-smart-parking` (or your preferred name)
4. Click **Continue**
5. Disable Google Analytics (optional, you can enable it if you want)
6. Click **Create project**
7. Wait for the project to be created, then click **Continue**

---

## Step 2: Enable Firestore Database

1. In your Firebase project, click **Firestore Database** in the left sidebar
2. Click **Create database**
3. Choose **Start in production mode** (we'll add rules later)
4. Select a location close to you (e.g., `asia-southeast1` for Southeast Asia)
5. Click **Enable**
6. Wait for the database to be created

---

## Step 3: Enable Firebase Authentication

1. Click **Authentication** in the left sidebar
2. Click **Get started**
3. Click on **Email/Password** sign-in method
4. Toggle **Enable** to ON
5. Click **Save**

---

## Step 4: Create Admin User

1. Still in **Authentication**, click the **Users** tab
2. Click **Add user**
3. Enter:
   - **Email**: `GADO21774@GMAIL.COM`
   - **Password**: `Parking123#`
4. Click **Add user**

---

## Step 5: Get Firebase Configuration

1. Click the **gear icon** (⚙️) next to "Project Overview" in the left sidebar
2. Click **Project settings**
3. Scroll down to **"Your apps"** section
4. Click the **Web icon** (`</>`)
5. Register app:
   - App nickname: `unisiraj-parking-web`
   - **Do NOT** check "Also set up Firebase Hosting"
   - Click **Register app**
6. You'll see the Firebase configuration code. **Copy the `firebaseConfig` object**

It will look like this:
```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

7. Click **Continue to console**

---

## Step 6: Update Firestore Security Rules

1. Go to **Firestore Database**
2. Click the **Rules** tab
3. Replace the rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to parking slots for everyone
    match /slots/{slotId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Allow read access to activity logs for everyone
    match /logs/{logId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Allow read access to devices for everyone
    match /devices/{deviceId} {
      allow read: if true;
      allow write: if true; // ESP32 needs to write without auth
    }
  }
}
```

4. Click **Publish**

---

## Step 7: Paste Your Firebase Config Here

Once you have your `firebaseConfig` object from Step 5, paste it in the chat and I'll update your `.env.local` file automatically!

The config should look like:
```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

---

## What Happens Next?

After you provide the config:
1. I'll create your `.env.local` file with the correct values
2. You can run `npm run dev` to start the app
3. The database will auto-initialize with 5 parking slots (A1-A5)
4. You can login to admin panel with `GADO21774@GMAIL.COM` / `Parking123#`

Ready when you are! 🚀
