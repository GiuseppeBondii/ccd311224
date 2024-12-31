import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function FrancescoRomagnoli51() {
    const navigate = useNavigate();
    const username = "FrancescoRomagnoli51";
    const [savedUser, setSavedUser] = useState("");
    const [level, setLevel] = useState(0);

    const QestAns = [
        { Question: "Ti presenti con tutti. Un presente in particolare ti farà domande sul meteo quando gli dici di essere il manutentore della casa. È convinto stia per arrivare una forte nevicata e tu gli dirai che effettivamente tra 20 minuti dovrebbe nevicare. Chi?", Answer: "Ermanno Zavarise" },
        { Question: "Lo rassicuri. É normale che in questo periodo ci siano forti precipitazioni. Tra 15 minuti andrai a fumarti una sigaretta fuori e constaterai a tutti i presenti che nevica e fino a quando non smette sarà impossibile fare e ricevere chiamate e che il traffico dati sarà interrotto per ragioni di sicurezza. Non ci saranno però problemi con la rete elettrica. Inizialmente forse qualcuno ti risulterà perplesso per cui prometti che nel caso succeda qualcosa ti precipiterai ad sistemare la situazione dato che è il tuo lavoro. Stai pronto ad eventuali interventi. Ad un certo punto comparirà un codice preceduto da ##, qual’é?", Answer: "2421" }    ];

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
                Non sai cosa fare. Si creerà del casino. Prendi in mano la situazione e fai in modo 
                Proponi che ordinatamente, uno alla volta si dica quello che si sà per non creare caos e, quando nessuno ha piu nulla da aggiungere, indici una votazione democratica per decidere chi chiudere in uno sgabuzzino fino all’arrivo della polizia.
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

export default FrancescoRomagnoli51;