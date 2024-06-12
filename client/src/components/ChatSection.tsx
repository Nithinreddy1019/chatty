import { ChatInput } from "./ui/ChatInput";



export const ChatSection = () => {
    return (
        <div
            className="h-full p-2 
            flex flex-col"
        >
            <div
                className="flex-1"
            >
                Mwessages Here
            </div>

            <ChatInput /> 
        </div>
    )
};