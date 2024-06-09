import { Footer } from "./ui/Footer";
import { Header } from "./ui/Header";

import authsvg from "../assets/authsvg.svg";
import { useEffect, useState} from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginSchema } from "../schema/auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { FormError } from "./ui/FormError";
import { FormSuccess } from "./ui/FormSuccess";
import axios, { AxiosError } from "axios";
import { useRecoilState } from "recoil";
import { userTokenAtom } from "../store/atoms/UserAtom";
import Cookies from "js-cookie";

export const Loginform = () => {

    const [isPending, setIsPending] = useState(false);

    const [passwordIsVisible, setPasswordIsVisible] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [token, setToken] = useRecoilState(userTokenAtom);

    const passwordVisibilityHandler = () => {
        setPasswordIsVisible(value => !value);
    };

    const {
        register,
        handleSubmit,
        formState: { errors }
    }= useForm<z.infer<typeof LoginSchema>>({
        defaultValues: {
            email: "",
            password: ""
        },
        resolver: zodResolver(LoginSchema)
    });


    const onSubmit: SubmitHandler<z.infer<typeof LoginSchema>> = async (values) => {

        setIsPending(true);
        setError("");
        setSuccess("");

        
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/login`, { ...values }, {withCredentials: true});

            setSuccess(response.data.message);   
            setToken(Cookies.get("token")!);
            
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

            <div className="flex items-center
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
                        headerSubLabel="Login to continue"
                    />

                    {/* email */}
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
                            placeholder={"JohnDoe@gmail.com"}
                            type="email"
                            {...register("email")}
                            disabled={isPending}
                            
                        />
                    </div>
                    {errors && <p className="text-xs text-red-500">{errors.email?.message}</p>}

                    {/* PaSSWORD */}
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
                        Login
                    </button>
                    

                    <Footer 
                        backButtonLabel="Don't have an account?"
                        backButtonLinkLabel="Sign up"
                        backButtonHref="/register"
                    />

                </form>

            </div>

        </main>
    )
};