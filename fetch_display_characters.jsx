import React, { useState, useEffect } from 'react';
import axios from 'axios';
import cryptoJS from 'crypto-js';

const publicKey = '3d7c6c122667f21f281cc97984d75d21';
const privateKey = 'e37415f5b05ef78c2cc26550e622f35c3f5b8548';
const timeStampInMs = Date.now();
const hashInput = timeStampInMs + privateKey + publicKey; 
const hash = cryptoJS.MD5(hashInput).toString(); 

const CharacterList = () => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await axios.get(
          `https://gateway.marvel.com/v1/public/characters?ts=${timeStampInMs}&apikey=${publicKey}&hash=${hash}`
        );
        setCharacters(response.data.data.results);
      } catch (error) {
        console.error('Error fetching characters:', error);
      }
    };

    fetchCharacters();
  }, []);

  return (
    <div className="character-list">
      <h2>Marvel Characters</h2>
      <div className="characters">
        {characters.map(character => (
          <div key={character.id} className="character-item">
            <img
              src={`${character.thumbnail.path}/standard_fantastic.${character.thumbnail.extension}`}
              alt={character.name}
            />
            <p>{character.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CharacterList;
