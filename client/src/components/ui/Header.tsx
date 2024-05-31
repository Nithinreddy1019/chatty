

interface HeaderProps {
    headerLabel: string,
    headerSubLabel: string
};

export const Header = ({
    headerLabel,
    headerSubLabel
}: HeaderProps) => {
    return (
        <div
            className="flex flex-col items-center p-2"
        >
            <h1
                className="text-3xl font-semibold"
            >
                {headerLabel}
            </h1>
            <p
                className="text-sm font-semibold"
            >
                {headerSubLabel}
            </p>
        </div>
    )
};