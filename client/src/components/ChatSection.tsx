import { ChatInput } from "./ui/ChatInput";



export const ChatSection = () => {
    return (
        <div
            className="h-full p-2 
            flex flex-col"
        >
            <div
                className="bg-blue-50 h-14 rounded-md
                flex items-center p-2 gap-x-4"
            >
                <div
                    className="h-10 w-10 bg-white rounded-full
                    flex justify-center items-center group-hover:opacity-80"
                >
                    <p className="text-xl font-semibold">
                        U
                    </p>
                </div>
                <div>
                    <p className="text-md font-semibold">Username</p>
                </div>
            </div>
            <div
                className="flex-1"
            >
                Mwessages Here
            </div>

            <ChatInput /> 
        </div>
    )
};