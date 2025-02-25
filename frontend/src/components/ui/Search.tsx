import { useState, useEffect, type ChangeEvent } from "react";
import { searchCards, fetchPaginatedCards } from "@/store/card-actions";
import { useInfoDispatch, useInfoSelector } from "@/store/hooks";
import { useDebounce } from "@/hooks/hooks";
import { FaSearch, FaTimes } from "react-icons/fa";

const Search = () => {
  const dispatch = useInfoDispatch();
  const user = useInfoSelector((state) => state.user);
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearch = useDebounce(searchValue);
  const [isFocused, setIsFocused] = useState(false);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleClear = () => {
    setSearchValue("");
    if (user.id > 0) {
      dispatch(fetchPaginatedCards({ page: 0, userId: user.id }));
    }
  };

  useEffect(() => {
    if (debouncedSearch) {
      const searchParams = {
        query: debouncedSearch,
        page: 0,
        userId: user.id
      };
      dispatch(searchCards(searchParams));
    } else {
      if (user.id > 0) {
        dispatch(fetchPaginatedCards({ page: 0, userId: user.id }));
      }
    }
  }, [debouncedSearch, dispatch, user.id]);

  return (
    <div className="w-full max-w-md">
      <div 
        className={`relative flex items-center bg-primary-dark border-2 rounded-lg px-3 py-2 transition-all duration-200 ${
          isFocused 
            ? 'border-accent shadow-lg shadow-primary-dark/20' 
            : 'border-primary-light'
        }`}
      >
        <FaSearch className="text-gray-400 mr-2 text-sm" />
        <input
          value={searchValue}
          onChange={handleOnChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          type="text"
          placeholder="Search cards..."
          aria-label="Search cards"
          className="flex-1 bg-transparent border-none text-secondary text-sm p-0 outline-none w-full placeholder-gray-500"
        />
        {searchValue && (
          <button
            onClick={handleClear}
            className="bg-transparent border-none text-gray-400 hover:text-secondary p-1 cursor-pointer flex items-center justify-center transition-colors duration-200"
            aria-label="Clear search"
          >
            <FaTimes className="text-sm" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Search;
