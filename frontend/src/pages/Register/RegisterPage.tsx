import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";
import { registerUser } from "../../services/authService";

import "./RegisterPage.css";

export default function RegisterPage() {

    const navigate = useNavigate();

    const [form,setForm]=useState({
        name:"",
        email:"",
        password:"",
        experience:0
    });

    const [loading,setLoading]=useState(false);

    const [error,setError]=useState("");

    async function handleSubmit(e:React.FormEvent){

        e.preventDefault();

        try{

            setLoading(true);

            setError("");

            await registerUser(form);

            alert("Registration Successful!");

            navigate("/login");

        }catch{

            setError("Registration Failed");

        }finally{

            setLoading(false);

        }

    }

    return(

        <MainLayout>

            <div className="register-container">

                <form
                    className="register-card"
                    onSubmit={handleSubmit}
                >

                    <h1>Create Account</h1>

                    <input
                        placeholder="Full Name"
                        value={form.name}
                        onChange={(e)=>setForm({...form,name:e.target.value})}
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={(e)=>setForm({...form,email:e.target.value})}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={(e)=>setForm({...form,password:e.target.value})}
                    />

                    <input
                        type="number"
                        placeholder="Experience (Years)"
                        value={form.experience}
                        onChange={(e)=>setForm({...form,experience:Number(e.target.value)})}
                    />

                    {error &&

                        <span className="error">

                            {error}

                        </span>

                    }

                    <button>

                        {

                            loading

                            ?

                            "Creating..."

                            :

                            "Register"

                        }

                    </button>

                    <Link to="/login">

                        Already have an account?

                    </Link>

                </form>

            </div>

        </MainLayout>

    );

}