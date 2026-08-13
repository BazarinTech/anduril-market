'use client'

import { create } from "zustand";
import { getMains } from "../backend/actions";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

type MainStoreType = {
  token: string;
  isLogin: boolean;
  isMainFetching: boolean;
  mainDetails: Mains | null;
  fetchMainDetails: (userID: string) => Promise<void>;
  logout: () => void;
  loginState: () => void;
  login: (token: string) => void
};

const TOKEN_KEY = "susyr7q3ycugfWDFF";

export const useMainStore = create<MainStoreType>((set, get) => ({
  token: "",
  isLogin: false,
  isMainFetching: false,
  mainDetails: null,

  fetchMainDetails: async (userID) => {
    set({ isMainFetching: true });
    try {
      const responseMain = await getMains({ userID });
      set({ mainDetails: responseMain });
    } catch (error) {
      console.error("MainFetchingError:", error);
    } finally {
      set({ isMainFetching: false });
    }
  },

  logout: async () => {
        try {
            await fetch("/api/logout", { method: "POST" });
        } catch (err) {
            console.error("Logout error:", err);
        }finally{
          Cookies.remove(TOKEN_KEY);
          set({ isLogin: false, mainDetails: null, token: "" });
        }
    },

  loginState: () => {
    const storedToken = Cookies.get(TOKEN_KEY);
    if (!storedToken) {
      set({ isLogin: false, token: "" });
      console.log('invalid token', storedToken)
    } else {
      set({ isLogin: true, token: storedToken });
      console.log('Valid token', storedToken)
      try {
        const decoded: { userID?: string } = jwtDecode(storedToken);
        if (decoded?.userID) {
          get().fetchMainDetails(storedToken);
        }
      } catch (err) {
        console.error("Invalid token:", err);
        set({ isLogin: false, token: "" });
        Cookies.remove(TOKEN_KEY);
      }
    }
  },
  login: (token) => {
    get().fetchMainDetails(token)
    set({isLogin: true})
  }
}));
