import React from "react";
import "./card.css";

const Card = ({ pokemon }) => {
  return (
    <div className="card">
      <div className="cardimg">
        <img src={pokemon.sprites.front_default} alt="" />
      </div>
      <h3 className="cardname">{pokemon.name}</h3>
      <div className="cardTypes">
        <div>タイプ</div>
        {pokemon.types.map((type) => {
          return (
            <div key={type.type.name}>
              <span className="typename">{type.type.name}</span>
            </div>
          );
        })}
      </div>
      <div className="cardinfo">
        <div className="cardData">
          <p className="titile">重さ:{pokemon.weight}</p>
        </div>
        <div className="cardData">
          <p className="title">高さ:{pokemon.height}</p>
        </div>
        <div className="cardData">
          <p className="title">
            アビリティ:{pokemon.abilities[0].ability.name}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
