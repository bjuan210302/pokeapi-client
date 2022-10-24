import React, { useState } from 'react';
import { Card, Image, Text, Badge, Button, Group, Stack } from '@mantine/core';
import axios from 'axios';

interface PokemonCardProps {
  name: string;
  url: string;
}

interface Pokemon {
  name: string;
  type: string[];
  picture: string;
}


function PokemonCard(props: PokemonCardProps) {

  const [pokemonRendered, setPokemonRendered] = useState<Pokemon>({
    name: '',
    type: [],
    picture: ''
  });


  const capitalize  = (word:string) => {
    const result1 = word.charAt(0).toUpperCase() + word.slice(1);
    console.log(result1)
    return result1;
  }

  
  async function fetchSinglePokemonData(){
    
    let response = await axios.get(props.url);
    
    return response.data;

  }

  const organizePokemonInfo = () => {
    fetchSinglePokemonData().then(value =>{
      const typesArr : string[] = [];

      value.types.map((type : any) => (
        typesArr.push(capitalize(type.type.name))
      ));
      
      let poke :Pokemon = {
        name: capitalize(props.name),
        type: typesArr,
        picture: value.sprites.front_default
      }
  
      setPokemonRendered(poke)

    })

    
  }

  const renderTypes = () => {

    return pokemonRendered.type.map((type : string) => ( 
      <Badge color="pink" variant="light">
        {type}
      </Badge>
    ))
            
      
  }
  

  organizePokemonInfo();

  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src={pokemonRendered.picture}
          fit="contain"
          height={140}
          alt="pokemon pic"
        />
      </Card.Section>

      <Stack mt="md" mb="xs">
        <Text weight={500}>{pokemonRendered.name}</Text>
        <Group>
        {renderTypes()}
        </Group>
      </Stack>

      

      <Button variant="light" color="blue" fullWidth mt="md" radius="md">
        Add to Favorites
      </Button>
    </Card>
  )
}

export default PokemonCard