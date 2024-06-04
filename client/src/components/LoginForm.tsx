import { Footer } from "./ui/Footer";
import { Header } from "./ui/Header";
import { InputBox } from "./ui/InputBox";

import authsvg from "../assets/authsvg.svg";
import { useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginSchema } from "../schema/auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";


interface IFormInput {
    email: string,
    password: string
}


export const Loginform = () => {

    const [isPending, startTransition] = useTransition();

    const {
        register,
        handleSubmit, 
        setError,
        formState: { errors }
    }= useForm<IFormInput>({
        defaultValues: {
            email: "",
            password: ""
        },
        resolver: zodResolver(LoginSchema)
    });


    const onSubmit: SubmitHandler<IFormInput> = (values) => {
        console.log("sumitted")
        console.log(values);
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

                    <input 
                        placeholder="email"
                        {...register("email")}
                    />
                    {errors && <p>{errors.email?.message}</p>}

                    <input 
                        placeholder="password"
                        {...register("password")}
                    />
                    {errors && <p>{errors.password?.message}</p>}

                    {/* <InputBox 
                        inputLabel="Email"
                        inputPlaceholder="JohnDoe@gmail.com"
                        inputType="email"
                        register={register}
                        inputProperty="email"
                    />


                    <InputBox 
                        inputLabel="Password"
                        inputPlaceholder="******"
                        inputType="password"
                        register={register}
                        inputProperty="password"
                    /> */}

                    <button
                        className="px-2 py-1 my-2 rounded-lg w-fit
                        bg-blue-500 text-white font-bold hover:scale-[102%]"
                        type="submit"
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