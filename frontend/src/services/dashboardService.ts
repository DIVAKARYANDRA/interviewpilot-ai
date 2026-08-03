import api from "../api/api";

import type { DashboardStats } from "../types/dashboard";

export async function getDashboard() {

    const response = await api.get<DashboardStats>(

        "/dashboard"

    );

    return response.data;

}