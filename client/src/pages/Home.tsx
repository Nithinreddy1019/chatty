import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { userDetailsAtom, userTokenAtom } from "../store/atoms/UserAtom";
import { useUserLoggedIn } from "../hooks/useUserLoggedIn";


const HomePage = () => {

    const {loading, loggedIn} = useUserLoggedIn();

    const useDetails = useRecoilValue(userDetailsAtom);
    const [token, setToken] = useRecoilState(userTokenAtom);


    const navigate = useNavigate();

    useEffect(() => {
        console.log(token);
        console.log(loggedIn);
        console.log(useDetails);

        if(loggedIn && token) {
            navigate("/chats");
        };
    })
    return (
        <div>Home Page</div>
    )
};


export default HomePage;