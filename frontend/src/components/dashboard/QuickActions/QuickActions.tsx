import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Plus, Inbox, Building2 } from "lucide-react";

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

function scoreTone(score: number) {
    if (score >= 80) return "high";
    if (score >= 50) return "mid";
    return "low";
}

export default function QuickActions({

    interviews

}:Props){

    const navigate = useNavigate();

    return(

        <motion.section
            className="recent-interviews"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        >

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

                    <Plus size={15} />
                    Start Interview

                </button>

            </div>

            {

                interviews.length===0

                ?

                <div className="empty-history">

                    <div className="empty-history-icon">
                        <Inbox size={22} />
                    </div>

                    <p>

                        No interviews completed yet.

                    </p>

                    <small>

                        Start your first AI interview to build your history.

                    </small>

                </div>

                :

                <div className="history-list">
                    {interviews.map((interview, i)=>

                        <motion.div

                            key={interview.id}

                            className="history-item"

                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.05 * i }}

                        >

                            <div className="history-item-left">

                                <div className="history-item-icon">
                                    <Building2 size={16} />
                                </div>

                                <div>

                                    <h3>

                                        {interview.company}

                                    </h3>

                                    <p>

                                        {interview.role}

                                    </p>

                                </div>

                            </div>

                            <div className={`recent-score-badge tone-${scoreTone(interview.overall_score)}`}>

                                {interview.overall_score}%

                            </div>

                        </motion.div>

                    )}
                </div>

            }

        </motion.section>

    );

}
