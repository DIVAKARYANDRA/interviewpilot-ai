export interface ReportResponse {

    overall_score:number;

    technical_score:number;

    communication_score:number;

    confidence_score:number;

    strengths:string[];

    weaknesses:string[];

    learning_roadmap:string[];

    company_readiness:string;

    summary:string;

}