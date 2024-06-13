import { useRecoilState, useRecoilValue } from "recoil";
import { useUserLoggedIn } from "../hooks/useUserLoggedIn";
import { userDetailsAtom, userTokenAtom } from "../store/atoms/UserAtom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ContactCard } from "../components/ui/ContactCard";
import { AppuserCard } from "../components/ui/AppuserCard";
import { ChatSection } from "../components/ChatSection";
import { ContactSelectAtom } from "../store/atoms/ContactSelect";

const Chats = () => {

    const navigate = useNavigate();

    const {loading, loggedIn} = useUserLoggedIn();

    const useDetails = useRecoilValue(userDetailsAtom);
    const [token, setToken] = useRecoilState(userTokenAtom);

    const [contactSelected, setContactSelected] = useRecoilState(ContactSelectAtom);
    

    useEffect(() => {
        console.log(token);
        console.log(loggedIn);
        console.log(useDetails);

        if(!loggedIn && !token) {
            navigate("/");
        };
    });


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
                    className="w-full flex-1 space-y-2"
                >
                    <ContactCard 
                        cardUserId="1"
                        cardUsername="Username"
                        cardLastMessage="message one"
                        onClick={contactSelectHandler}
                    />
                    <ContactCard 
                        cardUserId="1"
                        cardUsername="Username"
                        cardLastMessage="message one"
                        onClick={contactSelectHandler}
                    />
                    <ContactCard 
                        cardUserId="1"
                        cardUsername="Username"
                        cardLastMessage="message one"
                        onClick={contactSelectHandler}
                    />
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