import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
  fetchPaginatedCards,
  getCardsByCategory,
  createCard,
  deleteCard,
  searchCards,
} from "./card-actions";

import { Card as CardT } from "@/App";

export type Status = {
  info: CardT[];
  totalCount: number;
  currentPage: number;
  mode: string;
  categoryIdView: number;
  query: string;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  loading: boolean;
  successMessage: string;
  error: string;
};

const initialState: Status = {
  info: [],
  totalCount: 0,
  currentPage: 0,
  mode: "all",
  categoryIdView: 0,
  query: "",
  status: 'idle',
  loading: false,
  successMessage: "",
  error: "",
};

export const cardSlice = createSlice({
  name: "CardSlice",
  initialState,
  reducers: {
    toogleActive: (state, action: PayloadAction<number>) => {
      const cardItem = state.info.find((card) => card.id === action.payload);
      if (cardItem) {
        cardItem.active = !cardItem.active;
      }
    },
    clearError: (state) => {
      state.error = "";
    },
    clearSuccessMessage: (state) => {
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // Get all paginated cards
      .addCase(fetchPaginatedCards.pending, (state) => {
        state.status = "loading";
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchPaginatedCards.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        state.info = action.payload.cards.map((card: CardT) => ({
          ...card,
          active: false,
        }));
        state.totalCount = action.payload.total_count;
        state.currentPage = action.payload.current_page;
        state.categoryIdView = 0;
        state.mode = "all";
      })
      .addCase(fetchPaginatedCards.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;
        state.error = action.error.message || "Failed to fetch cards";
      })
      // Get cards by category
      .addCase(getCardsByCategory.pending, (state) => {
        state.status = "loading";
        state.loading = true;
        state.error = "";
      })
      .addCase(getCardsByCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        state.info = action.payload.cards.map((card: CardT) => ({
          ...card,
          active: false,
        }));
        state.totalCount = action.payload.total_count;
        state.currentPage = action.payload.current_page;
        state.mode = "category";
        state.categoryIdView = action.payload.category_id;
      })
      .addCase(getCardsByCategory.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;
        state.error = action.error.message || "Failed to fetch category cards";
      })
      // Create card
      .addCase(createCard.pending, (state) => {
        state.status = "loading";
        state.loading = true;
        state.error = "";
        state.successMessage = "";
      })
      .addCase(createCard.fulfilled, (state) => {
        state.status = "succeeded";
        state.loading = false;
        state.successMessage = "Card created successfully";
      })
      .addCase(createCard.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;
        state.error = action.error.message || "Failed to create card";
      })
      // Delete card
      .addCase(deleteCard.pending, (state) => {
        state.status = "loading";
        state.loading = true;
        state.error = "";
        state.successMessage = "";
      })
      .addCase(deleteCard.fulfilled, (state) => {
        state.status = "succeeded";
        state.loading = false;
        state.successMessage = "Card deleted successfully";
      })
      .addCase(deleteCard.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;
        state.error = action.error.message || "Failed to delete card";
      })
      // Search
      .addCase(searchCards.pending, (state) => {
        state.status = "loading";
        state.loading = true;
        state.error = "";
      })
      .addCase(searchCards.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        state.info = action.payload.cards;
        state.totalCount = action.payload.total_count;
        state.currentPage = action.payload.current_page;
        state.mode = "search";
        state.query = action.payload.search_term;
      })
      .addCase(searchCards.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;
        state.error = action.error.message || "Failed to search cards";
      });
  },
});

export const { toogleActive, clearError, clearSuccessMessage } = cardSlice.actions;
export default cardSlice;