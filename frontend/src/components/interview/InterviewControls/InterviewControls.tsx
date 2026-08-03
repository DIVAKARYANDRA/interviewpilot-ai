import "./InterviewControls.css";

interface Props{

    onSubmit:()=>void;

    loading:boolean;

    voiceMode:boolean;

}

export default function InterviewControls({

    onSubmit,

    loading,

    voiceMode

}:Props){

    if(voiceMode){

        return null;

    }

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