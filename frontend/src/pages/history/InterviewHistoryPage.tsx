import {

    useEffect,

    useState

} from "react";

import MainLayout from "../../layouts/MainLayout";

import {

    getHistory

} from "../../services/historyService";

import type {

    InterviewHistory

} from "../../types/history";

import HistoryCard from "../../components/history/HistoryCard/HistoryCard";

import "./InterviewHistoryPage.css";

export default function InterviewHistoryPage(){

    const [

        history,

        setHistory

    ]=useState<InterviewHistory[]>([]);

    useEffect(()=>{

        getHistory()

        .then(data=>{

            setHistory(data);

        });

    },[]);

    return(

        <MainLayout>

            <div className="history-page">

                <h1>

                    Interview History

                </h1>

                {

                    history.length===0

                    ?

                    <p>

                        No interviews found.

                    </p>

                    :

                    history.map(

                        interview=>

                        <HistoryCard

                            key={interview.id}

                            interview={interview}

                        />

                    )

                }

            </div>

        </MainLayout>

    );

}