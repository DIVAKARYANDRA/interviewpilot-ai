import { useState } from "react";
import { useNavigate } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";

import { useInterview } from "../../context/InterviewContext";

import { startInterview } from "../../services/interviewService";

import ResumeUploader from "../../components/resume/ResumeUploader/ResumeUploader";
import ResumeSummary from "../../components/resume/ResumeSummary/ResumeSummary";

import type { ResumeAnalysis } from "../../types/resume";

import "./InterviewSetupPage.css";

export default function InterviewSetupPage() {

    const navigate = useNavigate();

    const {

        setSessionId,

        setQuestion,

        setInterviewMode

    } = useInterview();

    const [loading, setLoading] = useState(false);

    const [resume, setResume] =
        useState<ResumeAnalysis | null>(null);

    const [form, setForm] = useState({

        name: "",

        company: "",

        role: "",

        experience: 3,

        difficulty: "Easy",

        interview_type: "Technical",

        skills: "",

        projects: ""

    });

    async function handleStart(
        e: React.FormEvent
    ) {

        e.preventDefault();

        setLoading(true);

        try {

            const response =
                await startInterview({

                    ...form,

                    skills: form.skills
                        .split(",")
                        .map(skill => skill.trim())
                        .filter(Boolean),

                    projects: form.projects
                        .split(",")
                        .map(project => project.trim())
                        .filter(Boolean)

                });

            setSessionId(
                response.session_id
            );

            setQuestion(
                response.question
            );

            navigate("/interview");

        }

        catch (error) {

            console.error(error);

            alert(
                "Failed to start interview."
            );

        }

        finally {

            setLoading(false);

        }

    }

    return (

        <MainLayout>

            <form
                className="setup-form"
                onSubmit={handleStart}
            >

                <h1>

                    Configure Interview

                </h1>

                <ResumeUploader

                    onResumeParsed={(data) => {

                        setResume(data);

                        setForm({

                            ...form,

                            name: data.name,

                            company:
                                data.current_company || "",

                            role:
                                data.suggested_role || "",

                            experience:
                                data.experience,

                            skills:
                                data.skills.join(","),

                            projects:
                                data.projects.join(","),

                            interview_type:
                                "Resume"

                        });

                    }}

                />

                {

                    resume &&

                    <ResumeSummary
                        resume={resume}
                    />

                }

                <hr />

                <input

                    placeholder="Candidate Name"

                    value={form.name}

                    onChange={(e) =>

                        setForm({

                            ...form,

                            name: e.target.value

                        })

                    }

                />

                <input

                    placeholder="Target Company"

                    value={form.company}

                    onChange={(e) =>

                        setForm({

                            ...form,

                            company: e.target.value

                        })

                    }

                />

                <input

                    placeholder="Target Role"

                    value={form.role}

                    onChange={(e) =>

                        setForm({

                            ...form,

                            role: e.target.value

                        })

                    }

                />

                <input

                    type="number"

                    placeholder="Experience"

                    value={form.experience}

                    onChange={(e) =>

                        setForm({

                            ...form,

                            experience:
                                Number(e.target.value)

                        })

                    }

                />

                <select

                    value={form.difficulty}

                    onChange={(e) =>

                        setForm({

                            ...form,

                            difficulty:
                                e.target.value

                        })

                    }

                >

                    <option>Easy</option>

                    <option>Medium</option>

                    <option>Hard</option>

                </select>

                <select

                    value={form.interview_type}

                    onChange={(e) =>

                        setForm({

                            ...form,

                            interview_type:
                                e.target.value

                        })

                    }

                >

                    <option>Technical</option>

                    <option>HR</option>

                    <option>Behavioral</option>

                    <option>System Design</option>

                    <option>DSA</option>

                    <option>Resume</option>

                </select>

                <textarea

                    rows={4}

                    placeholder="Skills (comma separated)"

                    value={form.skills}

                    onChange={(e) =>

                        setForm({

                            ...form,

                            skills:
                                e.target.value

                        })

                    }

                />

                <textarea

                    rows={4}

                    placeholder="Projects (comma separated)"

                    value={form.projects}

                    onChange={(e) =>

                        setForm({

                            ...form,

                            projects:
                                e.target.value

                        })

                    }

                />

                <select

                    defaultValue="text"

                    onChange={(e) =>

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

                <button
                    disabled={loading}
                >

                    {

                        loading

                            ?

                            "Starting Interview..."

                            :

                            "Start Interview"

                    }

                </button>

            </form>

        </MainLayout>

    );

}