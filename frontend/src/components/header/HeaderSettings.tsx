import { useInfoDispatch, useInfoSelector } from "@/store/hooks";
import {
  getCategories,
  deleteAndRefreshCategories,
} from "@/store/category-actions";
import { useEffect } from "react";
import { signout } from "@/store/user-slice";

const HeaderSettings = () => {
  const user = useInfoSelector((state) => state.user);
  const categories = useInfoSelector((state) => state.categories.list);
  const dispatch = useInfoDispatch();

  useEffect(() => {
    dispatch(getCategories(user.id));
  }, [dispatch, user]);

  const handleSignout = () => {
    dispatch(signout());
  };

  const onDelete = (id: number) => {
    dispatch(deleteAndRefreshCategories({ id, userId: user.id }));
  };

  return (
    <div id="settings">
      <div className="user">
        <p>{user.email}</p>
        <p onClick={handleSignout}>Signout</p>
      </div>
      {categories.length < 1 && <p>No categories</p>}
      {categories.length > 0 && (
        <ul>
          {categories.map((category) => {
            return (
              <li
                // onClick={() => handleGetCardsByCategory(category.id)}
                key={category.id}
              >
                <p>{category.name}</p>
                <button onClick={() => onDelete(category.id)}>Delete</button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default HeaderSettings;
