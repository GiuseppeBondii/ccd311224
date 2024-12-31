import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AliceZoli49() {
    const navigate = useNavigate();
    const username = "AliceZoli49";
    const [savedUser, setSavedUser] = useState("");
    const [level, setLevel] = useState(0);

    const QestAns = [
        { Question: "Ti presenti con tutti e tieni sempre sott’occhio Alessandro Crispino. Quando lo vedi parlare animatamente con una ragazza ti ingelosisci e te ne vai. Chi è questa ragazza?", Answer: "Margherita Ricchi" },
        { Question: "Sconfortata, ti fai da parte e vai a parlare con Anna Cucinella, che ti ha fatto una buona impressione. Tra tutto quello che ti racconta, capisci che nutre degli strani sospetti verso una persona in particolare. chi?", Answer: "Mattia Pressiani" },
        { Question: "Non hai voglia di tornare a parlare con Alessandro, per cui ti interessi a Federico Angelelli. Gli porti un bicchiere di vino. Parlate un pò e ti dice di conosocere una persona in particolare. Anche te ti apri con lui e gli racconti della tua situazione sentimentale e gli dici di essere innamorata di Alessandro Crispino. A te comunque sembra strano che lui conosca quella persona che ti ha nominato e hai un presentimento... chi è questa persona?", Answer: "Anna Cucinella" },
        { Question: "Hai capito bene. Federico Angelelli è in realtà l’amante di Anna. Tieni per te questo segreto fiunche a una certa comparirà un codice preceduto da ##. Qual’è questo codice?", Answer: "2421" }
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
                hai le idee confuse, prova a capire con gli altri cosa sia successo realmente.
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

export default AliceZoli49;