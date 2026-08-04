import { motion } from "framer-motion";
import {
    Brain,
    Briefcase,
    Clock,
    Trophy
} from "lucide-react";

import "./Statistics.css";

const stats = [

{
icon:<Briefcase size={34}/>,
value:"10+",
label:"Interview Types"
},

{
icon:<Brain size={34}/>,
value:"500+",
label:"AI Questions"
},

{
icon:<Trophy size={34}/>,
value:"95%",
label:"Evaluation Accuracy"
},

{
icon:<Clock size={34}/>,
value:"24×7",
label:"AI Available"
}

];

export default function Statistics(){

return(

<section className="statistics">

<motion.h2

initial={{opacity:0,y:30}}
whileInView={{opacity:1,y:0}}
viewport={{once:true}}

>

Trusted by Future Engineers

</motion.h2>

<div className="stats-grid">

{

stats.map((item,index)=>(

<motion.div

className="stat-card"

key={item.label}

initial={{opacity:0,y:40}}

whileInView={{opacity:1,y:0}}

viewport={{once:true}}

transition={{

delay:index*.15

}}

>

<div className="stat-icon">

{item.icon}

</div>

<h3>

{item.value}

</h3>

<p>

{item.label}

</p>

</motion.div>

))

}

</div>

</section>

);

}