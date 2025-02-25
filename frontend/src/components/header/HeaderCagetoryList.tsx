import { useEffect, useRef, useState } from "react";
import { useInfoDispatch, useInfoSelector } from "@/store/hooks";
import { getCategories } from "@/store/category-actions";
import { getCardsByCategory, fetchPaginatedCards } from "@/store/card-actions";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const HeaderCagetoryList = () => {
  const dispatch = useInfoDispatch();
  const categories = useInfoSelector((state) => state.categories.list);
  const categoryIdView = useInfoSelector((state) => state.cards.categoryIdView);
  const user = useInfoSelector((state) => state.user);
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(false);

  useEffect(() => {
    dispatch(getCategories(user.id));
  }, [dispatch, user]);

  useEffect(() => {
    const checkScroll = () => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        setShowLeftScroll(scrollLeft > 0);
        setShowRightScroll(scrollLeft < scrollWidth - clientWidth - 5);
      }
    };

    // Check initial scroll state
    checkScroll();

    // Add scroll event listener
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', checkScroll);
      return () => scrollContainer.removeEventListener('scroll', checkScroll);
    }
  }, [categories]);

  const handleGetCardsByCategory = (id: number) => {
    // Reset to first page when changing categories
    dispatch(getCardsByCategory({id: id, page: 0}));
  };

  // Function to close category view and fetch all cards
  const handleCloseCategory = () => {
    dispatch(fetchPaginatedCards({ page: 0, userId: user.id }));
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-primary-light p-4 rounded-md shadow-md mb-6">
      {categories.length < 1 && (
        <p className="text-center text-secondary py-4">You have no categories created</p>
      )}
      
      {categories.length > 0 && (
        <div className="relative">
          {/* Left scroll button */}
          {showLeftScroll && (
            <button 
              onClick={scrollLeft}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-primary-dark/70 text-secondary p-2 rounded-full shadow-md hover:bg-primary-dark transition-colors duration-200"
              aria-label="Scroll left"
            >
              <FaChevronLeft />
            </button>
          )}
          
          {/* Scrollable container */}
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto py-2 px-6 scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {/* All Cards button */}
            <button
              className={`flex-shrink-0 px-4 py-2 mx-1 rounded-full cursor-pointer transition-colors duration-200 whitespace-nowrap ${
                categoryIdView === 0 || !categoryIdView
                  ? 'bg-accent text-primary-dark font-medium' 
                  : 'bg-primary-dark/30 text-secondary hover:bg-primary-dark/50'
              }`}
              onClick={handleCloseCategory}
            >
              All Cards
            </button>
            
            {categories.map((category) => (
              <button
                key={category.id}
                className={`flex-shrink-0 px-4 py-2 mx-1 rounded-full cursor-pointer transition-colors duration-200 whitespace-nowrap ${
                  categoryIdView === category.id 
                    ? 'bg-accent text-primary-dark font-medium' 
                    : 'bg-primary-dark/30 text-secondary hover:bg-primary-dark/50'
                }`}
                onClick={() => handleGetCardsByCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
          
          {/* Right scroll button */}
          {showRightScroll && (
            <button 
              onClick={scrollRight}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-primary-dark/70 text-secondary p-2 rounded-full shadow-md hover:bg-primary-dark transition-colors duration-200"
              aria-label="Scroll right"
            >
              <FaChevronRight />
            </button>
          )}
        </div>
      )}
      
      {/* Add CSS to hide scrollbar */}
      <style>
        {`
        /* Hide scrollbar for Chrome, Safari and Opera */
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        `}
      </style>
    </div>
  );
};

export default HeaderCagetoryList;
