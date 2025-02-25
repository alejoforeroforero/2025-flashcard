import { useRef, useState, useEffect, type ChangeEvent } from "react";
import { useInfoDispatch, useInfoSelector } from "@/store/hooks";
import { getCategories, createCategory } from "@/store/category-actions";
import { selectCategoryId } from "@/store/category-slice";
import { FaPlus, FaExclamationCircle } from "react-icons/fa";

const HeaderCategory = () => {
  const dispatch = useInfoDispatch();
  const categories = useInfoSelector((state) => state.categories.list);
  const categoryS = useInfoSelector((state) => state.categories.idSelected);
  const user = useInfoSelector((state) => state.user);

  const categoryName = useRef<HTMLInputElement>(null);
  const [creatingNewCategory, setCreatingNewCategory] = useState<boolean>(false);
  const [showValidationMessage, setShowValidationMessage] = useState<boolean>(false);

  useEffect(() => {
    // Only fetch categories when user is logged in
    if (user.id) {
      dispatch(getCategories(user.id));
    }
  }, [dispatch, user.id]);

  // Reset validation message when category is selected
  useEffect(() => {
    if (categoryS) {
      setShowValidationMessage(false);
    }
  }, [categoryS]);

  const handleOnSaveCat = () => {
    const nameval = categoryName.current!.value.trim();

    if (nameval !== "") {
      const catObj = {
        name: nameval,
        userId: user.id,
        onAfterCreate: () => {
          dispatch(getCategories(user.id));
          setCreatingNewCategory(false);
        },
      };

      dispatch(createCategory(catObj));
      // Clear input after submission
      categoryName.current!.value = "";
    } else {
      // Show proper error message to user
      alert("Category name cannot be empty");
    }
  };

  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(selectCategoryId(+event.target.value));
    setShowValidationMessage(false);
  };

  const handleFocus = () => {
    if (!categoryS && !creatingNewCategory) {
      setShowValidationMessage(true);
    }
  };

  return (
    <div className="mb-4">
      <label htmlFor="category" className="block text-secondary mb-2 font-medium">
        Select Category
      </label>
      
      <div className="relative">
        {!creatingNewCategory ? (
          <div className="flex flex-col">
            <div className="flex items-center">
              <select
                id="category"
                name="category"
                value={categoryS || ''}
                onChange={handleCategoryChange}
                onFocus={handleFocus}
                className={`w-full p-2 bg-primary-dark border ${showValidationMessage ? 'border-red-500' : 'border-primary'} text-secondary rounded focus:outline-none focus:ring-1 focus:ring-accent`}
              >
                <option value="" disabled>
                  -- Select a category --
                </option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => setCreatingNewCategory(true)}
                className="ml-2 p-2 bg-accent text-primary-dark rounded hover:bg-accent/90 transition-colors duration-200 flex items-center"
                aria-label="Create new category"
              >
                <FaPlus className="text-sm" />
                <span className="ml-1 text-sm">New</span>
              </button>
            </div>
            
            {showValidationMessage && (
              <div className="mt-1 text-red-400 text-sm flex items-center">
                <FaExclamationCircle className="mr-1" />
                <span>
                  {categories.length === 0 
                    ? "Please create a new category" 
                    : "Please select a category or create a new one"}
                </span>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center">
            <input
              id="category-name"
              type="text"
              ref={categoryName}
              placeholder="Enter new category name"
              className="w-full p-2 bg-primary-dark border border-primary text-secondary rounded focus:outline-none focus:ring-1 focus:ring-accent"
              autoFocus
            />
            <div className="flex ml-2">
              <button
                type="button"
                onClick={handleOnSaveCat}
                className="p-2 bg-accent text-primary-dark rounded-l hover:bg-accent/90 transition-colors duration-200 text-sm"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setCreatingNewCategory(false)}
                className="p-2 bg-primary-dark text-secondary rounded-r border-l border-primary hover:bg-primary/80 transition-colors duration-200 text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeaderCategory;
