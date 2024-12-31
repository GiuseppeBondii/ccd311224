import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ChiaraCova48() {
    const navigate = useNavigate();
    const username = "ChiaraCova48";
    const [savedUser, setSavedUser] = useState("");
    const [level, setLevel] = useState(0);

    const QestAns = [
        { Question: "Ha vinto il concorso Francesca Pilara e ti ha invitata. Dopo essersi presentata con tutti, prendi Francesca da parte e gli dici di volerci provare con Riccardo Mari. Anche Francesca è interessata a qualcuno, chi?", Answer: "Leonardo Antonelli" },
        { Question: "Riccardo sarà a parlare con una ragazza che, a un certa se ne andrà in bagno. Appena questa andrà, offri un bicchiere di birra a Riccardo e inizia a parlare con lui. Sei gelosa della ragazza con cui parlava. Qual’ è il suo nome?", Answer: "Sofia Comerci" },
        { Question: "Continua a parlare con lui finche regge la conversazione. La serata proseguirà tranquillamente fino a quando in un modo o nell’altro comparirà un codice numerico preceduto da ##, Qual’è il codice?", Answer: "2421" }    ];

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
                Cerca di capire cosa sta succedendo. chi è stato?
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

export default ChiaraCova48;