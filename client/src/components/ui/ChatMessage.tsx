
interface chatMessageProps {
    messageText: string,
    sent: boolean
}

export const ChatMessage = ({
    messageText,
    sent
}: chatMessageProps) => {
    return (
        <div
            className={` ${sent ? "bg-blue-500 p-2 rounded-lg text-white max-w-60 md:max-w-96 self-end" : "bg-orange-500 p-2 rounded-lg max-w-60 md:max-w-96 text-left self-start"}`}
        >
            {messageText}
        </div>
    )
}