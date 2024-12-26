import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function GiuseppeBondi42() {
    const navigate = useNavigate();
    const username = "GiuseppeBondi42";
    const [savedUser, setSavedUser] = useState("");
    const [level, setLevel] = useState(0);

    const QestAns = [
        { Question: "Come ti chiami?", Answer: "Giuseppe" },
        { Question: "Come si chiama la tua sorella piccola?", Answer: "Elena" }
        { Question: "Come si chiama la tua sorella Grande?", Answer: "Elisabettta" }

    ];

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
        return <h2>Complimenti! Hai completato tutte le domande.</h2>;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const userAnswer = event.target.elements.answer.value.trim().toLowerCase().replace(/\s+/g, '');
        const correctAnswer = QestAns[level].Answer.toLowerCase().replace(/\s+/g, '');

        if (userAnswer === correctAnswer) {
            const nextLevel = level + 1;
            setLevel(nextLevel);
            localStorage.setItem("storedQuestion", nextLevel);
            event.target.reset(); // Resetta il campo input
        } else {
            alert("Risposta sbagliata! Riprova.");
        }
    };

    return (
        <div>
            <h2>{QestAns[level].Question}</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="answer" placeholder="La tua risposta" required />
                <button type="submit">Invia</button>
            </form>
        </div>
    );
}

    return (
        <div>
            <h1>Benvenuto, {savedUser}!</h1>
            <QestAndReply />
        </div>
    );
}

export default GiuseppeBondi42;