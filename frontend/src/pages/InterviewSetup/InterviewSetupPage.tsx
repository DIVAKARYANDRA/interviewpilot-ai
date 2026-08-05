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

        current_company:"",

        company: "",

        role: "",

        experience: 3,

        difficulty: "Easy",

        interview_type: "Technical",

        skills: "",

        projects: "",

        job_description:"",

    });

    async function handleStart(
        e: React.FormEvent
    ) {

        e.preventDefault();

        if(!form.name.trim()){

    alert("Candidate name is required.");

    return;

}

if(!form.company.trim()){

    alert("Target company is required.");

    return;

}

if(!form.role.trim()){

    alert("Target role is required.");

    return;

}

if(form.experience<0){

    alert("Experience is required.");

    return;

}

if(!form.skills.trim()){

    alert("Please enter at least one skill.");

    return;

}

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


<div className="setup-section">


<h2>
📄 Resume Analysis
</h2>


<ResumeUploader


onResumeParsed={(data)=>{


setResume(data);


setForm({

...form,

name:data.name,

current_company:data.current_company || "",

company:"",

role:data.suggested_role || "",

experience:data.experience,

skills:data.skills.join(","),

projects:data.projects.join(","),

interview_type:"Resume"


});


}}


/>



{

resume &&

<ResumeSummary

resume={resume}

/>

}


</div>


</Card>

</Section>





<Section>

<Card>

<section className="job-description-section">

    <h3>

        🎯 Target Job Description

    </h3>

    <p>

        Paste the complete job description here.

        InterviewPilot will tailor the interview based on

        required skills, responsibilities and qualifications.

    </p>

    <textarea

        className="job-description-input"

        placeholder={`Example:

Responsibilities

• Build scalable backend APIs

• Design Microservices

• AWS Cloud

Requirements

• Python

• FastAPI

• Docker

• Kafka

• Redis

• REST APIs

Paste the complete JD here...`}

        value={form.job_description}

        onChange={(e)=>

            setForm({

                ...form,

                job_description:e.target.value

            })

        }

    />

</section>

</Card>
</Section>

<Section>

<Card>


<div className="setup-section">


<h2>
👤 Candidate Details
</h2>



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

<label>
Current Company
</label>

<Input
    value={form.current_company}
    placeholder="Example: TCS (Optional)"
    onChange={(value)=>

        setForm({

            ...form,

            current_company:value

        })

    }
/>




<label>
Target Company *
</label>


<Input

value={form.company}

placeholder="Example: Google, Microsoft"

onChange={(value)=>

setForm({

...form,

company:value

})

}

/>




<label>
Target Role *
</label>


<Input

value={form.role}

placeholder="Example: Software Engineer"

onChange={(value)=>

setForm({

...form,

role:value

})

}

/>



</div>





<div className="setup-section">

<br>

<h2>
⚙ Interview Configuration
</h2>




<label>
Experience (Years)
</label>


<Input

value={String(form.experience)}

type="number"

onChange={(value)=>

setForm({

...form,

experience:Number(value)

})

}

/>




<label>
Difficulty Level
</label>


<Select

value={form.difficulty}

options={[

"Easy",

"Medium",

"Hard"

]}

onChange={(value)=>

setForm({

...form,

difficulty:value

})

}

/>




<label>
Interview Type
</label>


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

onChange={(value)=>

setForm({

...form,

interview_type:value

})

}

/>



<label>
Interview Mode
</label>


<Select

value={interviewMode}

options={[

"voice",

"text"

]}

onChange={(value)=>

setInterviewMode(

value as "text"|"voice"

)

}

/>


<p className="mode-description">

Choose Voice for AI voice interview or Text for typing answers.

</p>



</div>







<div className="setup-section">

<br>

<h2>
🧠 Skills & Projects
</h2>



<label>
Skills
</label>


<TextArea

rows={4}

value={form.skills}

placeholder="Java, Python, AWS"

onChange={(value)=>

setForm({

...form,

skills:value

})

}

/>




<label>
Projects
</label>


<TextArea

rows={4}

value={form.projects}

placeholder="AI Interview Platform, E-commerce App"

onChange={(value)=>

setForm({

...form,

projects:value

})

}

/>



</div>






<Button

type="submit"

disabled={loading}

className="start-interview-btn"

>


{

loading

?

"Starting Interview..."

:

"🚀 Start Interview"

}


</Button>



</Card>


</Section>



</form>


</MainLayout>

);


}