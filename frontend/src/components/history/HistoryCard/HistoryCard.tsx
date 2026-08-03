import type {
    InterviewHistory
} from "../../../types/history";

import "./HistoryCard.css";

interface Props{

    interview:InterviewHistory;

}

export default function HistoryCard({

    interview

}:Props){

    return(

        <div className="history-card">

            <div>

                <h3>

                    {interview.company}

                </h3>

                <p>

                    {interview.role}

                </p>

            </div>

            <div className="history-score">

                {interview.overall_score}%

            </div>

            <div>

                <span>

                    {interview.difficulty}

                </span>

                <br/>

                <small>

                    {

                        new Date(

                            interview.completed_at

                        ).toLocaleDateString()

                    }

                </small>

            </div>

        </div>

    );

}