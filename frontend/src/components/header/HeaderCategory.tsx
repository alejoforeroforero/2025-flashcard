import { useRef, useState, useEffect, type ChangeEvent } from "react";
import { useInfoDispatch, useInfoSelector } from "@/store/hooks";
import { getCategories, createCategory } from "@/store/category-actions";
import { selectCategoryId } from "@/store/category-slice";

const HeaderCategory = () => {
  const dispatch = useInfoDispatch();
  const categories = useInfoSelector((state) => state.categories.list);
  const categoryS = useInfoSelector((state) => state.categories.idSelected);
  const user = useInfoSelector((state) => state.user);

  const categoryName = useRef<HTMLInputElement>(null);
  const [creatingNewCategpory, setCreatingNewCategory] =
    useState<boolean>(false);

  useEffect(() => {
    dispatch(getCategories(user.id));
  }, [dispatch, user]);

  const handleOnSaveCat = () => {
    const nameval = categoryName.current!.value;

    if (nameval !== "") {
      const catObj = {
        name: nameval,
        userId:user.id,
        onAfterCreate: () => {
          dispatch(getCategories(user.id));
          setCreatingNewCategory(false);
        },
      };

      dispatch(createCategory(catObj));
    } else {
      console.log("entra algo en categorias");
    }
  };

  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(selectCategoryId(+event.target.value));
  };

  return (
    <div>
      <label htmlFor="category">
        <span
          className={
            !creatingNewCategpory ? "span-button active" : "span-button"
          }
          onClick={() => setCreatingNewCategory(false)}
        >
          Select category{" "}
        </span>
        <span>Or </span>
        <span
          className={
            creatingNewCategpory ? "span-button active" : "span-button"
          }
          onClick={() => setCreatingNewCategory(true)}
        >
          Create New
        </span>
      </label>
      {creatingNewCategpory && (
        <p>
          <label htmlFor="category-name">New Category</label>
          <input id="category-name" type="text" ref={categoryName} />
          <button onClick={handleOnSaveCat}>Create Category</button>
        </p>
      )}
      {!creatingNewCategpory && (
        <select
          name="category"
          value={categoryS || ''} 
          onChange={handleCategoryChange}
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
      )}
    </div>
  );
};

export default HeaderCategory;
