import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthLayout from "../../layouts/AuthLayout/AuthLayout";

import { registerUser } from "../../services/authService";

import "./RegisterPage.css";


export default function RegisterPage() {


    const navigate = useNavigate();


    const [form,setForm] = useState({

        name:"",
        email:"",
        password:"",
        confirmPassword:"",
        experience:0,
        current_company:"",
        target_company:"",
        target_role:""

    });


    const [loading,setLoading] = useState(false);

    const [error,setError] = useState("");



    function updateField(
        field:string,
        value:any
    ){

        setForm({

            ...form,

            [field]:value

        });

    }



    async function handleSubmit(
        e:React.FormEvent
    ){

        e.preventDefault();


        setError("");



        if(!form.name ||
           !form.email ||
           !form.password ||
           !form.confirmPassword){

            setError(
                "Please fill all required fields."
            );

            return;

        }


        if(form.password !== form.confirmPassword){

            setError(
                "Passwords do not match."
            );

            return;

        }


        if(form.password.length < 8){

            setError(
                "Password must contain minimum 8 characters."
            );

            return;

        }



        try{


            setLoading(true);



            await registerUser({

                name:form.name,

                email:form.email,

                password:form.password,

                experience:form.experience,

                current_company:
                    form.current_company,

                target_company:
                    form.target_company,

                target_role:
                    form.target_role

            });


            navigate("/login");


        }

        catch(error:any){


            setError(

                error?.response?.data?.detail

                ||

                "Registration failed."

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

                onSubmit={handleSubmit}

            >


                <h1>
                    Create Account
                </h1>


                <p>
                    Join InterviewPilot AI
                </p>



                <label>
                    Full Name *
                </label>

                <input

                    value={form.name}

                    onChange={
                        e=>updateField(
                            "name",
                            e.target.value
                        )
                    }

                />



                <label>
                    Email *
                </label>

                <input

                    type="email"

                    value={form.email}

                    onChange={
                        e=>updateField(
                            "email",
                            e.target.value
                        )
                    }

                />



                <label>
                    Password *
                </label>


                <input

                    type="password"

                    value={form.password}

                    onChange={
                        e=>updateField(
                            "password",
                            e.target.value
                        )
                    }

                />



                <label>
                    Confirm Password *
                </label>


                <input

                    type="password"

                    value={form.confirmPassword}

                    onChange={
                        e=>updateField(
                            "confirmPassword",
                            e.target.value
                        )
                    }

                />



                <label>
                    Experience
                </label>

                <input

                    type="number"

                    value={form.experience}

                    onChange={
                        e=>updateField(
                            "experience",
                            Number(e.target.value)
                        )
                    }

                />



                <label>
                    Current Company
                </label>

                <input

                    value={form.current_company}

                    onChange={
                        e=>updateField(
                            "current_company",
                            e.target.value
                        )
                    }

                />



                <label>
                    Target Company
                </label>

                <input

                    value={form.target_company}

                    onChange={
                        e=>updateField(
                            "target_company",
                            e.target.value
                        )
                    }

                />



                <label>
                    Target Role
                </label>

                <input

                    value={form.target_role}

                    onChange={
                        e=>updateField(
                            "target_role",
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



                <button disabled={loading}>

                    {

                    loading

                    ?

                    "Creating..."

                    :

                    "Register"

                    }

                </button>



                <Link to="/login">

                    Already have an account? Login

                </Link>


            </form>


        </AuthLayout>

    );

}