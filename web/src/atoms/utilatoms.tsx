import { atom } from "recoil";

export const loadingatom = atom({
  key: "loadingatom",
  default: false,
});

export const tokenAtom = atom({
  key: "tokenatom",
  default: false,
});

export const openAtom = atom({
  key: "openatom",
  default: false,
});

export const messageAtom = atom({
  key: "messageAtom",
  default: "",
});

export const openDailog = atom({
  key: "dailogueOpen",
  default: false,
});
