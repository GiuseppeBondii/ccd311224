import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function RiccardoMari45() {
    const navigate = useNavigate();
    const username = "RiccardoMari45";
    const [savedUser, setSavedUser] = useState("");
    const [level, setLevel] = useState(0);

    const QestAns = [
        { Question: "ENTRI CON DOME, DOPO QUALCHE PRESENTAZIONE, GLI DICI DI VOLERCI PROVARE CON UNA TIPA, LA SOFIA COMERCI, ANCHE DOME TI INDICHERÀ UNA RAGAZZA CON CUI VORREBBE PROVARCI, CHI? (Nome e Cognome)", Answer: "SOFIA COMERCI" },
        { Question: "COMUNQUE NON TIRI INDIETRO E VAI A PARLARCI FAI IL GENTILE, DOVRAI PORGERLE UN BICCHIERE PER AVERE LA SUA ATTENZIONE. PARLERETE FINO A QUANDO LEI DOVRÀ ANDARE IN UN POSTO, DOVE? ", Answer: "Bagno" },
        { Question: "LA SOFIA È ANDATA IN BAGNO. TE RIMANI COME UN POLLO A BRETI IL TUO VINO. A UNA CERTA UNA RAGAZZA VERRÀ A PARLARTI PORTANDOTI UN BICCHIERE DI BIRRA. CHI? (SOPRANNOME)", Answer: "CIARUZ" },
        { Question: "P’TOST CHE NINT L’È MEJI P’TOST, INTRATIENI LA CONVERSAZIONE.  LA SERATA PROSEGUIRÀ TRANQUILLAMENTE FINO A QUANDO IN UN MODO O NELL’ ALTRO COMPARIRÀ UN CODICE NUMERICO PRECEDUTO DA ##, QUALE? CODE", Answer: "2421" }

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
            return <h2>PROVI A CAPIRE COS È SUCCESSO.
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

export default RiccardoMari45;