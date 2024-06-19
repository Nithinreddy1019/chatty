import { useRecoilState, useRecoilValue } from "recoil";
import { ChatInput } from "./ui/ChatInput";
import { ContactSelectAtom, ContactSelectedIdAtom } from "../store/atoms/ContactSelect";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import axios, { Axios, AxiosError } from "axios";
import { FormError } from "./ui/FormError";
import { userDetailsAtom, wsAtom } from "../store/atoms/UserAtom";
import { chatMessagesAtom } from "../store/atoms/ChatMessages";

import { ChatMessage } from "./ui/ChatMessage";


export const ChatSection = () => {


    const [ selectedContactId, setSelectedContactId ] = useRecoilState(ContactSelectedIdAtom);
    const [ ws, setWs ] = useRecoilState(wsAtom);
    const [ chatMessages, setChatMessages ] = useRecoilState(chatMessagesAtom);
    const userDetails = useRecoilValue(userDetailsAtom);
    const [contactUsername, setContactUsername] = useState("");

    const [newMessage, setNewMessage] = useState("");

    const [error, setError] = useState("");

    const messageEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/chat`, {selectedContact: selectedContactId}, {withCredentials: true}).then((res) => {
            setContactUsername(res.data.contact.username);
        }).catch((error) => {
            if(error instanceof AxiosError){
                setError(error.response?.data.error);
            }
        });

        axios.post(`${import.meta.env.VITE_BACKEND_URL}/getChats`, {selectedContact: selectedContactId}, {withCredentials: true}).then((res) => {
            setChatMessages([...res.data])
        }).catch((error) => {
            if(error instanceof AxiosError){
                setError(error.response?.data.error);
            }
        })

    }, [selectedContactId])

    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewMessage(e.target.value);
    };

    const sendMessageHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        ws?.send(JSON.stringify({
            
                recepient: selectedContactId,
                text: newMessage,
                CreatedAt: new Date().toISOString()
            
        }));
        setChatMessages(prev => [...prev, {senderId:userDetails.userId, recepientId: selectedContactId, text: newMessage, CreatedAt: new Date().toISOString()}]);
        console.log(chatMessages)
        setNewMessage("")
    };

    const scrollToBottom = () => {
        if(messageEndRef) {
            messageEndRef.current?.scrollIntoView({behavior: "smooth"})

        }
    }


    useEffect(() => {
        scrollToBottom()
    }, [chatMessages])

    return (
        <>
            {
                contactUsername && <div
                className="h-full p-2 
                flex flex-col"
                >
                <div
                    className="bg-blue-500 h-14 rounded-md
                    flex items-center p-2 gap-x-4"
                >
                    <div
                        className="h-10 w-10 bg-white rounded-full
                        flex justify-center items-center group-hover:opacity-80"
                    >
                        <p className="text-xl font-semibold text-blue-500">
                            {contactUsername[0].toUpperCase()}
                        </p>
                    </div>
                    <div>
                        <p className="text-md font-semibold text-white tracking-wide">{contactUsername}</p>
                    </div>
                    </div>
                    <div
                        className="flex-1 flex flex-col space-y-2 relative py-2 pr-2
                        overflow-y-scroll scrollbar"
                        
                    >
                        
                        {
                            chatMessages.map(c => {
                                if(c.senderId === userDetails.userId) {
                                    return (
                                        <ChatMessage 
                                            key={c.CreatedAt}
                                            messageText={c.text}
                                            sent={true}
                                        />
                                    )
                                } else {
                                    return (
                                        <ChatMessage 
                                            key={c.CreatedAt}
                                            messageText={c.text}
                                            sent={false}
                                        />
                                    )
                                }
                            })
                        }
                        <div ref={messageEndRef}/>
                    </div>
    
                    <ChatInput 
                        onChange={inputChangeHandler}
                        onSubmit={sendMessageHandler}
                        value={newMessage}
                    /> 
                    
                </div>
            }
            {
                !contactUsername && 
                <div className="flex items-center h-full px-8">
                    <FormError 
                        formErrorMessage={error}
                    />
                </div>
            
            }
        </>

    )
};