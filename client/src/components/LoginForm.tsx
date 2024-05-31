import { Footer } from "./ui/Footer";
import { Header } from "./ui/Header";


export const Loginform = () => {
    return (
        <main
            className="h-screen flex items-center justify-center
            bg-blue-100"
        >

            <div
                className="p-2 rounded-xl shadow-lg border-2 border-blue-500
                flex flex-col items-center"
            >
                <Header 
                    headerLabel="Welcome back"
                    headerSubLabel="Login to continue"
                />

                <Footer 
                    backButtonLabel="Don't have an account?"
                    backButtonLinkLabel="Sign up"
                    backButtonHref="/register"
                />
            </div>

        </main>
    )
};