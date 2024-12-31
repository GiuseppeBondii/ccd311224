import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function MargheritaRicchi61() {
    const navigate = useNavigate();
    const username = "MargheritaRicchi61";
    const [savedUser, setSavedUser] = useState("");
    const [level, setLevel] = useState(0);

    const QestAns = [
        { Question: "Accogli gli ospiti. Scopri da voci che c’è il fratello della Maria Letizia Crispino. Dopo un po’ ti avi a presentare con lui, gli dici di conoscere sua sorella e che non vedevi l’ora di conoscere un altra parte della famiglia. Dopo due parole di presentazione ti sentirai in dovere di esprimerti riguardo al moroso di Maria, alla luce dei recenti fatti successi che hanno portato tuo marito a doverlo tirare fuori dai guai. Pensi logicamente che sia stato invitato da sua sorella a passare la serata con voi ma è stato invitato da un’ altra persona. chi?", Answer: "Alice Zoli" },
        { Question: "La serata proseguirà tranquillamente e te aiuterai Davide con le mansioni da svolgere. Ad un certo punto, in un modo o nell’altro comparirà un codice numerico preceduto da ##, Qual’è il codice?", Answer: "2421" }
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
                Hai paura. Chi è stato? Prova a scoprirlo con l’aiuto di tutti.
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

export default MargheritaRicchi61;