import { Button } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { userContext } from "../main";
import { saveFavourite } from "../utils/firebaseUtils";

type Item = {
  name: string,
  url: string,
}

const API = 'https://pokeapi.co/api/v2/pokemon/';

function Favourites() {
  const { uid, favourites, setFavourites } = useContext(userContext);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsCurrentPage, setItemsCurrentPage] = useState<Array<Item>>([])

  useEffect(() => {
    axios.get(API).then((res) => {
      setItemsCurrentPage(res.data.results)
      console.log(res.data)
    });
    console.log(favourites);
  }, [])

  const savePokemon = async () => {
    try {
      const newFavs = await saveFavourite(uid, itemsCurrentPage[currentPage])
      setFavourites(newFavs);
      showNotification({
        message: 'Pokemon saved',
        color: 'green',
      })
      setCurrentPage((current) => current + 1)
    } catch (e: any) {
      showNotification({
        message: e.message,
        color: 'red',
      })
    }
  }
  
  return (
    <>
      <div>Current user ID: {uid}</div>
      {itemsCurrentPage.map((meme, i) => {
        return <div style={{ border: '1px solid red' }} key={`poke${i}`}>{JSON.stringify(meme)}</div>
      })}
      {Object.keys(favourites).map((favKey => {
        return <div style={{ border: '1px solid blue' }} key={favKey}>{JSON.stringify(favourites[favKey])}</div>
      }))}
      <Button onClick={savePokemon}>Save</Button>
    </>
  );
}

export default Favourites;