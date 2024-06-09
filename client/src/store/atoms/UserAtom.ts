import { atom } from "recoil";


export const userLoggedInAtom = atom({
    key: "userLoggedInAtom",
    default: false
});

export const userTokenAtom = atom({
    key: "userTokenAtom",
    default: ""
});

export const userDetailsAtom = atom({
    key: "userDetailsAtom",
    default: {
        username: "",
        email: ""
    }
});

