"use client"
import { useEffect, useState } from "react";
import axios from "axios";

const Pokemon1 = props => {
  const [pokemonData, setPokemonData] = useState({})
  
  useEffect(() => {
    const fetchData = async () => {
      let response = await axios.get(props.url)
      setPokemonData(response.data);
    }
    fetchData()
  }, [props.url])

  if (pokemonData.sprites){
    let img = pokemonData.sprites.front_default
    return (
      <>
        <img src={img} width={200}/>
        <h2>{pokemonData.name}</h2>
      </>
    )
  } else {
    return <></>
  }
}

export default function Home() {
  const [pokemonData, setPokemonData] = useState([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const fetchData = async () => {
      let response = await axios.get("https://pokeapi.co/api/v2/pokemon/")
      setPokemonData(response.data.results);
      setLoading(false);
    }
    fetchData()
  }, [])

  return (
    <>
    <h1>Pokemon</h1>
    {loading ? (
      <h2>loading ...</h2>
    ) : (pokemonData.map(
        (pokemon, index) => <Pokemon1 key={index} url={pokemon.url} />
      )
    )}
    </>
  );
}
