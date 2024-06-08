
import { IoWarningOutline } from "react-icons/io5";

interface FormErrorProps {
    formErrorMessage: string
};


export const FormError = ({
    formErrorMessage
}: FormErrorProps) => {

    if(!formErrorMessage) {
        return null;
    }

    return (
        <div
            className="flex items-center gap-x-3 justify-start
            w-full px-4 py-1.5 bg-red-400 text-red-600 bg-opacity-50 rounded-lg overflow-hidden"
        >
            <IoWarningOutline size={20}/>
            <p
                className="font-semibold"
            >
                {formErrorMessage}
            </p>
        </div>
    )
};