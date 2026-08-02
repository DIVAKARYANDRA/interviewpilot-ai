interface Props {

    listening: boolean;

}

export default function ListeningIndicator({

    listening

}: Props) {

    if (!listening) {

        return null;

    }

    return (

        <h3>

            🎤 Listening...

        </h3>

    );

}