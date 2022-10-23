import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import App from './components/App'
import Login from './components/Login'
import Favourites from './components/Favourites'
import './index.css'
import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: "AIzaSyC_fWJFRzPOL6pr1UqqzXK7fZc95wycuNc",
  authDomain: "pokeapi-client-a17af.firebaseapp.com",
  projectId: "pokeapi-client-a17af",
  storageBucket: "pokeapi-client-a17af.appspot.com",
  messagingSenderId: "663554752747",
  appId: "1:663554752747:web:da3d608f29baf797b6beae"
};

export const firebaseApp = initializeApp(firebaseConfig)
export const userContext = React.createContext({
  uid: '',
  setUid: (() => { }) as React.Dispatch<React.SetStateAction<string>>,
});

const Index = () => {
  const [uid, setUid] = useState('');
  const context = { uid, setUid };
  const navigate = useNavigate();

  useEffect(() => {
    if (uid !== '') {
      navigate('app/list')
    } else {
      navigate('/')
    }
  }, [uid])
  return (
    <userContext.Provider value={context}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/app" element={<App />} >
          <Route path="list" element={<Favourites />} />
          <Route path="favourites" element={<div>FAV</div>} />
        </Route>
      </Routes>
    </userContext.Provider>
  )
}
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Index />
    </BrowserRouter>
  </React.StrictMode>
)
