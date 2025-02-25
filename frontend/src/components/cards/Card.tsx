import { Card as CardT } from "@/App";
import { useInfoDispatch, useInfoSelector } from "@/store/hooks";
import { toogleActive } from "@/store/card-slice";
import { deleteCard, fetchPaginatedCards } from "@/store/card-actions";
import { FaTrash, FaExchangeAlt, FaExclamationTriangle } from "react-icons/fa";
import { useState } from "react";

type CardProp = {
  card: CardT;
};

const Card = ({ card }: CardProp) => {
  const dispatch = useInfoDispatch();
  const user = useInfoSelector((state) => state.user);
  const [isHovering, setIsHovering] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleOnClick = (id: number) => {
    dispatch(toogleActive(id));
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card flip when clicking delete
    if (!isDeleting) {
      setShowDeleteConfirm(true);
    }
  };

  const confirmDelete = () => {
    setIsDeleting(true);
    setShowDeleteConfirm(false);
    
    const cardObj = {
      id: card.id,
      onAfterDelete: () => {
        dispatch(fetchPaginatedCards({ page: 0, userId: user.id }));
        setIsDeleting(false);
      },
    };

    dispatch(deleteCard(cardObj));
  };

  const cancelDelete = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card flip when clicking cancel
    setShowDeleteConfirm(false);
  };

  return (
    <article 
      className={`h-50 rounded-lg relative overflow-hidden transition-all duration-300 transform 
      ${isHovering ? "shadow-xl scale-[1.02]" : "shadow-md"}
      ${card.active 
        ? "bg-secondary/20 shadow-[0_2px_15px_rgba(240,246,248,0.3)]" 
        : "bg-primary/15 shadow-[0_12px_15px_rgba(71,83,87,0.3)]"}
      `}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="h-full flex flex-col relative">
        {/* Card content */}
        <div 
          className={`w-full flex-grow flex justify-center items-center cursor-pointer p-6 transition-colors duration-300 ${
            card.active 
              ? "text-white" 
              : "text-secondary hover:bg-primary-dark/30"
          }`}
          onClick={() => handleOnClick(card.id)}
        >
          <div className="relative w-full h-full flex justify-center items-center">
            {/* Flip indicator - moved to top-left to avoid conflict with trash icon */}
            {!card.active && (
              <div className="absolute top-0 left-0 text-accent/70 p-1">
                <FaExchangeAlt className={`${isHovering ? "animate-pulse" : ""}`} />
              </div>
            )}
            
            <div className="w-full min-h-[100px] flex justify-center items-center">
              <p className={`text-center font-medium mt-6 ${card.active ? "text-white" : ""} break-words max-w-full`}>
                {card.active ? card.back : card.front}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Delete confirmation overlay */}
      {showDeleteConfirm && (
        <div 
          className="absolute inset-0 bg-primary-dark/80 flex flex-col items-center justify-center p-4 z-10"
          onClick={(e) => e.stopPropagation()} // Prevent card flip when clicking overlay
        >
          <div className="text-error mb-2">
            <FaExclamationTriangle className="text-2xl mx-auto" />
          </div>
          <p className="text-secondary text-center mb-4 text-sm">
            Are you sure you want to delete this card?
          </p>
          <div className="flex space-x-3">
            <button
              onClick={cancelDelete}
              className="px-3 py-1 bg-primary-light text-secondary rounded-md hover:bg-primary text-sm"
            >
              Cancel
            </button>
            <button
              onClick={confirmDelete}
              className="px-3 py-1 bg-error hover:bg-red-700 text-white rounded-md text-sm"
            >
              Delete
            </button>
          </div>
        </div>
      )}
      
      {/* Delete button */}
      <button 
        onClick={handleDeleteClick}
        className={`absolute top-2 right-2 p-2 rounded-full transition-all duration-300 ${
          isDeleting 
            ? "bg-gray-500 cursor-not-allowed" 
            : isHovering 
              ? "bg-red-500 text-white opacity-100" 
              : "bg-primary-dark/50 text-red-400 opacity-70 hover:opacity-100"
        }`}
        aria-label="Delete card"
        disabled={isDeleting}
      >
        {isDeleting ? (
          <div className="h-4 w-4 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
        ) : (
          <FaTrash className="text-sm" />
        )}
      </button>
    </article>
  );
};

export default Card;

