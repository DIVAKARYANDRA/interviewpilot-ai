import { useNavigate } from "react-router-dom";


export function scrollToSection(id:string){

    const element =
        document.getElementById(id);


    if(element){

        element.scrollIntoView({

            behavior:"smooth"

        });

        return;

    }


    window.location.href = `/#${id}`;

}