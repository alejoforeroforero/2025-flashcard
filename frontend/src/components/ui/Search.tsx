import { useState, useEffect, type ChangeEvent } from "react";
import { searchCards, fetchPaginatedCards } from "@/store/card-actions";
import { useInfoDispatch, useInfoSelector } from "@/store/hooks";
import { useDebounce } from "@/hooks/hooks";
import { FaSearch, FaTimes } from "react-icons/fa";
import "./Search.css";

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
    <div className="prueba-search">
      <div className={`search-container ${isFocused ? 'focused' : ''}`}>
        <FaSearch className="search-icon" />
        <input
          value={searchValue}
          onChange={handleOnChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          type="text"
          placeholder="Search cards..."
          aria-label="Search cards"
        />
        {searchValue && (
          <button
            className="clear-button"
            onClick={handleClear}
            aria-label="Clear search"
          >
            <FaTimes />
          </button>
        )}
      </div>
    </div>
  );
};

export default Search;
