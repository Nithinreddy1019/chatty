import { atom } from "recoil";



interface messageType {
    senderId: string,
    recepientId: string,
    text: string,
    CreatedAt: string
};

export const chatMessagesAtom = atom<messageType[]>({
    key: "chatMessagesAtom",
    default: []
})