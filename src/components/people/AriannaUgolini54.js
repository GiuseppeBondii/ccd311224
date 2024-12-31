import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AriannaUgolini54() {
    const navigate = useNavigate();
    const username = "AriannaUgolini54";
    const [savedUser, setSavedUser] = useState("");
    const [level, setLevel] = useState(0);

    const QestAns = [
        { Question: "Quando arriverai ti presenterai con tutti. Sei una sportiva per cui deciderai di andare a conoscere meglio un ragazzo quando verrai a sapere che a Maggio andrà a Nizza a fare una gara di Triathlon. Come si chiama questo ragazzo?", Answer: "Tommaso Domeniconi" },
        { Question: "Decidi di confidarti con la tua amica Caterina Tonelli: gli dirai che vuoi conoscere meglio Tommaso Domeniconi e poco dopo lei ti dirà che ha riconosciuto un amico di infanzia alla serata e vuole andarci a parlare. Chi?", Answer: "Federico Angelelli" },
        { Question: "Te ti interessi a Tommaso, lo conoscerai un po e per il resto passerai un serata tranquilla. Ad un certo punto comparirà un codice numerico preceduto da ##, qual’è?", Answer: "2421" }    ];

    useEffect(() => {
        const storedUser = localStorage.getItem("saveduser");
        const storedLevel = parseInt(localStorage.getItem("storedQuestion"), 10);

        if (storedUser) {
            if (storedUser !== username) {
                navigate("../" + storedUser);
            } else {
                setSavedUser(storedUser);
                setLevel(storedLevel || 0);
            }
        } else {
            setSavedUser(username);
            localStorage.setItem("saveduser", username);
            localStorage.setItem("storedQuestion", 0);
        }
    }, [navigate, username]);

    function QestAndReply() {
        if (level >= QestAns.length) {
            return <h2 className="question">
                Sei sconvolta. Prova a capire con gli altri cos’è successo. Chi è stato?
            </h2>;
        }
    
        const handleSubmit = (event) => {
            event.preventDefault();
            const userAnswer = event.target.elements.answer.value.trim().toLowerCase().replace(/\s+/g, '');
            const correctAnswer = QestAns[level].Answer.toLowerCase().replace(/\s+/g, '');
    
            if (userAnswer === correctAnswer) {
                const nextLevel = level + 1;
                setLevel(nextLevel);
                localStorage.setItem("storedQuestion", nextLevel);
                event.target.reset();
            } else {
                alert("Risposta sbagliata! Riprova.");
            }
        };
    
        return (
            <div>
                <h2 className="question">{QestAns[level].Question}</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="answer" placeholder="La tua risposta" required />
                    <button type="submit">Invia</button>
                </form>
            </div>
        );
    }
    return (
        <div>
            <QestAndReply />
        </div>
    );
}

export default AriannaUgolini54;