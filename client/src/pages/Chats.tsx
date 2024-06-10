import { useRecoilState, useRecoilValue } from "recoil";
import { useUserLoggedIn } from "../hooks/useUserLoggedIn";
import { userDetailsAtom, userTokenAtom } from "../store/atoms/UserAtom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Chats = () => {

    const {loading, loggedIn} = useUserLoggedIn();

    const useDetails = useRecoilValue(userDetailsAtom);
    const [token, setToken] = useRecoilState(userTokenAtom);


    const navigate = useNavigate();

    useEffect(() => {
        console.log(token);
        console.log(loggedIn);
        console.log(useDetails);

        if(!loggedIn && !token) {
            navigate("/");
        };
    })

    return (
        <div>
            chats
        </div>
    )
};


export default Chats;