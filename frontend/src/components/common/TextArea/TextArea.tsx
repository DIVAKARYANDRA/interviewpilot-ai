import "./TextArea.css";

interface Props{

    value:string;

    rows?:number;

    placeholder?:string;

    onChange:(value:string)=>void;

}

export default function TextArea({

    value,

    rows=5,

    placeholder,

    onChange

}:Props){

    return(

        <textarea

            className="app-textarea"

            rows={rows}

            value={value}

            placeholder={placeholder}

            onChange={(e)=>

                onChange(e.target.value)

            }

        />

    );

}