import { atom, useAtom } from "jotai";

const tokenAtom = atom(null);

const userInfo = atom({});

export const emailUserForgetPassword = atom("");

const dataRegistered = atom([]);

export function useToken() {
  return useAtom(tokenAtom);
}
export function useUserInfo() {
  return useAtom(userInfo);
}
export function useDataRegistered() {
  return useAtom(dataRegistered);
}
