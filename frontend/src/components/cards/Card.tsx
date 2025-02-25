import { Card as CardT } from "@/App";
import { useInfoDispatch, useInfoSelector } from "@/store/hooks";
import { toogleActive } from "@/store/card-slice";
import { deleteCard, fetchPaginatedCards } from "@/store/card-actions";

type CardProp = {
  card: CardT;
};

const Card = ({ card }: CardProp) => {
  const dispatch = useInfoDispatch();
  const user = useInfoSelector((state) => state.user);

  const handleOnClick = (id: number) => {
    dispatch(toogleActive(id));
  };

  const onDelete = (id: number) => {
    const cardObj = {
      id: id,
      onAfterDelete: () => {
        dispatch(fetchPaginatedCards({ page: 0, userId: user.id }));
      },
    };

    dispatch(deleteCard(cardObj));
  };

  return (
    <article className={card.active ? "active" : ""}>
      <div className="card-info" onClick={() => handleOnClick(card.id)}>
        <div className="card-info-value">
          {!card.active && <p>{card.front}</p>}
          {card.active && <p>{card.back}</p>}
        </div>
        {/* <div className="card-info-category">
          <p>Category: {card.category.name}</p>
          </div> */}
      </div>
      <button onClick={() => onDelete(card.id)}>Delete</button>
      
    </article>
  );
};

export default Card;

