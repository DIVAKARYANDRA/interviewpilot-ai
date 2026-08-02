import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";
import { login } from "../../hooks/useAuth";

import "./LoginPage.css";

export default function LoginPage() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {

    e.preventDefault();

    try {

      setLoading(true);

      setError("");

      await login(email, password);

      navigate("/dashboard");

    } catch {

      setError("Invalid email or password");

    } finally {

      setLoading(false);

    }

  }

  return (

    <MainLayout>

      <div className="login-container">

        <form
          className="login-card"
          onSubmit={handleLogin}
        >

          <h1>Welcome Back</h1>

          <p>

            Login to continue your AI interview journey.

          </p>

          <label>
            Email *
            </label>

            <input

            type="email"

            value={email}

            onChange={
            e=>setEmail(e.target.value)
            }

            />

          <label>
            Password *
            </label>

            <input

            type="password"

            value={password}

            onChange={
            e=>setPassword(e.target.value)
            }

            />

          {

            error &&

            <span className="error">

              {error}

            </span>

          }

          <button
            type="submit"
          >

            {

              loading

                ?

                "Signing In..."

                :

                "Login"

            }

          </button>

          <Link to="/register">

            Don't have an account? Register

          </Link>

        </form>

      </div>

    </MainLayout>

  );

}