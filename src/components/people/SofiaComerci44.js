import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SofiaComerci44() {
    const navigate = useNavigate();
    const username = "SofiaComerci44";
    const [savedUser, setSavedUser] = useState("");
    const [level, setLevel] = useState(0);

    const QestAns = [
        { Question: "Ti presenterai con tutti. Una persona in particolare, che non è il tuo moroso, farà il gentile con te, fin troppo. Capisci che si tratta di lui quando insiste a portarti un bicchiere di vino. Chi è? Quando hai capito che si tratta di lui chiacchieraci un pò, poi gli dici che devi andare in bagno e lì inserisci nome e cognome", Answer: "Riccardo Mari" },
        { Question: "Stai un pò in bagno sperando che trovi altra compagnia. Quando torni dal bagno, tieniti occupata fin a quando Riccardo non trova un altra ragazza con cui parlare nel caso non l’avesse gia fatto. chi?", Answer: "Chiara Cova"},
        { Question: "Racconta dell’approccio di Riccardo al tuo moroso. lui ti racconterà una storia “Divertente” successa tra lui e una ragazza presente che non conoscevi. chi è questa persona?", Answer: "Maria Letizia Crispino"},
        { Question: "Sei un po gelosa ma lasci stare. La serata proseguirà tranquillamente fino a quando in un modo o nell’altro comparirà un codice numerico preceduto da ##, Qual’è il codice?", Answer: "2421"}
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
            return <h2 className="question">Sei impaurita. Provi a capire cosa stia succedendo. Fai una scenata indecente. chi è stato????? fatti aiutare da tutti per scoprirlo.
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

export default SofiaComerci44;