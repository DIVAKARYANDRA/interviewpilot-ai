import { useState } from "react";
import { useNavigate } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";

import { useInterview } from "../../context/InterviewContext";

import { startInterview } from "../../services/interviewService";

import ResumeUploader from "../../components/resume/ResumeUploader/ResumeUploader";
import ResumeSummary from "../../components/resume/ResumeSummary/ResumeSummary";

import type { ResumeAnalysis } from "../../types/resume";

import Card from "../../components/common/Card/Card";
import Input from "../../components/common/Input/Input";
import Select from "../../components/common/Select/Select";
import TextArea from "../../components/common/TextArea/TextArea";
import Button from "../../components/common/Button/Button";
import PageHeader from "../../components/common/PageHeader/PageHeader";
import Section from "../../components/common/Section/Section";

import "./InterviewSetupPage.css";

export default function InterviewSetupPage() {

    const navigate = useNavigate();

    const {

        setSessionId,

        setQuestion,

        interviewMode,

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

            setSessionId(response.session_id);

            setQuestion(response.question);

            navigate("/interview");

        }

        catch (error) {

            console.error(error);

            alert("Failed to start interview.");

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

                <PageHeader

                    title="Configure Interview"

                    subtitle="Prepare your personalized AI interview."

                />

                <Section>

                    <Card>

                        <ResumeUploader

                            onResumeParsed={(data) => {

                                setResume(data);

                                setForm({

                                    ...form,

                                    name: data.name,

                                    company: data.current_company || "",

                                    role: data.suggested_role || "",

                                    experience: data.experience,

                                    skills: data.skills.join(","),

                                    projects: data.projects.join(","),

                                    interview_type: "Resume"

                                });

                            }}

                        />

                        {

                            resume &&

                            <ResumeSummary
                                resume={resume}
                            />

                        }

                    </Card>

                </Section>

                <Section>

                    <Card>

                        <label>

    Candidate Name *

</label>

<Input

    value={form.name}

    placeholder="Enter your name"

    onChange={(value)=>

        setForm({

            ...form,

            name:value

        })

    }

/>


                        <label> Target Company * </label>

                        <Input

                            value={form.company}

                            placeholder="Enter Your Target Company Name"

                            onChange={(value) =>

                                setForm({

                                    ...form,

                                    company: value

                                })

                            }

                        />


                        <label> Target Role * </label>

                        <Input

                            value={form.role}

                            placeholder="Enter Your Target Role"

                            onChange={(value) =>

                                setForm({

                                    ...form,

                                    role: value

                                })

                            }

                        />

                        <label>Current Experience </label>


                        <Input

                            value={String(form.experience)}

                            type="number"

                            placeholder="Years of Experience"

                            onChange={(value) =>

                                setForm({

                                    ...form,

                                    experience: Number(value)

                                })

                            }

                        />

                        <label> Difficulty of Interview </label>


                        <Select

                            value={form.difficulty}

                            options={[

                                "Easy",

                                "Medium",

                                "Hard"

                            ]}

                            onChange={(value) =>

                                setForm({

                                    ...form,

                                    difficulty: value

                                })

                            }

                        />

                        <label>Interview Type </label>


                        <Select

                            value={form.interview_type}

                            options={[

                                "Technical",

                                "HR",

                                "Behavioral",

                                "System Design",

                                "DSA",

                                "Resume"

                            ]}

                            onChange={(value) =>

                                setForm({

                                    ...form,

                                    interview_type: value

                                })

                            }

                        />

                        <label>Skills (optional) </label>


                        <TextArea

                            rows={4}

                            value={form.skills}

                            placeholder="Skills (comma separated)"

                            onChange={(value) =>

                                setForm({

                                    ...form,

                                    skills: value

                                })

                            }

                        />

                        <label>Projects (optional)</label>


                        <TextArea

                            rows={4}

                            value={form.projects}

                            placeholder="Projects (comma separated)"

                            onChange={(value) =>

                                setForm({

                                    ...form,

                                    projects: value

                                })

                            }

                        />


                        <label>

    Interview Mode

</label>

                        <Select

                            value={interviewMode}

                            options={[

                                "text",

                                "voice"

                            ]}

                            onChange={(value) =>

                                setInterviewMode(

                                    value as

                                    "text"

                                    |

                                    "voice"

                                )

                            }

                        />

                        <p className="mode-description">

Choose <b>Voice</b> for AI voice interview or <b>Text</b> for typing your answers.

</p>


                        <Button

                            type="submit"

                            disabled={loading}

                        >

                            {

                                loading

                                    ?

                                    "Starting Interview..."

                                    :

                                    "Start Interview"

                            }

                        </Button>

                    </Card>

                </Section>

            </form>

        </MainLayout>

    );

}