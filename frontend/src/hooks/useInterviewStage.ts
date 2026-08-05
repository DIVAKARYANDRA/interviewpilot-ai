import { useEffect } from "react";

import { useInterview } from "../context/InterviewContext";

export default function useInterviewStage() {

    const {

        stage,

        setStage

    } = useInterview();

    useEffect(() => {

        if (stage === "connecting") {

            const timer = setTimeout(() => {

                // Go directly to interview
                setStage("interview");

            }, 2000);

            return () => clearTimeout(timer);

        }

    }, [stage]);

}