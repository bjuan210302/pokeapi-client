import { Grid, Stack, Center, Button, Text } from '@mantine/core';
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { userContext } from "../main";
import { saveFavourite } from "../utils/firebaseUtils";
import PokemonCard from '../components/listPokemon/components/PokemonCard';

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
      console.log('melo'+res.data.results)
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

  const renderPokemon = () => {
      return Object.keys(favourites).map((favKey => {
        return( <Grid.Col span={3}>
          <PokemonCard name={favourites[favKey].name} url={favourites[favKey].url} key={favourites[favKey].name}></PokemonCard>
        </Grid.Col>)
      }))
  } 

  return (
    <>
      <Grid>
        {renderPokemon()}
      </Grid>

      <Button onClick={savePokemon}>Save</Button>
    </>
  );
}

export default Favourites;