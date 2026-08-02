import Button from "../../common/Button/Button";
import "./ActionBar.css";

interface Props{

    loading:boolean;

    onSubmit:()=>void;

}

export default function ActionBar({

    loading,

    onSubmit

}:Props){

    return(

        <div className="action-bar">

            <Button

                onClick={onSubmit}

                disabled={loading}

            >

                {

                    loading

                    ?

                    "Submitting..."

                    :

                    "Submit Answer"

                }

            </Button>

        </div>

    );

}