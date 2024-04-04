import { useEffect, useState } from "react";
import "./App.css";
import { getAllPokemon } from "./utils/pokemon";
import { getPokemon } from "./utils/pokemon";
import Card from "./components/card/card";
import Navbar from "./components/Navbar/Navbar";

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";

  const [loading, setLoading] = useState(true);
  const [pokemondata, setpokemondata] = useState([]);
  const [nextUrl, setnextUrl] = useState("");
  const [prevUrl, setprevUrl] = useState("");

  useEffect(() => {
    const fetchPokemondata = async () => {
      //全てのポケモンデータを取得
      let res = await getAllPokemon(initialURL);
      //各ポケモンの詳細なデータを取得
      loadPokemon(res.results);
      setnextUrl(res.next);
      console.log(res.next);
      setLoading(false);
    };
    fetchPokemondata();
  }, []);

  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map((pokemon) => {
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    setpokemondata(_pokemonData);
  };

  // console.log(pokemondata);

  const handlenextpage = async () => {
    setLoading(true);
    let data = await getAllPokemon(nextUrl);
    await loadPokemon(data.results);
    setnextUrl(data.next);
    setprevUrl(data.previous);
    setLoading(false);
  };

  const handleprevpage = async () => {
    if (!prevUrl) return;

    setLoading(true);
    let data = await getAllPokemon(prevUrl);
    await loadPokemon(data.results);
    setnextUrl(data.next);
    setprevUrl(data.previous);
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className="App">
        {loading ? (
          <h1>ロード中</h1>
        ) : (
          <>
            <div className="pokemonCardContainer">
              {pokemondata.map((pokemon, i) => {
                return <Card key={i} pokemon={pokemon} />;
              })}
            </div>
            <div className="btn">
              <button onClick={handleprevpage}>前へ</button>
              <button onClick={handlenextpage}>次へ</button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
