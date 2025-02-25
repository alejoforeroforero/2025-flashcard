import { useState } from "react";
import { useInfoDispatch, useInfoSelector } from "@/store/hooks";
import { fetchPaginatedCards } from "@/store/card-actions";
import HeaderNewCard from "./HeaderNewCard";
import HeaderCagetoryList from "./HeaderCagetoryList";
import HeaderSettings from "./HeaderSettings";
import Search from "../ui/Search";
import { FaCog } from "react-icons/fa";

import "./Header.css";

const Header = () => {
  const user = useInfoSelector((state) => state.user);
  const [createOn, setShowCreate] = useState<boolean>(false);
  const [categoriasOn, setShowCategorias] = useState<boolean>(false);
  const [settingsOn, setShowSettings] = useState<boolean>(false);

  const dispatch = useInfoDispatch();

  const handleCreateOn = () => {
    setShowCreate(!createOn);
    setShowCategorias(false);
    setShowSettings(false);
  };

  const handleCategoriasOn = () => {
    if (categoriasOn) {
      dispatch(fetchPaginatedCards({ page: 0, userId: user.id }));
    }
    setShowCategorias(!categoriasOn);
    setShowCreate(false);
    setShowSettings(false);
  };

  const handleSettingsOn = () => {
    setShowCategorias(false);
    setShowCreate(false);
    setShowSettings(!settingsOn);
  };

  return (
    <div id="card-header">
      <div className="card-header-top">
        <div className="card-header-top-left">
          <p className={createOn ? `header-button selected` : `header-button`} onClick={handleCreateOn}>
            Create 
          </p>
          <p className={categoriasOn ? `header-button selected` : `header-button`} onClick={handleCategoriasOn}>
            Categories
          </p>
        </div>
        <div className="card-header-top-right">
          <Search />
        </div>
        <div className="card-header-settings">
          <p className="" onClick={handleSettingsOn}>
            <FaCog size={24} color="#fff" />
          </p>
        </div>
      </div>
      {createOn && <HeaderNewCard />}
      {categoriasOn && <HeaderCagetoryList />}
      {settingsOn && <HeaderSettings />}
    </div>
  );
};

export default Header;
