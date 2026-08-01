import api from "../api/api";

import type {

    ReportResponse

} from "../types/report";

export async function endInterview(

    session_id:string

){

    const response=

        await api.post<ReportResponse>(

            "/interview/end",

            {

                session_id

            }

        );

    return response.data;

}