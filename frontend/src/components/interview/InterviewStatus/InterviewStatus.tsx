import "./InterviewStatus.css";

interface Props{

    current:number;

    total:number;

    listening:boolean;

}

export default function InterviewStatus({

    current,

    total,

    listening

}:Props){

    const [seconds,setSeconds]=useState(0);

    useEffect(()=>{

const timer=setInterval(()=>{

setSeconds(

s=>s+1

);

},1000);

return()=>clearInterval(timer);

},[]);

    return(

        <div className="interview-status">
            <div>

🕒

{

Math.floor(seconds/60)

}

:

{

String(

seconds%60

).padStart(

2,

"0"

)

}

</div>

            <div>

                Question

                <strong>

                    {current}/{total}

                </strong>

            </div>

            <div>

                {

                    listening

                    ?

                    "🎤 Listening"

                    :

                    "🤖 AI Speaking"

                }

            </div>

            <div className="live">

                ● LIVE

            </div>

        </div>

    );

}