import "./ListCard.css";


interface Props{

    title:string;

    items:string[];

}


export default function ListCard({

    title,

    items

}:Props){

    return(

        <div className="list-card">

            <h2>

                {title}

            </h2>


            <ul>

                {
                    items.map(
                        (item,index)=>(

                            <li key={index}>

                                {item}

                            </li>

                        )
                    )
                }

            </ul>

        </div>

    );

}