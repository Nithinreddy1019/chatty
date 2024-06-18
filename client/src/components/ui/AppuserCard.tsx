
import { SlOptionsVertical } from "react-icons/sl";
import { useRecoilState, useRecoilValue } from "recoil";
import { userDetailsAtom, userLoggedInAtom, userTokenAtom } from "../../store/atoms/UserAtom";
import { useState } from "react";
import Cookies from "js-cookie";

import { IoLogOutOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export const AppuserCard = () => {


    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useRecoilState(userDetailsAtom);
    const [token, setToken] = useRecoilState(userTokenAtom);
    const [loggedIn, setLoggedIn] = useRecoilState(userLoggedInAtom);

    const [visible, setvisible] = useState(false);

    const handleLogout = () => {

        Cookies.remove("token");
        setUserDetails({email: "", userId: "", username: ""});
        setToken("");
        setLoggedIn(false);
        navigate("/");
        
    };

    return (
        userDetails && <div
            className="h-16 px-2 py-1 rounded-md bg-slate-100
            flex justify-between items-center"
        >
            <div
                className="flex items-center gap-x-2 overflow-hidden"
            >
                <div
                    className="w-10 h-12 rounded-md bg-white font-semibold text-2xl
                    flex items-center justify-center"
                >
                    {userDetails.username[0].toUpperCase()}
                </div>
                <div
                    className="flex flex-col gap-y-0 leading-4"
                >
                    <h3 className="font-semibold">{userDetails.username}</h3>
                    <p className="italic test-xs">{userDetails.email}</p>
                </div>
            </div>

            <button
                className="relative group"
                onClick={() => setvisible(!visible)}
                onBlur={() => {
                    setvisible(false);
                }}
            >   
                <div
                    className={`${!visible ? "hidden" : ""} absolute -right-2 -top-12 
                    border rounded-md bg-slate-200 p-2 shadow-md test-xs hover:scale-105 font-semibold flex items-center gap-x-1`}
                    onClick={handleLogout}
                    
                >
                    <IoLogOutOutline size={20} className="font-semibold"/>
                    Logout
                </div>
                <SlOptionsVertical size={20}/>
            </button>
        </div>
    )
};