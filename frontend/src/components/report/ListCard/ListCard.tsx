import { CheckCircle2, AlertTriangle, Compass, Star } from "lucide-react";
import "./ListCard.css";

interface Props{

    title:string;

    items:string[];

    variant?: "positive" | "negative" | "roadmap";

    highlight?: string;

}

const VARIANT_CONFIG = {
    positive: { icon: CheckCircle2, itemIcon: CheckCircle2 },
    negative: { icon: AlertTriangle, itemIcon: AlertTriangle },
    roadmap: { icon: Compass, itemIcon: Compass },
};

export default function ListCard({

    title,

    items,

    variant = "roadmap",

    highlight

}:Props){

    const { icon: TitleIcon, itemIcon: ItemIcon } = VARIANT_CONFIG[variant];

    return(

        <div className={`list-card variant-${variant}`}>

            <div className="list-card-head">

                <span className="list-card-icon">
                    <TitleIcon size={16} />
                </span>

                <h2>

                    {title}

                </h2>

            </div>

            {

                highlight

                &&

                <div className="list-card-highlight">

                    <Star size={13} />
                    {highlight}

                </div>

            }

            <ul>
                {
                    items.map(
                        (item,index)=>(

                            <li key={index}>

                                <ItemIcon size={15} className="item-icon" />
                                <span>{item}</span>

                            </li>

                        )
                    )
                }
            </ul>

        </div>

    );

}
