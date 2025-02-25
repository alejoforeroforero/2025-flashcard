import { useEffect } from "react";
import { useInfoDispatch, useInfoSelector } from "@/store/hooks";
import { getCategories } from "@/store/category-actions";
import { getCardsByCategory } from "@/store/card-actions";

const HeaderCagetoryList = () => {
  const dispatch = useInfoDispatch();
  const categories = useInfoSelector((state) => state.categories.list);
  const categoryIdView = useInfoSelector((state) => state.cards.categoryIdView);
  const user = useInfoSelector((state) => state.user);
   

  useEffect(() => {
    dispatch(getCategories(user.id));
  }, [dispatch, user]);

  const handleGetCardsByCategory = (id: number) => {
    dispatch(getCardsByCategory({id:id, page:0}));
  };

  return (
    <div className="card-header-category-list">
      {categories.length < 1 && <p>You have no categories created</p>}
      {categories.map((category) => {
        return (
          <p
            onClick={() => handleGetCardsByCategory(category.id)}
            key={category.id}
            className={categoryIdView == category.id ? 'selected' : 'normal'}
          >
            {category.name}
          </p>
        );
      })}
    </div>
  );
};

export default HeaderCagetoryList;
