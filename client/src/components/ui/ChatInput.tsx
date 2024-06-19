
import { ChangeEventHandler, FormEventHandler} from "react";
import { IoMdSend } from "react-icons/io";

interface ChatInputProps {
    onChange: ChangeEventHandler<HTMLInputElement>,
    onSubmit: FormEventHandler<HTMLFormElement>,
    value: string
}

export const ChatInput = ({
    onChange,
    onSubmit,
    value
}: ChatInputProps) => {
    return (
        <form
            className="w-full h-16 p-2 bg-slate-100 rounded-md
            flex items-center"
            onSubmit={onSubmit}
        >
            <input 
                placeholder="Type a message"
                className="w-full h-12 bg-slate-100 p-2 focus:outline-none"
                onChange={onChange}
                value={value}
            />

            <button
                className="p-2 bg-slate-50 rounded-md hover:scale-[105%]"
                type="submit"
            >
                <IoMdSend size={24}/>
            </button>
            
        </form>
    )
}