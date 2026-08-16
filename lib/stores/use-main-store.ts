'use client'

import { create } from "zustand";
import { getMains } from "../backend/actions";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { SESSION_COOKIE, isExpired, type SessionClaims } from "../session";

type MainStoreType = {
  token: string;
  isLogin: boolean;
  isMainFetching: boolean;
  mainDetails: Mains | null;
  fetchMainDetails: (userID: string) => Promise<void>;
  logout: () => Promise<void>;
  loginState: () => void;
  login: (token: string) => void
};

// Was "susyr7q3ycugfWDFF" -- the literal JWT signing secret. See lib/session.ts.
const TOKEN_KEY = SESSION_COOKIE;

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
      return;
    }

    // Don't log the token. It is a bearer credential -- anything holding it can
    // act as this user until it expires, and console output ends up in
    // screenshots and support threads.
    try {
      const decoded = jwtDecode<SessionClaims>(storedToken);

      // An expired token would be rejected by the API anyway; treating it as
      // signed-in here just produces an app shell whose every request fails.
      if (isExpired(decoded)) {
        set({ isLogin: false, token: "", mainDetails: null });
        Cookies.remove(TOKEN_KEY);
        return;
      }

      if (decoded?.userID) {
        set({ isLogin: true, token: storedToken });
        get().fetchMainDetails(storedToken);
      } else {
        set({ isLogin: false, token: "" });
        Cookies.remove(TOKEN_KEY);
      }
    } catch {
      set({ isLogin: false, token: "", mainDetails: null });
      Cookies.remove(TOKEN_KEY);
    }
  },
  login: (token) => {
    get().fetchMainDetails(token)
    set({isLogin: true})
  }
}));
