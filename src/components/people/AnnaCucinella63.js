import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AnnaCucinella63() {
    const navigate = useNavigate();
    const username = "AnnaCucinella63";
    const [savedUser, setSavedUser] = useState("");
    const [level, setLevel] = useState(0);

    const QestAns = [
        { Question: "Noterai un comportamento strano di Mattia, che seppur non l’abbia mai visto prima, prende in disparte una persona e iniziano a parlare tra loro per qualche minuto. Chi è questa persona?", Answer: "Leonardo Antonelli" },
        { Question: "Verrà da te dopo un po una ragazza che si lamenterà per questioni d’amore. Presa dal momento anche te le racconterai dei tuoi casini: le dici che stai tradendo Mattia ma non le dici che lo stai facendo con Federico Angelelli. Chi è questa ragazza?", Answer: "Alice Zoli" },
        { Question: "Lasci stare. Continui ad evitare Federico Angelelli perché ti senti in imbarazzo. La serata proseguirà tranquillamente fino a quando in un modo o nell’altro comparirà un codice numerico preceduto da ##, Qual’è il codice?", Answer: "2421" }
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
                Ci sarà qualcuno che ti additerà e verrai a conoscenza di segreti oscuri. sei impaurita. Com’è possibile che sia successo davvero? Provate a capire chi è stato e perchè
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

export default AnnaCucinella63;