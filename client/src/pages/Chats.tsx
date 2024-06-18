import { useRecoilState, useRecoilValue } from "recoil";
import { useUserLoggedIn } from "../hooks/useUserLoggedIn";
import { userDetailsAtom, userTokenAtom } from "../store/atoms/UserAtom";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ContactCard } from "../components/ui/ContactCard";
import { AppuserCard } from "../components/ui/AppuserCard";
import { ChatSection } from "../components/ChatSection";
import { ContactSelectAtom } from "../store/atoms/ContactSelect";

import { IoIosChatboxes } from "react-icons/io";

const Chats = () => {

    const navigate = useNavigate();

    const {loading, loggedIn} = useUserLoggedIn();

    const useDetails = useRecoilValue(userDetailsAtom);
    const [token, setToken] = useRecoilState(userTokenAtom);
    const [contactSelected, setContactSelected] = useRecoilState(ContactSelectAtom);
    
    const [ws, setWs] = useState<WebSocket | null>(null);
    const [onlinePeople, setOnlinePeople] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        if(!loggedIn && !token) {
            navigate("/");
        };

        const ws = new WebSocket("ws://localhost:3000")
        setWs(ws);
        ws.addEventListener('message', handleMessage)


        return () => {
            ws.close();
        }
        
    }, [loggedIn, token]);

    useEffect(() => {
        console.log(onlinePeople)
    }, [onlinePeople])

    const handleMessage = async (e: MessageEvent) => {
        const messageData = await JSON.parse(e.data);
        if(messageData.online) {
            const people = {};

            const peopleArray: [{}] = messageData.online;

            let updatedPeople: { [key: string]: string } = {}
            peopleArray.forEach((c: any) => (
                updatedPeople[c.userId] = c.username
            ))
           
            console.log(updatedPeople);
            setOnlinePeople({...updatedPeople});
        };
        
        
    };


    const contactSelectHandler = async () => {

    };

    return (

        <main
            className="bg-white h-screen
            flex "
        >
            <div
                className={`h-full md:w-1/4 border-r-2 p-2
                flex flex-col ${!contactSelected ? "w-full" : "hidden md:flex"}`}
            >
                <div 
                    className="flex items-center px-4 pb-4 pt-2 border-b-2 gap-x-2 h-fit"
                >
                    <IoIosChatboxes size={40} className="text-blue-500 pt-1"/>
                    <p className="text-3xl font-bold text-blue-500">Chatty</p>
                </div>
                <div
                    className="w-full flex-1 space-y-2 py-2"
                >
                    {
                        onlinePeople && 
                        Object.keys(onlinePeople).map(userId => {
                            if (!userId || !onlinePeople[userId]) return null;
                            return (
                                <ContactCard
                                    key={userId} 
                                    cardUserId={userId}
                                    cardUsername={onlinePeople[userId]}
                                    cardLastMessage="so"
                                    onClick={contactSelectHandler}
                                />
                            )
                            
                        })
                    }
                </div>

                <AppuserCard />
                
            </div>
            <div
                className={`h-full w-3/4
                ${!contactSelected ? "hidden md:w-3/4" : "w-full"}`}
            >
                {
                    contactSelected && <ChatSection />
                }
                
            </div>
        </main>
    )
};


export default Chats;