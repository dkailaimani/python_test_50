import React, { useState, useEffect } from 'react';
import axios from 'axios';
import cryptoJS from 'crypto-js';

const timeStampInMs = Date.now();
const publicKey = '3d7c6c122667f21f281cc97984d75d21';
const privateKey = 'e37415f5b05ef78c2cc26550e622f35c3f5b8548';
const hashInput = timeStampInMs + privateKey + publicKey; 

const hash = cryptoJS.MD5(hashInput).toString();

const CharacterDetail = ({ characterId }) => {
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    const fetchCharacterDetail = async () => {
      try {
        const response = await axios.get(
          `https://gateway.marvel.com/v1/public/characters/${characterId}?ts=1&apikey=${publicKey}&hash=${hash}`
        );
        setCharacter(response.data.data.results[0]);
      } catch (error) {
        console.error('Error fetching character detail:', error);
      }
    };

    fetchCharacterDetail();
  }, [characterId]);

  if (!character) {
    return <div>Loading character details...</div>;
  }

  return (
    <div className="character-detail">
      <h2>{character.name}</h2>
      <img
        src={`${character.thumbnail.path}/standard_fantastic.${character.thumbnail.extension}`}
        alt={character.name}
      />
      <p>{character.description || 'No description available.'}</p>
      <h3>Comics:</h3>
      <ul>
        {character.comics.items.map(comic => (
          <li key={comic.name}>{comic.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default CharacterDetail;
