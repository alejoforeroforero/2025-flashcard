import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "./axios";

export const PAGE_SIZE = 8;

type SearchParams = {
  query: string;
  page: number;
  pageSize?: number;
  userId:number;
};

export const searchCards = createAsyncThunk(
  "cards/search",
  async ({ query, page, pageSize = PAGE_SIZE, userId }: SearchParams) => {
    try {
      const response = await axiosInstance.get("/search/cards?", {
        params: {
          query,
          page,
          page_size: pageSize,
          user_id:userId
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
  async ({
    page,
    pageSize = PAGE_SIZE,
    userId,
  }: {
    page: number;
    pageSize?: number;
    userId: number;
  }) => {
    if (userId > 0) {
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
  }
);

export const getCardsByCategory = createAsyncThunk(
  "getCardsByCategory",
  async ({
    id,
    page,
    pageSize = PAGE_SIZE,
  }: {
    id: number;
    page: number;
    pageSize?: number;
  }) => {
    try {
      const response = await axiosInstance.get(`/categories/${id}/cards/`, {
        params: { page, page_size: pageSize },
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
