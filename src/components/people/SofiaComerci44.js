import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SofiaComerci44() {
    const navigate = useNavigate();
    const username = "SofiaComerci44";
    const [savedUser, setSavedUser] = useState("");
    const [level, setLevel] = useState(0);

    const QestAns = [
        { Question: "TI PRESENTERAI CON UN PO TUTTI. UNA PERSONA IN PARTICOLARE, CHE NON È IL TUO MOROSO, FARÀ IL GENTILE CON TE, FIN TROPPO. LO CAPISCI QUANDO INSISTE A PORTARTI UN BICCHIERE DI VINO. CHI È? QUANDO HAI CAPITO VAI IN BAGNO E INSERISCI NOME E COGNOME", Answer: "RICCARDO MARI" },
        { Question: "RICCARDO SARÀ IMPEGNATO A PARLARE CON UN ALTRA. LA SERATA PROSEGUIRÀ TRANQUILLAMENTE FINO A QUANDO IN UN MODO O NELL’ ALTRO COMPARIRÀ UN CODICE NUMERICO PRECEDUTO DA ##, QUALE? CODE", Answer: "2421" }
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
            return <h2>SEI IMPAURITA, PROVI A CAPIRE COS È SUCCESSO.
                <br></br>
            CHI È STATO?
            <br></br>
            QUALCUNO L’ HA AIUTATO? SE SI, CHI?
            <br></br>
            COME L’HA UCCISO?
            <br></br>
            PERCHE?
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
                <h2>{QestAns[level].Question}</h2>
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