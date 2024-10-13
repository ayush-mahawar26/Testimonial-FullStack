import { atom, RecoilState } from "recoil";

export const projectAtom: RecoilState<[]> = atom({
  key: "projectatom",
  default: [],
});

export const projectNameAtom = atom({
  key: "projectNameAtom",
  default: "",
});
export const projectHeaderAtom = atom({
  key: "projectHeaderAtom",
  default: "Header goes here....",
});
export const projectDescriptionAtom = atom({
  key: "projectDescriptionAtom",
  default: "Your custom message goes here....",
});

export const serviceNameAtom = atom({
  key: "serviceName",
  default: "",
});

export const projectImageAtom: RecoilState<File | null> = atom({
  key: "projectImg",
  default: null as File | null,
});

export const projectDetailByIdAtom = atom({
  key: "projectDetailsById",
  default: {},
});

export const inboxIndexAtom = atom({
  key: "inboxIndexAtom",
  default: 0,
});
