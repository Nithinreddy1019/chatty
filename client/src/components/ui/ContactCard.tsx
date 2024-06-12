

interface ContactCardProps {
    cardUsername: string,
    cardUserId: string,
    cardLastMessage: string
}

export const ContactCard = ({
    cardUsername,
    cardUserId,
    cardLastMessage
}: ContactCardProps) => {
    return (
        <div
            className="h-14 rounded-md p-2 cursor-pointer bg-blue-50 hover:bg-blue-100
            flex items-center group gap-x-4"
        >
            <div
                className="h-10 w-10 bg-white rounded-full
                flex justify-center items-center group-hover:opacity-80"
            >
                <p className="text-xl font-semibold">
                    {cardUsername[0].toUpperCase()}
                </p>
            </div>

            <div 
                className="leading-4"
            >
                <h3 className="text-sm font-semibold">{cardUsername}</h3>
                <p className="text-xs">{cardLastMessage}</p>
            </div>
        </div>
    )
};