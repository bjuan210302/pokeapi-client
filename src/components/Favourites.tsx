import { Grid } from '@mantine/core';
import { useContext } from "react";
import { userContext } from "../main";
import PokemonCard from '../components/listPokemon/components/PokemonCard';

function Favourites() {
  const { favourites } = useContext(userContext);

  const renderPokemon = () => {
    return Object.keys(favourites).map((favKey => {
      return (<Grid.Col span={3}>
        <PokemonCard name={favourites[favKey].name} url={favourites[favKey].url} key={favourites[favKey].name}
          isFavCard></PokemonCard>
      </Grid.Col>)
    }))
  }

  return (
    <Grid>
      {renderPokemon()}
    </Grid>
  );
}

export default Favourites;