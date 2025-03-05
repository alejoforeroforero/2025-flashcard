import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "./axios";
import { RootState } from "./store";

type SearchParams = {
  query: string;
  page: number;
  userId: number;
};

export const searchCards = createAsyncThunk(
  "cards/search",
  async ({ query, page, userId }: SearchParams, { getState }) => {
    const state = getState() as RootState;
    const pageSize = state.cards.pageSize;
    
    try {
      const response = await axiosInstance.get("/search/cards?", {
        params: {
          query,
          page,
          page_size: pageSize,
          user_id: userId
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error searching cards:", error);
      throw error;
    }
  }
);


export const fetchPaginatedCards = createAsyncThunk(
  "cards/fetchPaginated",
  async ({ page, userId }: { page: number; userId: number }, { getState }) => {
    if (!userId || userId <= 0) {
      throw new Error("Valid user ID is required");
    }
    
    const state = getState() as RootState;
    const pageSize = state.cards.pageSize;
    
    try {
      const response = await axiosInstance.get(`/cards/`, {
        params: { page, page_size: pageSize, user_id: userId },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  }
);

export const getCardsByCategory = createAsyncThunk(
  "getCardsByCategory",
  async ({ id, page, userId }: { id: number; page: number; userId: number }, { getState }) => {
    const state = getState() as RootState;
    const pageSize = state.cards.pageSize;
    
    try {
      const response = await axiosInstance.get(`/categories/${id}/cards/`, {
        params: { page, page_size: pageSize, user_id: userId },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }
);

type cardInfo = {
  front: string;
  back: string;
  category_id: number;
  user_id: number;
};

type cardType = {
  card: cardInfo;
  onAfterCreate: () => void;
};

export const createCard = createAsyncThunk(
  "createCards",
  async (cardObj: cardType) => {
    try {
      const response = await axiosInstance.post("/cards/", cardObj.card);

      if (response.data) {
        cardObj.onAfterCreate();
      }
      return response.data;
    } catch (error) {
      console.error("Error creating the card:", error);
      throw error;
    }
  }
);

type cardDeleteType = {
  id: number;
  onAfterDelete: () => void;
};

export const deleteCard = createAsyncThunk(
  "deleteCard",
  async (cardObj: cardDeleteType) => {
    try {
      await axiosInstance.delete(`/cards/${cardObj.id}`);
      cardObj.onAfterDelete();
    } catch (error) {
      console.error("Error creating the card:", error);
      throw error;
    }
  }
);
