import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import App from './components/App'
import Login from './components/Login'
import Favourites from './components/Favourites'
import './index.css'
import { DocumentData } from 'firebase/firestore'
import { NotificationsProvider } from '@mantine/notifications'
import ListPokemon from './components/listPokemon/ListPokemon'

export const userContext = React.createContext({
  uid: '',
  setUid: (() => { }) as React.Dispatch<React.SetStateAction<string>>,
  favourites: {} as DocumentData,
  setFavourites: (() => { }) as React.Dispatch<React.SetStateAction<DocumentData>>,
});

const Index = () => {
  const [uid, setUid] = useState('');
  const [favourites, setFavourites] = useState({});
  const context = { uid, setUid, favourites, setFavourites };
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
      <NotificationsProvider position='top-center'>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/app" element={<App />} >
            <Route path="list" element={<ListPokemon></ListPokemon>} />
            <Route path="favourites" element={<Favourites />} />
          </Route>
        </Routes>
      </NotificationsProvider>
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
