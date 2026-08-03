import { useState } from "react";

import { analyzeResume } from "../../../services/resumeService";
import type { ResumeAnalysis } from "../../../types/resume";
import "./ResumeUploader.css";
interface Props{

    onResumeParsed:(data:ResumeAnalysis)=>void;

}

export default function ResumeUploader({

    onResumeParsed

}:Props){

    const [loading,setLoading]=useState(false);

    async function handleUpload(

        e:React.ChangeEvent<HTMLInputElement>

    ){

        if(!e.target.files?.length){

            return;

        }

        setLoading(true);

        try{

            const result = await analyzeResume(

                e.target.files[0]

            );

            onResumeParsed(result);

        }

        finally{

            setLoading(false);

        }

    }

    return(

    <div className="resume-upload">

        <div className="upload-box">

            <h3>

                📄 Upload Resume

            </h3>

            <p>

                Upload your latest PDF resume to let InterviewPilot AI pre-fill your profile and personalize the interview.

            </p>

            <input

                type="file"

                accept=".pdf"

                onChange={handleUpload}

            />

        </div>

        {

            loading &&

            <p>

                🤖 AI is analysing your resume...

            </p>

        }

    </div>

);

}