import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function MariaPeroni58() {
    const navigate = useNavigate();
    const username = "MariaPeroni58";
    const [savedUser, setSavedUser] = useState("");
    const [level, setLevel] = useState(0);

    const QestAns = [
        { Question: "Ti presenti un po con tutti. Arriverà un ragazzo dopo un po che ti porgerà un bicchiere di vino o di birra e ti chiederà se è successo qualcosa, le sembri strana, chi è? ", Answer: "Ermanno Zavarise" },
        { Question: "Dopo un po di convenevoli decidi di raccontargli la tua storia. Lui ti ascolterà e si mostrerà comprensivo. Dopo questo incontro, la serata proseguirà tranquillamente fin quando non comparirà un codice preceduto da ##. qual’è? ", Answer: "2421" }    ];

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
                Ti sentirai in difetto per aver pensato di fare del male al defunto. Qualcuno ti attaccherà. difenditi come puoi e prova a ragionare con gli altri per capire cosa sia successo realmente.
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

export default MariaPeroni58;