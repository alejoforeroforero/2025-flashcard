import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { getCategories, createCategory } from "./category-actions";

import { Category as CategoryT } from "@/App";

export type Status = {
  list: CategoryT[];
  idSelected:number;
  status: string;
  loading: boolean;
  successMessage: string;
  error: string;

};

const initialState: Status = {
  list: [],
  idSelected:0,
  status: "",
  loading: true,
  successMessage: "",
  error: "",
};

export const categorySlice = createSlice({
  name: "categorySlice",
  initialState,
  reducers: {
    selectCategoryId: (state, action: PayloadAction<number>)=>{
      state.idSelected = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      //Get all cards
      .addCase(getCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        getCategories.fulfilled,
        (state, action: PayloadAction<CategoryT[]>) => {
          state.status = "succeeded";
          state.loading = false;
          state.successMessage = "All ok!";
          state.list = action.payload;
        }
      )
      .addCase(getCategories.rejected, (state) => {
        state.status = "failed";
        state.error = "No sabemos pero algo paso";
        alert(state.error);
      })
      //create Category
      .addCase(createCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createCategory.fulfilled, (state) => {
        state.status = "succeeded";
        state.loading = false;
        state.successMessage = "Category created";
      })
      .addCase(createCategory.rejected, (state) => {
        state.status = "failed";
        state.error = "No sabemos pero algo paso";
      })
     
  },
});

export const { selectCategoryId } = categorySlice.actions;
