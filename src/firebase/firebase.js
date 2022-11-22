import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyD6lGkhIGgOlQeW8jJG0MVnyPpD_HgGB_A",
    authDomain: "rontgen-gamedevlopment-sandbox.firebaseapp.com",
    databaseURL: "https://rontgen-gamedevlopment-sandbox-default-rtdb.firebaseio.com",
    projectId: "rontgen-gamedevlopment-sandbox",
    storageBucket: "rontgen-gamedevlopment-sandbox.appspot.com",
    messagingSenderId: "816449004644",
    appId: "1:816449004644:web:2d134b3776e5b65a716b71"
};

export const app = initializeApp(firebaseConfig);