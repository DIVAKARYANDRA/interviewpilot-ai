import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useInterview } from "../../context/InterviewContext";
import MainLayout from "../../layouts/MainLayout";
import { startInterview } from "../../services/interviewService";

import "./InterviewSetupPage.css";

export default function InterviewSetupPage() {

    const navigate = useNavigate();

    const {
        setSessionId,
        setQuestion,
        setInterviewMode
    } = useInterview();

    const [loading, setLoading] = useState(false);

    const [form,setForm]=useState({

        name: "",

        company:"",

        role:"",

        experience:3,

        difficulty:"Easy",

        interview_type:"Technical",

        skills:""

    });

    async function handleStart(e:React.FormEvent){

        

        e.preventDefault();

        setLoading(true);

        try{

            const response=await startInterview({

                ...form,

                skills:form.skills
                    .split(",")
                    .map(skill=>skill.trim())

            });

      
            setSessionId(response.session_id);

            setQuestion(response.question);

            navigate("/interview");

        }finally{

            setLoading(false);

        }

    }

    return(

        <MainLayout>

            <form
                className="setup-form"
                onSubmit={handleStart}
            >

                <h1>

                    Configure Interview

                </h1>

                <input
                    value={form.company}
                    onChange={(e)=>
                        setForm({...form,company:e.target.value})
                    }
                />

                <input
                    value={form.role}
                    onChange={(e)=>
                        setForm({...form,role:e.target.value})
                    }
                />

                <input
                    value={form.experience}
                    type="number"
                    onChange={(e)=>
                        setForm({...form,experience:Number(e.target.value)})
                    }
                />

                <select
                    value={form.difficulty}
                    onChange={(e)=>
                        setForm({...form,difficulty:e.target.value})
                    }
                >
                    <option>Easy</option>
                    <option>Medium</option>
                    <option>Hard</option>
                </select>

                <textarea
                    rows={5}
                    value={form.skills}
                    onChange={(e)=>
                        setForm({...form,skills:e.target.value})
                    }
                />


                <h3>

                    Interview Type

                    </h3>

                    <select

                        value={form.interview_type}

                        onChange={(e)=>

                            setForm({

                                ...form,

                                interview_type:e.target.value

                            })

                        }

                    >

                        <option>

                            Technical

                        </option>

                        <option>

                            HR

                        </option>

                        <option>

                            Behavioral

                        </option>

                        <option>

                            System Design

                        </option>

                        <option>

                            DSA

                        </option>

                        <option>

                            Resume

                        </option>

                    </select>

                <h3>

                    Interview Mode

                    </h3>

                    <select

                        onChange={(e)=>

                            setInterviewMode(

                                e.target.value as
                                "text" | "voice"

                            )

                        }

                    >

                        <option value="text">

                            Text Interview

                        </option>

                        <option value="voice">

                            Voice Interview

                        </option>

                    </select>

                
                <button>

                    {

                        loading

                        ?

                        "Starting..."

                        :

                        "Start Interview"

                    }

                </button>

            </form>

        </MainLayout>

    );

}