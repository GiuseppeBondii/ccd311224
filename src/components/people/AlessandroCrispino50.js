import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AlessandroCrispino50() {
    const navigate = useNavigate();
    const username = "AlessandroCrispino50";
    const [savedUser, setSavedUser] = useState("");
    const [level, setLevel] = useState(0);

    const QestAns = [
        { Question: "Ti presenti con tutti. Una persona in particolare ti noterà in quanto fratello di Maria Letizia Crispino e ti parlerà di Giacomo Bucchi. Chi è questa persona?", Answer: "Margherita Ricchi" },
        { Question: "Sei sconcertato di quello che ti racconta Margherita e vai a prendere in disparte Maria per parlarle di quello che ti è stato riferito, arrabbiato. Lei si mostra contraria e per infastidirti ti dice di aver avuto una storia con un altra persona li presente, chi?", Answer: "Giuseppe Bondi" },
        { Question: "Capisci che sono parole sprecate. Lasci stare e continui a intrattenerti con gli altri presenti.Passi una serata tranquilla e, a una certa durante la cena compare un codice preceduto da ##, che codice?", Answer: "2421" }    ];

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
                Dici quello che sai. Provi a capire cosa sia successo.
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

export default AlessandroCrispino50;