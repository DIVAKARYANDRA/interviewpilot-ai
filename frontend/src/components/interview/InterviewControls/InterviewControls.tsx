import "./InterviewControls.css";

interface Props{

    onSubmit:()=>void;

    loading:boolean;

}

export default function InterviewControls({

    onSubmit,

    loading

}:Props){

    return(

        <div className="interview-controls">

            <button

                className="submit-btn"

                onClick={onSubmit}

                disabled={loading}

            >

                {

                    loading

                    ?

                    "Thinking..."

                    :

                    "Next Question"

                }

            </button>

        </div>

    );

}