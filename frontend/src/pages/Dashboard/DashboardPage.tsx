import MainLayout from "../../layouts/MainLayout";
import { Link } from "react-router-dom";

export default function DashboardPage() {
  return (
    <MainLayout>

      <div
        style={{
          maxWidth: "900px",
          margin: "40px auto"
        }}
      >

        <h1>Welcome 👋</h1>

        <p>
          Your AI Interview Dashboard
        </p>

        <br/>

        <Link to="/interview/setup">

            <button>

                Start Interview

            </button>

        </Link>

      </div>

    </MainLayout>
  );
}