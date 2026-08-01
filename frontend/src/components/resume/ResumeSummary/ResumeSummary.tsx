import type { ResumeAnalysis } from "../../../types/resume";

interface Props{

    resume:ResumeAnalysis;

}

export default function ResumeSummary({

    resume

}:Props){

    return(

        <div>

            <h3>

                Resume Analysed Successfully

            </h3>

            <p>

                Candidate:

                {resume.name}

            </p>

            <p>

                Experience:

                {resume.experience} years

            </p>

            <p>

                Skills:

                {resume.skills.length}

            </p>

        </div>

    );

}