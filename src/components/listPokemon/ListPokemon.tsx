import React, { useState, useEffect } from 'react';
import axiosPokemon from '../../config/axiosPokemon';
import axios from 'axios';

import { Grid, Stack, Center, Button, Text } from '@mantine/core';

import PokemonCard from './components/PokemonCard';


interface Pokemon {
  name: string;
  url: string;
}

function ListPokemon() {

  const [page, setPage] = useState(1);
  const [renderedPokemon, setRenderedPokemon] = useState<Pokemon[]>([]);


 useEffect(() => {
    async function fetchAllPokemonData(){
      let offsetValue = (page-1)*20;

      if(page === 1){
        offsetValue = 0;
      }
      

      let response = await axiosPokemon.get(`pokemon?limit=20&offset=${offsetValue}`);
      
      setRenderedPokemon(response.data.results);

    }

    fetchAllPokemonData();
    
  }, [page]);

  
  const renderPokemon = () => {
    return renderedPokemon.map((pokemon) => (
      <Grid.Col span={3}>
        <PokemonCard name={pokemon.name} url={pokemon.url}></PokemonCard>
      </Grid.Col>
    ));
  };

  const handleGoBack = () => {
    if(page > 1){
      setPage(page-1);
    }
  }

  const handleGoNext = () => {
    setPage(page+1);
  }


    
  return (
    <Stack>
      <Grid>
        {renderPokemon()}
      </Grid>

      <Center>
        {page === 1 ? null : <Button onClick = { handleGoBack }>&lt;</Button>}
        <Text sx={{margin:20}}>{page}</Text>
        <Button onClick = { handleGoNext }>&gt;</Button>
      </Center>

    </Stack>
  )
}

export default ListPokemon