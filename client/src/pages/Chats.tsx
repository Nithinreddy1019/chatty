import { useRecoilState, useRecoilValue } from "recoil";
import { useUserLoggedIn } from "../hooks/useUserLoggedIn";
import { userDetailsAtom, userTokenAtom } from "../store/atoms/UserAtom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ContactCard } from "../components/ui/ContactCard";
import { AppuserCard } from "../components/ui/AppuserCard";
import { ChatSection } from "../components/ChatSection";

const Chats = () => {

    const navigate = useNavigate();
    const {loading, loggedIn} = useUserLoggedIn();

    const useDetails = useRecoilValue(userDetailsAtom);
    const [token, setToken] = useRecoilState(userTokenAtom);

    const [width, setWidth] = useState(300);
    

    useEffect(() => {
        console.log(token);
        console.log(loggedIn);
        console.log(useDetails);

        if(!loggedIn && !token) {
            navigate("/");
        };
    });



    return (

        <main
            className="bg-white h-screen
            flex "
        >
            <div
                className="h-full w-1/4 border-2 p-2
                flex flex-col"
            >
                <div
                    className="w-full flex-1"
                >
                    <ContactCard 
                        cardUserId="1"
                        cardUsername="Username"
                        cardLastMessage="message one"
                    />
                </div>

                <AppuserCard />
                
            </div>
            <div
                className="h-full w-3/4"
            >
                <ChatSection />
            </div>
        </main>
    )
};


export default Chats;