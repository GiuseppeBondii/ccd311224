import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function BenedettaGigliarelli55() {
    const navigate = useNavigate();
    const username = "BenedettaGigliarelli55";
    const [savedUser, setSavedUser] = useState("");
    const [level, setLevel] = useState(0);

    const QestAns = [
        { Question: "Ti presenti con tutti. Ad un certo punto, qualcuno ti parlerà di un cimelio di valore in esposizione nella casa dello chef. Chi te ne parla?", Answer: "Giacomo Orlandi" },
        { Question: "Ascolti con attenzione il piano di Giacomo. Se non sta ancora nevicando gli dici che sarebbe una buona idea aspettare la bufera che ce in programma e attuare il piano quando sarà il momento: qualcuno annuncerà la bufera di neve o l ha gia fatto. Attuate il piano: senza farti vedere da nessuno vai a spegnere le luci e Giacomo ruberà la moneta.  Ci sarà una persona che andrà ad accendere le luci dopo il furto: chi?", Answer: "Francesco Romagnoli" },
        { Question: "Prosegui la serata tranquillamente. Ad un certo punto comparirà un codice numerico preceduto da ##, qual’è?", Answer: "2421" }
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

export default BenedettaGigliarelli55;