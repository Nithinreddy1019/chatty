import { Footer } from "./ui/Footer";
import { Header } from "./ui/Header";
import { InputBox } from "./ui/InputBox";


export const Loginform = () => {
    return (
        <main
            className="h-screen flex items-center justify-center
            bg-blue-100"
        >

            <div
                className="p-2 rounded-xl shadow-lg border-2 border-blue-500
                flex flex-col items-center
                min-w-[400px]"
            >
                <Header 
                    headerLabel="Welcome back"
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

        </main>
    )
};