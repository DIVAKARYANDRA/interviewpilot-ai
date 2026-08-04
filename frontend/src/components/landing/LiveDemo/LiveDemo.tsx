import { motion } from "framer-motion";
import {
    Bot,
    User,
    Sparkles
} from "lucide-react";

import "./LiveDemo.css";

export default function LiveDemo() {

    return (

        <section className="live-demo">

            <motion.h2

                initial={{ opacity: 0, y: 30 }}

                whileInView={{ opacity: 1, y: 0 }}

                viewport={{ once: true }}

            >

                Experience an AI Interview

            </motion.h2>

            <motion.p

                initial={{ opacity: 0 }}

                whileInView={{ opacity: 1 }}

                viewport={{ once: true }}

            >

                Watch how InterviewPilot evaluates your answers instantly.

            </motion.p>

            <motion.div

                className="demo-window"

                initial={{ opacity: 0, scale: .95 }}

                whileInView={{ opacity: 1, scale: 1 }}

                viewport={{ once: true }}

            >

                {/* Browser Header */}

                <div className="window-header">

                    <span className="dot red"></span>

                    <span className="dot yellow"></span>

                    <span className="dot green"></span>

                    <small>InterviewPilot Live Session</small>

                </div>

                {/* AI */}

                <div className="chat ai">

                    <div className="avatar">

                        <Bot size={24}/>

                    </div>

                    <div className="bubble">

                        Explain Dependency Injection in FastAPI.

                    </div>

                </div>

                {/* User */}

                <div className="chat user">

                    <div className="bubble">

                        Dependency Injection allows FastAPI to automatically
                        provide required objects like database sessions,
                        authentication handlers and reusable services.

                    </div>

                    <div className="avatar">

                        <User size={24}/>

                    </div>

                </div>

                {/* AI Evaluation */}

                <div className="evaluation-card">

                    <div className="evaluation-title">

                        <Sparkles size={18}/>

                        AI Evaluation

                    </div>

                    <div className="progress-item">

                        <span>Technical</span>

                        <div className="bar">

                            <div
                                className="fill"
                                style={{ width: "92%" }}
                            ></div>

                        </div>

                        <strong>92%</strong>

                    </div>

                    <div className="progress-item">

                        <span>Communication</span>

                        <div className="bar">

                            <div
                                className="fill"
                                style={{ width: "88%" }}
                            ></div>

                        </div>

                        <strong>88%</strong>

                    </div>

                    <div className="progress-item">

                        <span>Confidence</span>

                        <div className="bar">

                            <div
                                className="fill"
                                style={{ width: "94%" }}
                            ></div>

                        </div>

                        <strong>94%</strong>

                    </div>

                </div>

            </motion.div>

        </section>

    );

}