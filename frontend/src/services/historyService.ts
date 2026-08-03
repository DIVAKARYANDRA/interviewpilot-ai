import api from "../api/api";

import type {
    InterviewHistory
} from "../types/history";

export async function getHistory() {

    const response = await api.get<InterviewHistory[]>(

        "/history"

    );

    return response.data;

}