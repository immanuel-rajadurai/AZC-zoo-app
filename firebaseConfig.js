// import firebase from 'firebase/app';

// import 'firebase/messaging'; // Include if using Cloud Messaging
import { initializeApp } from 'firebase/app';


const firebaseConfig = {
    apiKey: "AIzaSyDMK_DfIHsrwvPZ7lnG0RK8Hac1QxmU1FQ", // Found in the "api_key" array
    authDomain: "appv1-4feff.firebaseapp.com", // Constructed from "project_id"
    projectId: "appv1-4feff", // Found in "project_info"
    storageBucket: "appv1-4feff.firebasestorage.app", // Found in "project_info"
    messagingSenderId: "959990537127", // Found in "project_number"
    appId: "1:959990537127:android:d93bff6dfd5479035b3482", // Found in "mobilesdk_app_id"
  };


const firebaseApp = initializeApp(firebaseConfig);

export { firebaseApp };
// Initialize Firebase
// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// } else {
//   firebase.app(); // If already initialized, use that one
// }

// export default firebase;