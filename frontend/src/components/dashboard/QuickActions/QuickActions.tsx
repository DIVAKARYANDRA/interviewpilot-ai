import { useNavigate } from "react-router-dom";

import "./QuickActions.css";

interface Interview {

    id:number;

    company:string;

    role:string;

    overall_score:number;

}

interface Props{

    interviews:Interview[];

}

export default function QuickActions({

    interviews

}:Props){

    const navigate = useNavigate();

    return(

        <section className="recent-interviews">

            <div className="recent-header">

                <h2>

                    Recent Interviews

                </h2>

                <button

                    className="new-interview-btn"

                    onClick={()=>

                        navigate("/interview/setup")

                    }

                >

                    + Start Interview

                </button>

            </div>

            {

                interviews.length===0

                ?

                <div className="empty-history">

                    <p>

                        No interviews completed yet.

                    </p>

                    <small>

                        Start your first AI interview to build your history.

                    </small>

                </div>

                :

                interviews.map(interview=>

                    <div

                        key={interview.id}

                        className="history-item"

                    >

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

                    </div>

                )

            }

        </section>

    );

}