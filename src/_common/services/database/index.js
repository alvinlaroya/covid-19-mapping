import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCj1y7j4kta-7YXLnJYQa8dFc_ixpiMeyE",
    authDomain: "covid-19-mapping-378009.firebaseapp.com",
    projectId: "covid-19-mapping-378009",
    storageBucket: "covid-19-mapping-378009.appspot.com",
    messagingSenderId: "965004009419",
    appId: "1:965004009419:web:f578232863842f01cda04e",
    measurementId: "G-EG07EZSY5V"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { db, auth };