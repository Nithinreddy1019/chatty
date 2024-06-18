import { atom } from "recoil";



export const ContactSelectAtom = atom({
    key: "ContactSelectAtom",
    default: false
});


export const ContactSelectedDetailsAtom = atom({
    key: "ContactSelectedDetailsAtom",
    default: ""
});