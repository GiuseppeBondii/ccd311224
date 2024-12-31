import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function TommasoDomeniconi46() {
    const navigate = useNavigate();
    const username = "TommasoDomeniconi46";
    const [savedUser, setSavedUser] = useState("");
    const [level, setLevel] = useState(0);

    const QestAns = [
        { Question: "Entri con Riccardo Mari. Dopo esserti presentato con tutti, lo vai a cercare e gli dici che vuoi provarci con Sofia Comerci. Anche Lui ti indica una tipa con cui ha intenzione di provarci, chi?", Answer: "Sofia Comerci" },
        { Question: "Accetti la situa e gli dai il via libera perche hai notato anche un altra ragazza che vorresti conoscere meglio: Arianna Ugolini. Provi ad interagire con lei per conoscerla e passi il resto della serata con un po tutti i presenti parlando del piu e del meno. A una certa qualcuno ti interromperà mentre sei a tavola e ti chiederà di parlare in privato, te ti alzerai e sentirai cos ha da dire. Chi è questa persona?", Answer: "Leonardo Antonelli" },
        { Question: "Dirai a Leonardo che il medicinale di Mattia Pressiani è semplicemente un integratore e di stare tranquillo. Torni a sederti a tavola e durante il proseguire della cena salterà fuori un codice preceduto da ##, qual’è? ", Answer: "2421" }
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
        return <h2 className="question">Non sai cosa fare. Qualcuno dubiterà di Mattia e te, per provare che il suo medicinale è completamente innocuo, ne ingerirai una parte e non avrai problemi. Cerca di capire cos’è successo difendendo Mattia a spada tratta. Se Venisse additato lui come colpevole alla fine della serata, perderesti il lavoro e la reputazione.</h2>;
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

export default TommasoDomeniconi46;