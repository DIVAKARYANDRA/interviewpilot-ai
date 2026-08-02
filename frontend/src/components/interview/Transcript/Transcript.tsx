interface Props {

    transcript: string;

}

export default function Transcript({

    transcript

}: Props) {

    return (

        <textarea

            rows={8}

            readOnly

            value={transcript}

        />

    );

}