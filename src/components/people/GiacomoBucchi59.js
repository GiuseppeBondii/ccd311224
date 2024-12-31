import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function GiacomoBucchi59() {
    const navigate = useNavigate();
    const username = "GiacomoBucchi59";
    const [savedUser, setSavedUser] = useState("");
    const [level, setLevel] = useState(0);

    const QestAns = [
        { Question: "Quando arrivi inizi con le presentazioni. Dopo un po ti arriverà da qualcuno la voce che la Maria ha avuto in passato una breve storia con un presente che non conosci. chi è?", Answer: "Giuseppe Bondi" },
        { Question: "Lasci stare per un po la situazione, fai come nulla fosse ma in realtà traspare una forte gelosia dai tuoi comportamenti. Resisterai fin quando sarà ora dei primi, a quel punto andrai a confidarti dallo chef, visto che è un tuo caro amico, e sfogati insultando Giuseppe con lui in privato.  A una certa Davide inizierà a parlare di altro per distrarti. Ti distrae con successo e inizia a parlarti di cucina. Di che piatto cita il nome origiale latino?", Answer: "Pienus Cappellus" },
        { Question: "Chiedi allo chef se ha usato la ricetta originale o no, perche non senti il sapore delle noci e gli dici che Tua nonna Ginevra Bucchi li preparava in questo modo. Qualcuno è allergico a un ingerdiente della ricetta, quale? ", Answer: "Noci" },
        { Question: "Fai finta di niente, fingiti piu tranquillo. Senza farti vedere vai in dispensa a cercare le noci che aveva comprato lo chef. Cè un codice scritto a penna sotto al pacchetto di noci, quale?", Answer: "1111" },
        { Question: "frantumi le noci e le metti in un piatto che fai avere a Giuseppe senza farti vedere da nessuno. Fai il disinvolto, come non fosse successo niente. Vuoi solo fargli un dispetto di cattivo gusto. Ad un certo punto compare un codice preceduto da ##, Qual’ è il codice?", Answer: "2421" }    ];

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
                Fai in modo che non si dubiti di te. Appoggia chi propone una soluzione democratica e ordinata. Ci sarà una votazione quando tutti avranno parlato. Fai in modo di non risultare colpevole
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

export default GiacomoBucchi59;