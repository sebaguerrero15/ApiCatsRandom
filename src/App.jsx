import { useState, useEffect } from "react";
import "./App.css";

const urlFrase = "https://catfact.ninja/fact";
const urlGif = "https://cataas.com";
//const urlImage= `https://cataas.com/cat/says/${tresPalabras}?size=50&color=redjson=true`;

function App() {
  const [fact, setFact] = useState();
  const [image, setImage] = useState();

  useEffect(() => {
    fetch(urlFrase)
      .then((res) => res.json())
      .then((data) => {
        const { fact } = data;
        setFact(fact);

        const tresPalabras = fact.split(" ", 3).join(" ");
        console.log(tresPalabras);

        fetch(
          `https://cataas.com/cat/says/${tresPalabras}?size=50&color=red&json=true`
        )
          .then((res) => res.json())
          .then((response) => {
            const { url } = response;
            console.log(url)
            setImage(url);
          });
      });
  }, []);

  return (
    <main>
      <h1>App de Gift de Gatos</h1>
      {fact && <p>{fact}</p>}
      {image && (
        <img
          src={`${urlGif}${image}`}
          alt={`imagen de gato con la frase:${fact}`}
        />
      )}
    </main>
  );
}

export default App;
