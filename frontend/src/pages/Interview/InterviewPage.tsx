import MainLayout from "../../layouts/MainLayout";

import { useInterview } from "../../context/InterviewContext";

export default function InterviewPage(){

    const {question}=useInterview();

    return(

        <MainLayout>

            <h1>

                AI Interview

            </h1>

            <br/>

            <h2>

                {question}

            </h2>

        </MainLayout>

    )

}