export interface RecentInterview{

    id:number;

    company:string;

    role:string;

    overall_score:number;

}

export interface DashboardStats{

    total_interviews:number;

    average_score:number;

    best_score:number;

    recent_interviews:RecentInterview[];

}