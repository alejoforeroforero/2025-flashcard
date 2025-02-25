import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPaginatedCards } from "./card-actions";
import axiosInstance from "./axios";

export const getCategories = createAsyncThunk(
  "getCategories",
  async (userId: number) => {
    try {
      const response = await axiosInstance.get("/categories/", {
        params: { user_id: userId },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  }
);

type categoryType = {
  name: string;
  userId: number;
  onAfterCreate: () => void;
};

export const createCategory = createAsyncThunk(
  "createCategories",
  async (categoryObj: categoryType) => {
    try {
      const response = await axiosInstance.post("/categories/", {
        name: categoryObj.name,
        user_id: categoryObj.userId,
      });
      if (response.data) {
        categoryObj.onAfterCreate();
      }
      return response.data;
    } catch (error) {
      console.error("Error creating the category:", error);
      throw error;
    }
  }
);

export const deleteAndRefreshCategories = createAsyncThunk(
  "deleteAndRefreshCategories",
  async (params: { id: number; userId: number }, { dispatch }) => {
    try {
      // Eliminar categoría
      await axiosInstance.delete(`/categories/${params.id}`);

      // Disparar las acciones de refresco
      await dispatch(getCategories(params.userId));
      await dispatch(fetchPaginatedCards({ page: 0, userId: params.userId }));

      return { id: params.id };
    } catch (error) {
      console.error("Error al eliminar y refrescar categorías:", error);
      throw error;
    }
  }
);
