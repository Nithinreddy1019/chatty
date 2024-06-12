import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { userDetailsAtom, userTokenAtom } from "../store/atoms/UserAtom";
import { useUserLoggedIn } from "../hooks/useUserLoggedIn";
import { NavBar } from "../components/NavBar";


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
    });


    return (
        <main
            className="bg-white h-screen w-screen"
        >
            <NavBar />
        </main>
    )
};


export default HomePage;