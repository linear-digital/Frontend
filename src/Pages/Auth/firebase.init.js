// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAIfHscZ7NQPUf_FK0LJFQcrpnVpGnJWHI",
    authDomain: "hazrat-ali-portfolio-9.firebaseapp.com",
    projectId: "hazrat-ali-portfolio-9",
    storageBucket: "hazrat-ali-portfolio-9.appspot.com",
    messagingSenderId: "16045397297",
    appId: "1:16045397297:web:df7e040dd5fcdbd6164c10",
    measurementId: "G-6E7TWFJQLK"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const analytics = getAnalytics(app);

