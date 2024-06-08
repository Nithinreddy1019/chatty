import { IoCheckmarkDone } from "react-icons/io5";

interface FormSuccessProps {
    formSuccessMessage: string
};


export const FormSuccess = ({
    formSuccessMessage
}: FormSuccessProps) => {

    if(!formSuccessMessage) {
        return null;
    }

    return (
        <div
            className="flex items-center gap-x-3 justify-start
            w-full px-4 py-1.5 bg-emerald-400 text-emerald-800 bg-opacity-40 rounded-lg overflow-hidden"
        >
            <IoCheckmarkDone size={20}/>
            <p
                className="font-semibold"
            >
                {formSuccessMessage}
            </p>
        </div>
    )
};