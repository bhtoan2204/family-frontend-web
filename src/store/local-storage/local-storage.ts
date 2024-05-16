"use client";

import KeyStore from "@/store/local-storage/key-store";

const LocalStorage = {
  StoreAccessToken: (token: string) =>
    typeof window !== "undefined" &&
    localStorage.setItem(KeyStore.ACCESS_TOKEN, token),
  StoreRefreshToken: (token: string) =>
    typeof window !== "undefined" &&
    localStorage.setItem(KeyStore.REFRESH_TOKEN, token),
  GetAccessToken: () => localStorage.getItem(KeyStore.ACCESS_TOKEN),
  GetRefreshToken: () => localStorage.getItem(KeyStore.REFRESH_TOKEN),
  RemoveAccessToken: () => localStorage.removeItem(KeyStore.ACCESS_TOKEN),
  RemoveRefreshToken: () => localStorage.removeItem(KeyStore.REFRESH_TOKEN),
  StoreUserData: (userData: object) =>
    localStorage.setItem(KeyStore.USER_DATA, JSON.stringify(userData)),
  GetUserData: () => {
    const userData = localStorage.getItem(KeyStore.USER_DATA);
    return userData ? JSON.parse(userData) : null;
  },
  RemoveUserData: () => localStorage.removeItem(KeyStore.USER_DATA),
  ClearAll: () => localStorage.clear(),
};

export default LocalStorage;
