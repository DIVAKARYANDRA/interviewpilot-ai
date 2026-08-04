import { motion } from "framer-motion";
import {
    Target,
    MessageSquare,
    Trophy
} from "lucide-react";

import "./HowItWorks.css";

const steps = [

{
number:"01",
icon:<Target size={34}/>,
title:"Choose Your Interview",
description:
"Select your company, role, skills and difficulty level."
},

{
number:"02",
icon:<MessageSquare size={34}/>,
title:"Practice with AI",
description:
"Experience realistic AI-powered interviews with adaptive questioning."
},

{
number:"03",
icon:<Trophy size={34}/>,
title:"Analyze & Improve",
description:
"Receive detailed evaluation, strengths, weaknesses and a personalized roadmap."
}

];

export default function HowItWorks(){

return(

<section
className="how-it-works"
id="how-it-works"
>

<motion.h2

initial={{opacity:0,y:30}}
whileInView={{opacity:1,y:0}}
viewport={{once:true}}

>

Your Journey to
<span> Interview Success</span>

</motion.h2>

<div className="timeline">

{

steps.map((step,index)=>(

<motion.div

className="step-card"

key={step.number}

initial={{opacity:0,y:50}}

whileInView={{opacity:1,y:0}}

viewport={{once:true}}

transition={{

delay:index*.2

}}

>

<div className="step-icon">

{step.icon}

</div>

<div className="step-number">

{step.number}

</div>

<h3>

{step.title}

</h3>

<p>

{step.description}

</p>

</motion.div>

))

}

</div>

</section>

);

}