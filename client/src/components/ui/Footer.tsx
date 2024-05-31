import { Link } from "react-router-dom"

interface FooterProps {
    backButtonLabel: string,
    backButtonLinkLabel: string,
    backButtonHref: string
};

export const Footer = ({
    backButtonLabel,
    backButtonLinkLabel,
    backButtonHref
}: FooterProps) => {
    return (
        <div
            className="flex items-center gap-x-1 p-2"
        >
            <p
                className="text-xs"
            >
                {backButtonLabel}
            </p>

            <Link to={backButtonHref} className="flex items-center">
                <span
                    className="underline text-xs italic"
                >
                    {backButtonLinkLabel}
                </span>
            </Link>
        </div>
    )
};