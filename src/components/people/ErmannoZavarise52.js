import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ErmannoZavarise52() {
    const navigate = useNavigate();
    const username = "ErmannoZavarise52";
    const [savedUser, setSavedUser] = useState("");
    const [level, setLevel] = useState(0);

    const QestAns = [
        { Question: "Stai attento a che tutti siano arrivati. Nel frattempo ti presenti e parli con tutti. quando sei certo che tutti siano arrivati vai a cercare il manutentore e gli fai domande sul meteo. lui ti dá un dato: tra quanti minuti dovrebbe nevicare?", Answer: "20" },
        { Question: "Dopo un pó sarai incuriosito da Maria Peroni perché ti sembrerà avere uno strano comportamento. Le porti un bicchiere di vino o di birra e lei ti racconterá il motivo per cui sta cosi. con chi ce l’ha?", Answer: "Giuseppe Bondi" },
        { Question: "La serata proseguirà tranquillamente fino a quando in un modo o nell’altro comparirà un codice numerico preceduto da ##, Qual’è il codice?", Answer: "2421" }    ];

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
                Sei sconvolto. Racconta quello che ti è stato raccontato da Maria.
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

export default ErmannoZavarise52;