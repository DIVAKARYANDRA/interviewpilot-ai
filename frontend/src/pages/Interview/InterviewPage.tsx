import { useInterview } from "../../context/InterviewContext";

import TextInterview
from "../../components/interview/TextInterview/TextInterview";

import VoiceInterview
from "../../components/interview/VoiceInterview/VoiceInterview";

export default function InterviewPage(){

    const{

        interviewMode

    }=useInterview();

    if(interviewMode==="voice"){

        return<VoiceInterview/>;

    }

    return<TextInterview/>;

}