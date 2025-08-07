# Deployment Guide for Recruiter Login App

This guide will help you set up your environment, build, and deploy your React app with Firebase authentication.

## 1. Environment Variables

Create a `.env` file in the root of your project (this file is ignored by git):

```
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_firebase_app_id
REACT_APP_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id
```

Replace the values with your Firebase project credentials.

## 2. Install Dependencies

```
npm install
```

## 3. Build the App

```
npm run build
```

This will create a `build/` directory with the production-ready static files.

## 4. Deploy

You can deploy the contents of the `build/` directory to any static hosting provider. Common options:

### Firebase Hosting

1. Install Firebase CLI (if not already):
   ```
npm install -g firebase-tools
   ```
2. Login to Firebase:
   ```
firebase login
   ```
3. Initialize Firebase Hosting (run in project root):
   ```
firebase init hosting
   ```
   - Select your Firebase project
   - Set `build` as the public directory
   - Configure as a single-page app (rewrite all URLs to /index.html)
   - Do NOT overwrite `index.html` if prompted
4. Deploy:
   ```
firebase deploy
   ```

### Other Hosting (Netlify, Vercel, etc.)
- Drag and drop the `build/` folder or follow their CLI instructions.

---

For more details, see the official documentation:
- [Create React App Deployment](https://create-react-app.dev/docs/deployment/)
- [Firebase Hosting](https://firebase.google.com/docs/hosting)
