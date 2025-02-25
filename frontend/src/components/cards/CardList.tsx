import { type Card as CardT } from "@/App";
import Card from "./Card";
import { motion } from "framer-motion";

type CardsType = {
  cards: CardT[];
};

const CardList = ({ cards }: CardsType) => {
  return (
    <ul className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {cards.map((card, index) => {
        return (
          <motion.li 
            key={card.id} 
            className="h-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Card card={card} />
          </motion.li>
        );
      })}
    </ul>
  );
};

export default CardList;
