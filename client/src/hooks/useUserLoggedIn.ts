import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { userDetailsAtom, userLoggedInAtom, userTokenAtom } from "../store/atoms/UserAtom";
import axios from "axios";



export const useUserLoggedIn = () => {

    const [loading, setLoading] = useState(true);
    const [loggedIn, setLoggedIn] = useRecoilState(userLoggedInAtom);
    const setUserDetails = useSetRecoilState(userDetailsAtom);

    const token = useRecoilValue(userTokenAtom);

    useEffect(() => {
        
        if(!token) {
            setLoading(false);
            setLoggedIn(false);
        };

        axios.post(`${import.meta.env.VITE_BACKEND_URL}/profile`, {}, {
            withCredentials: true
        }).then((res) => {
            if(res.data.user){
                setLoading(false);
                setLoggedIn(true);
                setUserDetails(res.data.user);
                
            }
        })

    }, []);

    return {loading, loggedIn}
};