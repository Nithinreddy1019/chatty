import { Link } from "react-router-dom";


export const NavBar = () => {
    return (
        <nav
            className="bg-blue-100 h-12
            flex justify-between items-center px-2 shadow-lg"
        >
            <div>
                <h1 className="text-blue-500 font-bold text-3xl">Chatty</h1>
            </div>

            <div
                className="flex items-center gap-x-2"
            >
                <Link to={"/login"}>
                    <button
                        className="px-2 py-1 my-2 rounded-lg w-fit
                        bg-blue-500 text-white font-bold hover:scale-[102%]"
                    >
                        Login
                    </button>
                </Link>

                <Link to={"/register"}>
                    <button
                        className="px-2 py-1 my-2 rounded-lg w-fit
                        bg-blue-500 text-white font-bold hover:scale-[102%]"
                    >
                        Signup
                    </button>
                </Link>
            </div>

        </nav>
    )
};

