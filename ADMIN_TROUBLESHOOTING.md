# 🔧 Admin Panel Not Working - Quick Fix Guide

## Most Common Issues:

### Issue 1: Email/Password Authentication Not Enabled ⚠️

**Solution:**
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select project: **unisiraj-parking-2026**
3. Click **Authentication** in the left sidebar
4. Click **Get started** (if you see this button)
5. Click on the **Sign-in method** tab
6. Click on **Email/Password**
7. Toggle **Enable** to ON
8. Click **Save**

---

### Issue 2: Admin User Not Created ⚠️

**Solution:**
1. In Firebase Console → **Authentication**
2. Click the **Users** tab
3. Click **Add user** button
4. Enter:
   - **Email**: `GADO21774@GMAIL.COM`
   - **Password**: `Parking123#`
5. Click **Add user**

---

### Issue 3: Wrong Email/Password

**Credentials:**
- **Email**: `GADO21774@GMAIL.COM` (all caps)
- **Password**: `Parking123#` (case-sensitive)

---

## Test Your Setup:

1. **Check Firebase Config**: Open `http://localhost:3000/api/test-firebase`
   - This will show if Firebase is configured correctly

2. **Try Login**: Go to `http://localhost:3000/admin/login`
   - Use: `GADO21774@GMAIL.COM` / `Parking123#`

3. **Check Browser Console**: Press F12 and look for error messages

---

## Common Error Messages:

### "Firebase: Error (auth/invalid-email)"
- Email format is wrong
- Use: `GADO21774@GMAIL.COM`

### "Firebase: Error (auth/user-not-found)"
- Admin user not created in Firebase Console
- Follow Issue 2 solution above

### "Firebase: Error (auth/wrong-password)"
- Password is incorrect
- Use: `Parking123#` (case-sensitive)

### "Firebase: Error (auth/operation-not-allowed)"
- Email/Password authentication not enabled
- Follow Issue 1 solution above

---

## Still Not Working?

1. **Clear Browser Cache**: Ctrl+Shift+Delete → Clear cache
2. **Restart Dev Server**: 
   ```bash
   # Stop the server (Ctrl+C)
   npm run dev
   ```
3. **Check .env.local**: Make sure the file exists and has correct values

---

## Need More Help?

Check the browser console (F12) for specific error messages and let me know what you see!
