import { atom, selector } from "recoil";
import Cookies from "js-cookie";


export const userLoggedInAtom = atom({
    key: "userLoggedInAtom",
    default: false
});

export const userTokenAtom = atom({
    key: "userTokenAtom",
    default: Cookies.get("token")
});

export const userDetailsAtom = atom({
    key: "userDetailsAtom",
    default: {
        email: "",
        username: "",
        userId: ""
    }
});

