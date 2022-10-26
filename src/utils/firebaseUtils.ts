import { getFirestore, setDoc, doc, updateDoc, getDoc, deleteField } from "firebase/firestore";
import { initializeApp } from 'firebase/app'
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, UserCredential } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC_fWJFRzPOL6pr1UqqzXK7fZc95wycuNc",
  authDomain: "pokeapi-client-a17af.firebaseapp.com",
  projectId: "pokeapi-client-a17af",
  storageBucket: "pokeapi-client-a17af.appspot.com",
  messagingSenderId: "663554752747",
  appId: "1:663554752747:web:da3d608f29baf797b6beae"
};
export const firebaseApp = initializeApp(firebaseConfig);
export const FIREBASE_COLLECTION_NAME = "user-favourites";

type Pokemon = {
  name: string,
  url: string,
}

export async function registerUser(info: { email: string, password: string }, setUid: Function) {
  const firebaseAuth = getAuth(firebaseApp);
  const firestore = getFirestore(firebaseApp);

  const { email, password } = info;
  createUserWithEmailAndPassword(firebaseAuth, email, password)
    .then((userCredential) => {
      const uid = userCredential.user.uid;
      setUid(uid);
      setDoc(doc(firestore, FIREBASE_COLLECTION_NAME, uid), {});
    })
};

export async function LoginUser(info: { email: string, password: string }) {
  const firebaseAuth = getAuth(firebaseApp);
  const firestore = getFirestore(firebaseApp);

  const { email, password } = info;
  const creds: UserCredential = await signInWithEmailAndPassword(firebaseAuth, email, password);
  const docRef = doc(firestore, FIREBASE_COLLECTION_NAME, creds.user.uid);
  const docSnap = (await getDoc(docRef)).data();

  return { uid: creds.user.uid, favourites: docSnap ? docSnap : {} };
};

export async function saveFavourite(uid: string, pokemon: Pokemon) {
  if (!uid || uid === '')
    throw new Error('No UID provided')

  const firestore = getFirestore(firebaseApp);
  const docRef = doc(firestore, FIREBASE_COLLECTION_NAME, uid);

  await updateDoc(docRef, {
    [pokemon.name]: pokemon
  });
  const docSnap = (await getDoc(docRef)).data();
  return docSnap ? docSnap : {};
}

export async function removeFavourite(uid: string, pokemonName: string) {
  if (!uid || uid === '')
    throw new Error('No UID provided')

  const firestore = getFirestore(firebaseApp);
  const docRef = doc(firestore, FIREBASE_COLLECTION_NAME, uid);

  await updateDoc(docRef, {
    [pokemonName]: deleteField(),
  });
  const docSnap = (await getDoc(docRef)).data();
  return docSnap ? docSnap : {};
}