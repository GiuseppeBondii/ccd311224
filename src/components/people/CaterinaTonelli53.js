import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CaterinaTonelli53() {
    const navigate = useNavigate();
    const username = "CaterinaTonelli53";
    const [savedUser, setSavedUser] = useState("");
    const [level, setLevel] = useState(0);

    const QestAns = [
        { Question: "Ti presenti un po con tutti. Arianna Ugolini ad un certo punto verra a cercarti per dirti che vuole conoscere meglio un raggazzo, come si chiama? ", Answer: "Tommaso Domeniconi" },
        { Question: "Anche te hai notato una persona alla serata che non ti aspettavi di conoscere, Federico Angelelli, tuo amico di infanzia, dillo ad Arianna. Se sta parlando con una ragazza bionda aspetti, poi gli vai a parlare. Vai a fargli domande generali su cosa sta facendo nella vita ecc. Lui ti dirà che oltre a te conosce un altra persona alla serata, con cui ha un rapporto “strano”, Chi?", Answer: "Anna Cucinella" },
        { Question: "Ti insospettisci un po ma lasci correre. Passerai una serata tranquilla. Ad un certo punto comparirà un codice numerico preceduto da ##, qual’è?", Answer: "2421" }    ];

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
                sei sconvolta. Racconta quello che sai per provare a capire con gli altri cos’è successo.
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

export default CaterinaTonelli53;