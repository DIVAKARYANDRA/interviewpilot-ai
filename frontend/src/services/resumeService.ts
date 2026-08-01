import api from "../api/api";

import type { ResumeAnalysis } from "../types/resume";

export async function analyzeResume(

    file:File

){

    const formData = new FormData();

    formData.append(

        "file",

        file

    );

    const response = await api.post<ResumeAnalysis>(

        "/resume/analyze",

        formData,

        {

            headers:{

                "Content-Type":"multipart/form-data"

            }

        }

    );

    return response.data;

}