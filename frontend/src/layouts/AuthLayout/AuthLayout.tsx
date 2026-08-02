import type { ReactNode } from "react";

import "./AuthLayout.css";


interface Props {

    children: ReactNode;

}


export default function AuthLayout({

    children

}: Props) {

    return (

        <main className="auth-layout">

            {children}

        </main>

    );

}