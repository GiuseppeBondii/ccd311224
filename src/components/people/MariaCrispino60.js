import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function MariaCrispino60() {
    const navigate = useNavigate();
    const username = "MariaCrispino60";
    const [savedUser, setSavedUser] = useState("");
    const [level, setLevel] = useState(0);

    const QestAns = [
        { Question: "Quando arrivi ti presenti con tutti gli invitati che non conosci e saluti chi gia conosci. Vedrai una persona che, inizialmente non riconosci ma che ti fa ricordare che effettivamente avete avuto una breve storia di qualche notte anni prima. Ti viene a salutare e ti prova a ricordare di quando vi siete conosciuti.Chi è ?", Answer: "Giuseppe Bondi" },
        { Question: "Siete rimasti in buoni rapporti per cui non hai problemi a parlarci o a parlare della strana coincidenza con gli altri. Lui è impegnato in una relazione per cui non ti fai particolari problemi. Ti prenderà in disparte una persona che ti vuole parlare di Giacomo, a proposito di qualcosa che ha appena scoperto. Ti mostra contraria e arrabbiata e per infastidirlo, raccontagli della storia che hai avuto con Giuseppe. Chi è questa persona? ", Answer: "Alessandro Crispino" },
        { Question: "La serata proseguirà tranquillamente fino a quando in un modo o nell’altro comparirà un codice numerico preceduto da ##, Qual’è il codice?", Answer: "2421" },
        { Question: "Sei impaurita. Provi a capire cosa stia succedendo. Chi è stato? Fatti aiutare da tutti per scoprirlo. Qualcuno additerà una persona a te cara. Di chi si tratta?", Answer: "Giacomo Bucchi" }
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
                Difendilo. Non può essersi spinto a tanto. Il tuo obbiettivo è che non venga indicato dalla maggioranza come colpevole.
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

export default MariaCrispino60;