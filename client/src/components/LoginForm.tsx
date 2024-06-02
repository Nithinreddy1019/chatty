import { Footer } from "./ui/Footer";
import { Header } from "./ui/Header";
import { InputBox } from "./ui/InputBox";

import authsvg from "../assets/authsvg.svg";



export const Loginform = () => {
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

                <div
                    className="p-2 
                    flex flex-col items-center
                    w-[350px]"
                >
                    <Header 
                        headerLabel="Welcome to Chatty"
                        headerSubLabel="Login to continue"
                    />

                    <InputBox 
                        inputLabel="Email"
                        inputPlaceholder="JohnDoe@gmail.com"
                        inputType="email"
                    />


                    <InputBox 
                        inputLabel="Password"
                        inputPlaceholder="******"
                        inputType="password"
                    />

                    <button
                        className="px-2 py-1 my-2 rounded-lg w-fit
                        bg-blue-500 text-white font-bold hover:scale-[102%]"
                    >
                        Login
                    </button>
                    

                    <Footer 
                        backButtonLabel="Don't have an account?"
                        backButtonLinkLabel="Sign up"
                        backButtonHref="/register"
                    />

                </div>

            </div>

        </main>
    )
};