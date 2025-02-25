import { useRef, type FormEvent, useState, useEffect } from "react";
import { useInfoDispatch, useInfoSelector } from "@/store/hooks";
import { fetchPaginatedCards, createCard } from "@/store/card-actions";
import HeaderCategory from "./HeaderCategory";

const HeaderNewCard = () => {
  const dispatch = useInfoDispatch();
  const user = useInfoSelector((state) => state.user);
  const front = useRef<HTMLInputElement>(null);
  const back = useRef<HTMLInputElement>(null);
  const categoryS = useInfoSelector((state) => state.categories.idSelected);
  const categories = useInfoSelector((state) => state.categories.list);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let successTimer: NodeJS.Timeout;
    let errorTimer: NodeJS.Timeout;
    
    if (showSuccess) {
      successTimer = setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    }
    
    if (showError) {
      errorTimer = setTimeout(() => {
        setShowError(false);
      }, 5000);
    }
    
    return () => {
      if (successTimer) clearTimeout(successTimer);
      if (errorTimer) clearTimeout(errorTimer);
    };
  }, [showSuccess, showError]);

  const handleOnSave = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const frontValue = front.current!.value.trim();
    const backValue = back.current!.value.trim();

    // Validation
    if (frontValue === "" || backValue === "" || !categoryS) {
      let message = "Please ";
      const missing = [];
      
      if (!categoryS) {
        if (categories.length === 0) {
          missing.push("create and select a category");
        } else {
          missing.push("select a category (or create a new one using the 'New' button)");
        }
      }
      if (frontValue === "") missing.push("fill in the front field");
      if (backValue === "") missing.push("fill in the back field");
      
      message += missing.join(", ").replace(/,([^,]*)$/, ' and$1');
      
      setErrorMessage(message);
      setShowError(true);
      return;
    }

    const cardObj = {
      card: {
        front: frontValue,
        back: backValue,
        category_id: categoryS,
        user_id: user.id
      },
      onAfterCreate: () => {
        dispatch(fetchPaginatedCards({ page: 0, userId: user.id }));
        setShowSuccess(true);
      },
    };

    dispatch(createCard(cardObj));
    e.currentTarget.reset();
  };

  return (
    <div className="bg-primary-light p-6 rounded-md shadow-md mb-6">
      <div className="max-w-md mx-auto">
        {showSuccess && (
          <div className="mb-4 p-3 bg-green-500/20 border border-green-500 text-green-300 rounded-md flex justify-between items-center">
            <span>Card created successfully!</span>
            <button 
              onClick={() => setShowSuccess(false)}
              className="text-green-300 hover:text-green-100"
            >
              ×
            </button>
          </div>
        )}
        
        {showError && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500 text-red-300 rounded-md flex justify-between items-center">
            <span>{errorMessage}</span>
            <button 
              onClick={() => setShowError(false)}
              className="text-red-300 hover:text-red-100"
            >
              ×
            </button>
          </div>
        )}
        
        <HeaderCategory />
        <form onSubmit={handleOnSave} className="mt-4 space-y-4">
          <div>
            <label htmlFor="front" className="block text-secondary mb-1">Front</label>
            <input 
              id="front" 
              type="text" 
              ref={front}
              className="w-full p-2 bg-primary-dark border border-primary text-secondary rounded focus:outline-none focus:ring-1 focus:ring-accent"
            />
          </div>
          <div>
            <label htmlFor="back" className="block text-secondary mb-1">Back</label>
            <input 
              id="back" 
              type="text" 
              ref={back}
              className="w-full p-2 bg-primary-dark border border-primary text-secondary rounded focus:outline-none focus:ring-1 focus:ring-accent"
            />
          </div>
          <div className="flex justify-end">
            <button 
              type="submit" 
              className="px-4 py-2 bg-accent text-primary-dark rounded hover:bg-accent/80 transition-colors duration-200"
            >
              Save Card
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HeaderNewCard;
