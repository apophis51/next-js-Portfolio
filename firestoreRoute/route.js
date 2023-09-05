// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { collection, addDoc } from "firebase/firestore"; 
import { getFirestore } from "firebase/firestore";
import { getDocs, setDoc,doc } from "firebase/firestore"; 
import { NextResponse } from 'next/server'
import { stringify } from "querystring";
 
export async function GET() {

 
 


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDBe0TWbDmfNie1j5b4B5E4t7XlZUDKnRA",
  authDomain: "malcolmbase.firebaseapp.com",
  projectId: "malcolmbase",
  storageBucket: "malcolmbase.appspot.com",
  messagingSenderId: "498365935094",
  appId: "1:498365935094:web:5f1bf245dc6f41fefd2bd7",
  measurementId: "G-Q1ETH20DTQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


try {
    const docRef = await addDoc(collection(db, "use"), {
      first: "dAda",
      last: "Lovelace",
      born: 1815
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }


const querySnapshot = await getDocs(collection(db, "Users"));
querySnapshot.forEach((doc) => {
  console.log(`${doc.id} => ${doc.data()}`);
});

  // export default function Home() {
  //   return ( <h1>hi</h1>)
  // }
  const citiesRef = collection(db, "cities");

await setDoc(doc(citiesRef, "FB"), {
    name: "San Francisco", state: "CA", country: "USA",
    capital: false, population: 860000,
    regions: ["west_coast", "norcal"] });
await setDoc(doc(citiesRef, "LA"), {
    name: "Los Angeles", state: "CA", country: "USA",
    capital: false, population: 3900000,
    regions: ["west_coast", "socal"] });
await setDoc(doc(citiesRef, "DCc"), {
    name: "Washington, D.C.", state: null, country: "USA",
    capital: true, population: 680000,
    regions: ["east_coast"] });
await setDoc(doc(citiesRef, "TOK"), {
    name: "Tokyo", state: null, country: "Japan",
    capital: true, population: 9000000,
    regions: ["kanto", "honshu"] });
await setDoc(doc(citiesRef, "BJ"), {
    name: "Beijing", state: null, country: "China",
    capital: true, population: 21500000,
    regions: ["jingjinji", "hebei"] });

const docRef = doc(db, "cities", "SF");
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  console.log("Document data:", docSnap.data());
} else {
  // docSnap.data() will be undefined in this case
  console.log("No such document!");
}
  return NextResponse.json("status good")
}