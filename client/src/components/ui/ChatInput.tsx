
import { IoMdSend } from "react-icons/io";



export const ChatInput = () => {
    return (
        <div
            className="w-full h-16 p-2 bg-slate-100 rounded-md
            flex items-center"
        >
            <input 
                placeholder="Type a message"
                className="w-full h-12 bg-slate-100 p-2 focus:outline-none"
            />

            <button
                className="p-2 bg-slate-50 rounded-md hover:scale-[105%]"
            >
                <IoMdSend size={24}/>
            </button>
            
        </div>
    )
}