export function speak(

    text: string,

    onEnd?: () => void

) {

    const speech = new SpeechSynthesisUtterance(text);

    speech.rate = 1;

    speech.pitch = 1;

    speech.lang = "en-US";

    speech.onend = () => {

        if (onEnd) {

            onEnd();

        }

    };

    window.speechSynthesis.cancel();

    window.speechSynthesis.speak(speech);

}