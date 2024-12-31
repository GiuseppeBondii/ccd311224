import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function FrancescaPilara47() {
    const navigate = useNavigate();
    const username = "FrancescaPilara47";
    const [savedUser, setSavedUser] = useState("");
    const [level, setLevel] = useState(0);

    const QestAns = [
        { Question: "Hai vinto il concorso e hai chiesto a Chiara Cova di venire con te. Dopo esserti presentata con tutti, prendi Chiara da parte e digli di volerci provare con Leonardo Antonelli, lo conosci come regista e sai che è single. Anche Chiara dice di volerci provare con un tipo, chi?", Answer: "Riccardo Mari" },
        { Question: "Tieni d’occhio Leonardo: sta parlando con altre due persone. quando uno dei due se ne va, pensi sia un buon momento per andare a parlarci. Chi delle due persone con cui stava parlando se n’è andato? ", Answer: "Giuseppe Bondi"},
        { Question: "Dopo un po di chiacchiere, decidi con Leonardo di sederti uno a fianco all’altro durante la cena. A un certo punto qualcuno farà alzare Leonardo per parlare con lui in privato. Chi è?", Answer: "Mattia Pressiani"},
        { Question: "Aspetti che Leonardo torni e gli chiedi, preoccupata cos’è successo. Leonardo non ti dirà molto ma sei comunque un po impaurita. Durante il proseguire della cena salterà fuori un codice preceduto da ##, qual’è?", Answer: "2421"}
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
                Hai le idee confuse, prova a capire con gli altri cosa sia successo realmente.
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

export default FrancescaPilara47;