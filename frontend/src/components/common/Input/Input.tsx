import "./Input.css";

interface Props{

    value:string;

    placeholder?:string;

    type?:string;

    onChange:(value:string)=>void;

}

export default function Input({

    value,

    placeholder,

    type="text",

    onChange

}:Props){

    return(

        <input

            className="app-input"

            value={value}

            type={type}

            placeholder={placeholder}

            onChange={(e)=>

                onChange(e.target.value)

            }

        />

    );

}