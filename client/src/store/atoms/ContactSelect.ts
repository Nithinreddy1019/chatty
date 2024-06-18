import { atom } from "recoil";



export const ContactSelectAtom = atom({
    key: "ContactSelectAtom",
    default: false
});


export const ContactSelectedIdAtom = atom({
    key: "ContactSelectedIdAtom",
    default: ""
});