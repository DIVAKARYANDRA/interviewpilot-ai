import { motion } from "framer-motion";

import {
    Brain,
    Mic,
    BarChart3,
    GraduationCap
} from "lucide-react";

import "./Features.css";

const features = [

{
icon:<Brain size={34}/>,
title:"AI Mock Interviews",
description:
"Practice realistic interviews tailored to your dream company, role and experience level."
},

{
icon:<BarChart3 size={34}/>,
title:"Instant AI Feedback",
description:
"Receive detailed AI evaluation, communication analysis and technical scoring after every answer."
},

{
icon:<Mic size={34}/>,
title:"Voice Interview",
description:
"Talk naturally with an AI interviewer just like a real technical interview."
},

{
icon:<GraduationCap size={34}/>,
title:"Learning Roadmap",
description:
"Personalized improvement plan based on your interview performance and weak areas."
}

];

export default function Features(){

return(

<section
className="features"
id="features"
>

<motion.h2

initial={{opacity:0,y:30}}
whileInView={{opacity:1,y:0}}
viewport={{once:true}}
transition={{duration:.6}}

>

Everything You Need to
<span> Crack Interviews</span>

</motion.h2>

<motion.p

initial={{opacity:0}}
whileInView={{opacity:1}}
viewport={{once:true}}

>

Built specifically for software engineers preparing for
Amazon, Google, Microsoft and top product companies.

</motion.p>

<div className="feature-grid">

{

features.map((item,index)=>(

<motion.div

className="feature-card"

key={item.title}

initial={{opacity:0,y:40}}

whileInView={{opacity:1,y:0}}

viewport={{once:true}}

transition={{

delay:index*.15

}}

>

<div className="feature-icon">

{item.icon}

</div>

<h3>

{item.title}

</h3>

<p>

{item.description}

</p>

</motion.div>

))

}

</div>

</section>

);

}