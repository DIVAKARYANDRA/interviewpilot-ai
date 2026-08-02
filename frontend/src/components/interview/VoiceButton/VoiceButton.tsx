interface Props {

    listening: boolean;

    onClick: () => void;

}

export default function VoiceButton({

    listening,

    onClick

}: Props) {

    return (

        <button onClick={onClick}>

            {

                listening

                    ?

                    "🔴 Listening..."

                    :

                    "🎤 Speak Answer"

            }

        </button>

    );

}