import { auth } from './firebase';

// Simple test to check if Firebase Auth is working
function testFirebase() {
  try {
    console.log('Firebase Auth instance:', auth);
    console.log('Current user:', auth.currentUser);
    if (auth) {
      console.log('Firebase initialized successfully!');
    } else {
      console.error('Firebase not initialized.');
    }
  } catch (error) {
    console.error('Firebase test failed:', error);
  }
}

testFirebase(); 