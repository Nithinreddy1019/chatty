import { MouseEventHandler } from "react";


interface ContactCardProps {
    cardUsername: string,
    cardUserId: string,
    cardLastMessage: string,
    onClick: MouseEventHandler<HTMLDivElement>
}

export const ContactCard = ({
    cardUsername,
    cardUserId,
    cardLastMessage,
    onClick
}: ContactCardProps) => {
    return (
        <div
            className="h-14 rounded-md p-2 cursor-pointer bg-blue-500 hover:scale-[102%]
            flex items-center gap-x-4"
            onClick={onClick}
        >
            <div
                className="h-10 w-10 bg-white rounded-full
                flex justify-center items-center"
            >
                <p className="text-xl font-semibold text-blue-500">
                    {cardUsername[0].toUpperCase()}
                </p>
            </div>

            <div 
                className="leading-4 text-white tracking-wide"
            >
                <h3 className="text-sm font-semibold">{cardUsername}</h3>
                <p className="text-xs">{cardLastMessage}</p>
            </div>
        </div>
    )
};