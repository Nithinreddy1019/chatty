import { Footer } from "./ui/Footer";
import { Header } from "./ui/Header";

import authsvg from "../assets/authsvg.svg";
import { SubmitHandler, useForm } from "react-hook-form";
import { RegisterSchema } from "../schema/auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { FormError } from "./ui/FormError";
import { FormSuccess } from "./ui/FormSuccess";
import { useRecoilState, useRecoilValue } from "recoil";
import { userDetailsAtom, userTokenAtom } from "../store/atoms/UserAtom";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useUserLoggedIn } from "../hooks/useUserLoggedIn";


export const Registerform = () => {

    const [isPending, setIsPending] = useState(false);

    const [token, setToken] = useRecoilState(userTokenAtom);


    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    const [passwordIsVisible, setPasswordIsVisible] = useState(false);

    const navigate = useNavigate();

    const {loading, loggedIn} = useUserLoggedIn();

    const useDetails = useRecoilValue(userDetailsAtom)

    useEffect(() => {
        console.log(token);
        console.log(loggedIn);
        console.log(useDetails);

        if(loggedIn && token) {
            navigate("/chats");
        }
    })

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<z.infer<typeof RegisterSchema>>({
        defaultValues: {
            email: "",
            username: "",
            password: ""
        },
        resolver: zodResolver(RegisterSchema)
    });


    const passwordVisibilityHandler = () => {
        setPasswordIsVisible(value => !value);
    };

    const onSubmit: SubmitHandler<z.infer<typeof RegisterSchema>> = async (values) => {
        setIsPending(true);
        setError("");
        setSuccess("");

        
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/signup`, { ...values }, {withCredentials: true});

            setSuccess(response.data.message);   
            setToken(Cookies.get("token")!);

            navigate("/chats");
            
        } catch (error) {
            if(error instanceof AxiosError) {
                setError(error.response?.data.error)
            } else {
                setError("Something went wrong")
            };
        } finally {
            setIsPending(false);
        }
    };

    return (
        <main
            className="h-screen flex items-center justify-center
            bg-blue-100"
        >

            <div className="flex
            p-2 rounded-xl shadow-lg border-2 border-blue-500">

                <div
                    className="hidden w-0 md:w-fit md:block"
                >
                    <img src={authsvg} className="w-96 h-96"/>
                </div>

                <form
                    className="p-2 
                    flex flex-col items-center
                    w-[350px]"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Header 
                        headerLabel="Welcome to Chatty"
                        headerSubLabel="register to continue"
                    />

                    {/* Email */}
                    <div
                        className="p-2 w-full
                        flex flex-col gap-y-2"
                    >
                        <label
                            className="text-sm font-semibold"
                        >
                            Email
                        </label>
                        <input 
                            className="rounded-md px-2 py-1
                            bg-blue-50
                            focus:outline-blue-500 border-2 focus:border-blue-500 focus:ring-blue-500"
                            placeholder="JohnDoe@gmail.com"
                            type="email"
                            {...register("email")}
                            disabled={isPending}
                        />
                    </div>
                    {errors && <p className="text-xs text-red-500">{errors.email?.message}</p>}

                    {/* Username */}
                    <div
                        className="p-2 w-full
                        flex flex-col gap-y-2"
                    >
                        <label
                            className="text-sm font-semibold"
                        >
                            Username
                        </label>
                        <input 
                            className="rounded-md px-2 py-1
                            bg-blue-50
                            focus:outline-blue-500 border-2 focus:border-blue-500 focus:ring-blue-500"
                            placeholder="JohnDoe"
                            type="text"
                            {...register("username")}
                            disabled={isPending}
                        />
                    </div>
                    {errors && <p className="text-xs text-red-500">{errors.username?.message}</p>}

                    {/* Password */}
                    <div
                        className="p-2 w-full relative
                        flex flex-col gap-y-2"
                    >
                        <label
                            className="text-sm font-semibold"
                        >
                            Password
                        </label>
                        <input 
                            className="rounded-md px-2 pr-7 py-1
                            bg-blue-50
                            focus:outline-blue-500 border-2 focus:border-blue-500 focus:ring-blue-500"
                            placeholder="******"
                            type={passwordIsVisible ? "text" : "password"}
                            {...register("password")}
                            disabled={isPending}
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
                    {errors && <p className="text-xs text-red-500">{errors.password?.message}</p>}

                        
                    <div className="p-2 w-full space-y-2">
                        <FormError formErrorMessage={error} />
                        <FormSuccess formSuccessMessage={success} />
                    </div> 


                    <button
                        className="px-2 py-1 my-2 rounded-lg w-fit
                        bg-blue-500 text-white font-bold hover:scale-[102%]"
                        type="submit"
                        disabled={isPending}
                    >
                        Signup 
                    </button>
                    

                    <Footer 
                        backButtonLabel="Already have an account?"
                        backButtonLinkLabel="Login"
                        backButtonHref="/login"
                    />

                </form>

            </div>

        </main>
    )
};