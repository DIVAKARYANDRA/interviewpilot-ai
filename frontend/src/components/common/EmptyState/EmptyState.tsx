import "./EmptyState.css";

interface Props {

    title: string;

    description?: string;

}

export default function EmptyState({

    title,

    description

}: Props) {

    return (

        <div className="empty-state">

            <h3>{title}</h3>

            {

                description &&

                <p>{description}</p>

            }

        </div>

    );

}