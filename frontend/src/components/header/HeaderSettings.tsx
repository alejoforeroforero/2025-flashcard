import { useInfoDispatch, useInfoSelector } from "@/store/hooks";
import {
  getCategories,
  deleteAndRefreshCategories,
} from "@/store/category-actions";
import { useEffect } from "react";
import { signout } from "@/store/user-slice";
import { FaSignOutAlt, FaTrash, FaUser } from "react-icons/fa";

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
    <div className="space-y-6">
      {/* User Profile Section - Responsive Layout */}
      <div className="bg-primary-dark/30 rounded-lg p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center mb-4 sm:mb-0">
            <div className="bg-accent rounded-full p-2 mr-3">
              <FaUser className="text-primary-dark" />
            </div>
            <div>
              <h3 className="font-medium text-secondary-light">Your Account</h3>
              <p className="text-sm text-secondary-dark truncate max-w-[200px]">{user.email}</p>
            </div>
          </div>
          <button 
            onClick={handleSignout}
            className="flex items-center justify-center w-full sm:w-auto bg-primary-dark/50 hover:bg-primary-dark text-secondary px-3 py-2 rounded-md transition-colors duration-200"
          >
            <FaSignOutAlt className="mr-2" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Categories Management Section */}
      <div>
        <h3 className="font-medium text-secondary-light mb-3 flex items-center">
          <span>Category Management</span>
          <span className="ml-2 bg-accent/80 text-primary-dark text-xs px-2 py-0.5 rounded-full">
            {categories.length}
          </span>
        </h3>
        
        {categories.length < 1 ? (
          <div className="bg-primary-dark/30 rounded-lg p-4 text-center text-secondary-dark">
            <p>You haven't created any categories yet.</p>
          </div>
        ) : (
          <div className="bg-primary-dark/30 rounded-lg overflow-hidden">
            <ul className="divide-y divide-primary-dark/50 max-h-[300px] overflow-y-auto">
              {categories.map((category) => (
                <li
                  key={category.id}
                  className="flex items-center justify-between p-3 hover:bg-primary-dark/20 transition-colors duration-200"
                >
                  <p className="text-secondary truncate max-w-[200px]">{category.name}</p>
                  <button 
                    onClick={() => onDelete(category.id)}
                    className="text-secondary-dark hover:text-accent transition-colors duration-200 p-1"
                    aria-label={`Delete ${category.name} category`}
                  >
                    <FaTrash />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      {/* App Info Section */}
      <div className="text-center text-xs text-secondary-dark pt-2 border-t border-primary-dark/30">
        <p>Flashcards App v1.0</p>
      </div>
    </div>
  );
};

export default HeaderSettings;
