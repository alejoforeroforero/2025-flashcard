import { useState } from "react";
import { useInfoSelector } from "@/store/hooks";
import HeaderNewCard from "./HeaderNewCard";
import HeaderCagetoryList from "./HeaderCagetoryList";
import HeaderSettings from "./HeaderSettings";
import Search from "../ui/Search";
import { FaCog, FaPlus, FaList, FaTimes } from "react-icons/fa";

const Header = () => {
  const categories = useInfoSelector((state) => state.categories.list);
  const categoryIdView = useInfoSelector((state) => state.cards.categoryIdView);
  const [createOn, setShowCreate] = useState<boolean>(false);
  const [categoriasOn, setShowCategorias] = useState<boolean>(false);
  const [settingsOn, setShowSettings] = useState<boolean>(false);

  const handleCreateOn = () => {
    setShowCreate(!createOn);
    setShowCategorias(false);
    setShowSettings(false);
  };

  const handleCategoriasOn = () => {
    // We no longer reset to all cards when closing the panel
    setShowCategorias(!categoriasOn);
    setShowCreate(false);
    setShowSettings(false);
  };

  const handleSettingsOn = () => {
    setShowSettings(!settingsOn);
    setShowCreate(false);
    setShowCategorias(false);
  };

  const closeAllPanels = () => {
    setShowCreate(false);
    setShowCategorias(false);
    setShowSettings(false);
  };

  // Get current category name
  const getCurrentCategoryName = () => {
    if (!categoryIdView) return "All Cards";
    const currentCategory = categories.find(cat => cat.id === categoryIdView);
    return currentCategory ? currentCategory.name : "All Cards";
  };

  return (
    <div className="w-full">
      {/* Desktop Header */}
      <div className="hidden md:flex items-center justify-between mb-4 relative">
        <div className="flex items-center space-x-4">
          <button
            className={`flex items-center justify-center p-3 rounded-full transition-all duration-500 ${
              createOn 
                ? "bg-accent text-primary-dark shadow-md" 
                : "bg-primary-light text-secondary hover:bg-primary-light/80"
            }`}
            onClick={handleCreateOn}
            aria-label="New Card"
          >
            <FaPlus className="text-lg" />
            <span className="ml-2 font-medium">New Card</span>
          </button>
          
          <button
            className={`flex items-center justify-center p-3 rounded-full transition-all duration-500 ${
              categoriasOn 
                ? "bg-accent text-primary-dark shadow-md" 
                : "bg-primary-light text-secondary hover:bg-primary-light/80"
            }`}
            onClick={handleCategoriasOn}
            aria-label="Categories"
          >
            <FaList className="text-lg" />
            <span className="ml-2 font-medium">Categories</span>
          </button>
          
          <div className="ml-4 w-80">
            <Search />
          </div>
        </div>
        
        <button 
          onClick={handleSettingsOn}
          className={`flex items-center justify-center p-3 rounded-full transition-all duration-500 ${
            settingsOn 
              ? "bg-accent text-primary-dark shadow-md" 
              : "bg-primary-light text-secondary hover:bg-primary-light/80"
          }`}
          aria-label="Settings"
        >
          <FaCog className="text-lg" />
          <span className="ml-2 font-medium">Settings</span>
        </button>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden flex flex-col mb-3">
        <div className="flex justify-between items-center mb-2">
          <div className="flex space-x-2">
            <button
              className={`flex items-center justify-center p-3 rounded-full transition-all duration-500 ${
                createOn 
                  ? "bg-accent text-primary-dark shadow-md" 
                  : "bg-primary-light text-secondary"
              }`}
              onClick={handleCreateOn}
              aria-label="New Card"
            >
              <FaPlus className="text-lg" />
            </button>
            
            <button
              className={`flex items-center justify-center p-3 rounded-full transition-all duration-500 ${
                categoriasOn 
                  ? "bg-accent text-primary-dark shadow-md" 
                  : "bg-primary-light text-secondary"
              }`}
              onClick={handleCategoriasOn}
              aria-label="Categories"
            >
              <FaList className="text-lg" />
            </button>
            
            <button 
              onClick={handleSettingsOn}
              className={`flex items-center justify-center p-3 rounded-full transition-all duration-500 ${
                settingsOn 
                  ? "bg-accent text-primary-dark shadow-md" 
                  : "bg-primary-light text-secondary"
              }`}
              aria-label="Settings"
            >
              <FaCog className="text-lg" />
            </button>
          </div>
        </div>
        
        <Search />
      </div>

      {/* Category indicator - visible when category panel is closed */}
      {!categoriasOn && (
        <div className="text-secondary text-sm mb-2">
          <span className="font-medium">Currently viewing:</span> <span className="text-accent font-medium">{getCurrentCategoryName()}</span>
        </div>
      )}

      {/* Content panels with transitions */}
      <div className="relative">
        {/* New Card Panel */}
        <div 
          className={`transition-all duration-500 ease-in-out transform ${
            createOn 
              ? "opacity-100 translate-y-0" 
              : "opacity-0 -translate-y-4 pointer-events-none absolute"
          }`}
        >
          {createOn && (
            <div className="bg-primary-light rounded-lg p-4 shadow-lg relative">
              <button 
                onClick={closeAllPanels}
                className="absolute top-2 right-2 bg-secondary-light hover:bg-secondary-dark text-primary-dark p-2 rounded-full transition-all duration-300 shadow-sm"
                aria-label="Close panel"
              >
                <FaTimes className="text-base" />
              </button>
              <HeaderNewCard />
            </div>
          )}
        </div>
        
        {/* Categories Panel */}
        <div 
          className={`transition-all duration-500 ease-in-out transform ${
            categoriasOn 
              ? "opacity-100 translate-y-0" 
              : "opacity-0 -translate-y-4 pointer-events-none absolute"
          }`}
        >
          {categoriasOn && (
            <div className="rounded-lg p-4 relative">
              <button 
                onClick={closeAllPanels}
                className="absolute top-2 right-2 bg-secondary-light hover:bg-secondary-dark text-primary-dark p-2 rounded-full transition-all duration-300 shadow-sm"
                aria-label="Close panel"
              >
                <FaTimes className="text-base" />
              </button>
              <HeaderCagetoryList />
            </div>
          )}
        </div>
        
        {/* Settings Panel */}
        <div 
          className={`transition-all duration-500 ease-in-out transform ${
            settingsOn 
              ? "opacity-100 translate-y-0" 
              : "opacity-0 -translate-y-4 pointer-events-none absolute"
          }`}
        >
          {settingsOn && (
            <div className="bg-primary-light rounded-lg p-4 shadow-lg relative">
              <button 
                onClick={closeAllPanels}
                className="absolute top-2 right-2 bg-secondary-light hover:bg-secondary-dark text-primary-dark p-2 rounded-full transition-all duration-300 shadow-sm"
                aria-label="Close panel"
              >
                <FaTimes className="text-base" />
              </button>
              <HeaderSettings />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
