import { useState } from "react";

import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";


interface InputBoxProps {
    inputLabel: string, 
    inputPlaceholder: string,
    inputType: "text" | "email" | "password",

};



export const InputBox = ({
    inputLabel,
    inputPlaceholder,
    inputType,
}: InputBoxProps) => {

    const isTextOrEmail = inputType === "text" || inputType === "email";
    const isPassword = inputType === "password";

    const [passwordIsVisible, setPasswordIsVisible] = useState(false);

    const passwordVisibilityHandler = () => {
        setPasswordIsVisible(value => !value);
    };

    return (
        <>
            {isTextOrEmail && 
                <div
                    className="p-2 w-full
                    flex flex-col gap-y-2"
                >
                    <label
                        className="text-sm font-semibold"
                    >
                        {inputLabel}
                    </label>
                    <input 
                        className="rounded-md px-2 py-1
                        bg-blue-50
                        focus:outline-blue-500 border-2 focus:border-blue-500 focus:ring-blue-500"
                        placeholder={inputPlaceholder}
                        type={inputType}
                        
                    />
                </div>
            }

            {
                isPassword && 
                <div
                    className="p-2 w-full relative
                    flex flex-col gap-y-2"
                >
                    <label
                        className="text-sm font-semibold"
                    >
                        {inputLabel}
                    </label>
                    <input 
                        className="rounded-md px-2 pr-7 py-1
                        bg-blue-50
                        focus:outline-blue-500 border-2 focus:border-blue-500 focus:ring-blue-500"
                        placeholder={inputPlaceholder}
                        type={passwordIsVisible ? "text" : "password"}
                        
                    />
                    <button
                        onClick={passwordVisibilityHandler} 
                        className="absolute right-3 -bottom-0.5 -translate-y-1/2 p-1"
                    >
                        {
                            passwordIsVisible ? 
                                <IoEyeOffOutline color="gray" size={20}/> : 
                                <IoEyeOutline color="gray" size={20}/>
                        }
                    </button>
                </div>

            }
        </>
        
    )
};