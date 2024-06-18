import { useRecoilState } from "recoil";
import { ChatInput } from "./ui/ChatInput";
import { ContactSelectAtom, ContactSelectedIdAtom } from "../store/atoms/ContactSelect";
import { useEffect, useState } from "react";
import axios, { Axios, AxiosError } from "axios";
import { FormError } from "./ui/FormError";



export const ChatSection = () => {


    const [ selectedContactId, setSelectedContactId ] = useRecoilState(ContactSelectedIdAtom);
    const [contactSelected, setContactSelected] = useRecoilState(ContactSelectAtom);

    const [contactUsername, setContactUsername] = useState("");

    const [error, setError] = useState("");


    useEffect(() => {
        
        
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/chat`, {selectedContact: selectedContactId}, {withCredentials: true}).then((res) => {
            setContactUsername(res.data.contact.username);
        }).catch((error) => {
            if(error instanceof AxiosError){
                setError(error.response?.data.error);
            }
        });
        

        console.log(contactUsername);
    }, [selectedContactId])

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
                    className="flex-1"
                    
                >
                    Messages here
                </div>
    
                    <ChatInput /> 
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