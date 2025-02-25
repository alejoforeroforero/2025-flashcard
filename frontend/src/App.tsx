import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useInfoDispatch } from "@/store/hooks";
import { checkSession } from "./store/user-actions";

import "./App.css";

export type Card = {
  id: number;
  front: string;
  back: string;
  active: boolean;
  categoryId: boolean;
  category: {
    id: number;
    name: string;
  };
};

export type Category = {
  id: number;
  name: string;
  cards: Card[];
};

function App() {
  const dispatch = useInfoDispatch();

  useEffect(() => {
    dispatch(checkSession());
  });

  return (
    <>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
