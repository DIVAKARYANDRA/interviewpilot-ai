export function speak(text:string){

    const speech = new SpeechSynthesisUtterance(text);

    speech.rate = 1;

    speech.pitch = 1;

    speech.lang = "en-US";

    window.speechSynthesis.cancel();

    window.speechSynthesis.speak(speech);

}