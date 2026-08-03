interface Props {

    children: React.ReactNode;

    type?:
        | "button"
        | "submit";

    disabled?: boolean;

    onClick?: () => void;

    className?: string;

}


export default function Button({

    children,

    type = "button",

    disabled,

    onClick,

    className = ""

}: Props) {


    return (

        <button

            className={className}

            type={type}

            disabled={disabled}

            onClick={onClick}

        >

            {children}

        </button>

    );

}