
import { SlOptionsVertical } from "react-icons/sl";


export const AppuserCard = () => {
    return (
        <div
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
                    U
                </div>
                <div
                    className="flex flex-col gap-y-0 leading-4"
                >
                    <h3 className="font-semibold">Username</h3>
                    <p className="italic test-xs">username@gmail.com</p>
                </div>
            </div>

            <button>
                <SlOptionsVertical size={20}/>
            </button>
        </div>
    )
};