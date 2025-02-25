import { type Card as CardT } from "@/App";
import Card from "./Card"

import "./Cards.css";

type CardsType = {
  cards: CardT[];
};

const CardList = ({ cards }: CardsType) => {

  return (
    <ul id="card-list">
      {cards.map((card) => {
        return (
          <li key={card.id}>
            <Card card={card} />
          </li>
        );
      })}
    </ul>
  );
};

export default CardList;
