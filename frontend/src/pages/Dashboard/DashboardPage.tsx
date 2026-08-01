import MainLayout from "../../layouts/MainLayout";

import HeroCard from "../../components/dashboard/HeroCard/HeroCard";
import StatsCard from "../../components/dashboard/StatsCard/StatsCard";
import QuickActions from "../../components/dashboard/QuickActions/QuickActions";

import "./DashboardPage.css";

export default function DashboardPage() {

    return (

        <MainLayout>

            <div className="dashboard">

                <HeroCard />

                <div className="stats-grid">

                    <StatsCard

                        title="Interviews"

                        value="0"

                    />

                    <StatsCard

                        title="Average Score"

                        value="0%"

                    />

                    <StatsCard

                        title="Best Score"

                        value="0%"

                    />

                    

                </div>

                <QuickActions />
                

            </div>

        </MainLayout>

    );

}