import { useEffect, useState } from "react";

import MainLayout from "../../layouts/MainLayout";

import HeroCard from "../../components/dashboard/HeroCard/HeroCard";
import StatsCard from "../../components/dashboard/StatsCard/StatsCard";
import QuickActions from "../../components/dashboard/QuickActions/QuickActions";

import { getDashboard } from "../../services/dashboardService";

import type { DashboardStats } from "../../types/dashboard";

import "./DashboardPage.css";

export default function DashboardPage() {

    const [

        stats,

        setStats

    ] = useState<DashboardStats | null>(null);

    const [

        loading,

        setLoading

    ] = useState(true);

    useEffect(() => {

        getDashboard()

        .then(data => {

            setStats(data);

        })

        .catch(error => {

            console.error(

                "Failed to load dashboard",

                error

            );

        })

        .finally(() => {

            setLoading(false);

        });

    }, []);

    return (

        <MainLayout>

            <div className="dashboard">

                <HeroCard />

                <div className="stats-grid">

                    <StatsCard

                        title="Interviews"

                        value={

                            loading

                            ?

                            "..."

                            :

                            String(

                                stats?.total_interviews ?? 0

                            )

                        }

                    />

                    <StatsCard

                        title="Average Score"

                        value={

                            loading

                            ?

                            "..."

                            :

                            `${stats?.average_score ?? 0}%`

                        }

                    />

                    <StatsCard

                        title="Best Score"

                        value={

                            loading

                            ?

                            "..."

                            :

                            `${stats?.best_score ?? 0}%`

                        }

                    />

                </div>

                <QuickActions

                    interviews={

                        stats?.recent_interviews ?? []

                    }

                />

            </div>

        </MainLayout>

    );

}