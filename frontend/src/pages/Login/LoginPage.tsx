import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthLayout from "../../layouts/AuthLayout/AuthLayout";

import {
    login,
    getUser
} from "../../hooks/useAuth";

import "./LoginPage.css";


export default function LoginPage() {


    const navigate = useNavigate();


    const [email,setEmail] = useState("");

    const [password,setPassword] = useState("");

    const [loading,setLoading] = useState(false);

    const [error,setError] = useState("");



    async function handleLogin(
        e:React.FormEvent
    ){

        e.preventDefault();


        if(!email || !password){

            setError(
                "Email and password are required."
            );

            return;

        }


        try{

            setLoading(true);

            setError("");


            await login(
                email,
                password
            );

            await getUser();


            navigate("/dashboard");


        }
        catch{

            setError(
                "Invalid email or password."
            );

        }
        finally{

            setLoading(false);

        }

    }



    return (

        <AuthLayout>


            <form

                className="auth-card"

                onSubmit={handleLogin}

            >


                <h1>
                    Welcome Back
                </h1>


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
                        e=>setEmail(
                            e.target.value
                        )
                    }

                />



                <label>
                    Password *
                </label>


                <input

                    type="password"

                    value={password}

                    onChange={
                        e=>setPassword(
                            e.target.value
                        )
                    }

                />



                {

                    error &&

                    <div className="auth-error">

                        {error}

                    </div>

                }



                <button
                    type="submit"
                    disabled={loading}
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


        </AuthLayout>

    );

}