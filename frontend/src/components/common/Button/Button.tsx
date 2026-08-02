interface Props{

    children:React.ReactNode;

    type?:

        "button"

        |

        "submit";

    disabled?:boolean;

    onClick?:()=>void;

}

export default function Button({

    children,

    type="button",

    disabled,

    onClick

}:Props){

    return(

        <button

            className="app-button"

            type={type}

            disabled={disabled}

            onClick={onClick}

        >

            {children}

        </button>

    );

}