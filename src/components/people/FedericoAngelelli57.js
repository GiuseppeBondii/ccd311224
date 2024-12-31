import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function FedericoAngelelli57() {
    const navigate = useNavigate();
    const username = "FedericoAngelelli57";
    const [savedUser, setSavedUser] = useState("");
    const [level, setLevel] = useState(0);

    const QestAns = [
        { Question: "Ti presenti con tutti. Nessuno sa del tuo rapporto con Anna ma ti da fastidio che Mattia le stia attaccato. Noterai che una ragazza che non conosci sta parlando con Anna, bionda , anche lei occhi chiari, aspetti che finiscano di parlare e, un po per ripicca verso Anna un po perché ti piace, le vai a parlare. chi è?", Answer: "Alice Zoli" },
        { Question: "Le parli un po e ti lasci sfuggire il fatto che anche tu conosci Anna, non approfondisci il discorso. Le chiedi della sua situazione sentimentale e lei ti risponde di essere innamorata di un ragazzo, chi?", Answer: "Alessandro Crispino" },
        { Question: "Tagli il discorso e prosegui la serata con altri. Ti verra a fare domande una tua amica di infanzia. Te le racconterai di essere l’amante di Anna, hai alzato un po troppo il gomito e in fondo ti fidi di lei. Dopo qualche convenevole continuerà la serata e ad un certo punto comparirà un codice preceduto da ##, qual’è?", Answer: "2421" }    ];

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

export default FedericoAngelelli57;