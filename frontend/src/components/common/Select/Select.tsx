import "./Select.css";

interface Props{

    value:string;

    options:string[];

    onChange:(value:string)=>void;

}

export default function Select({

    value,

    options,

    onChange

}:Props){

    return(

        <select

            className="app-select"

            value={value}

            onChange={(e)=>

                onChange(e.target.value)

            }

        >

            {

                options.map(option=>(

                    <option

                        key={option}

                    >

                        {option}

                    </option>

                ))

            }

        </select>

    );

}