import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function DavideMonachini62() {
    const navigate = useNavigate();
    const username = "DavideMonachini62";
    const [savedUser, setSavedUser] = useState("");
    const [level, setLevel] = useState(0);

    const QestAns = [
        { Question: "Accogli i tuoi ospiti. Fai come da programma: all’ inizio antipasti vari in piedi, dove i tuoi ospiti si conosceranno tra loro con birra e vino e poi la cena. Giacomo Bucchi, dopo un po verrà a confidarsi con te per qualcosa di molto importante per lui e si lasci sfuggire qualche insulto a una persona in partiolare. Chi?", Answer: "Giuseppe Bondi" },
        { Question: " Per distrarre Giacomo, inizi a parlare dei piatti della serata e insisti sulla ricetta dei cappelleti e gli racconti che il nome originario era Pienus Cappellus e che il ripieno era fatto con noci, macinato e formaggio. Dopo aver raccontato questo aneddoto, lui ti dice che una persona a lui vicina li preparava questo piatto con la ricetta originale. come si chiama questa persona? (nome)", Answer: "Ginevra" },
        { Question: "Racconti a Giacomo che avevi intenzione di preparare il piatto con quella ricetta ma, dopo aver fatto la spesa, ti è arrivata la notizia che Giuseppe Bondi è allergico alle noci per cui le hai lasciate in dispensa. Giacomo ti sembra piu tranquillo per cui non ti fai più problemi. Ad un certo punto comparirà un codice numerico preceduto da ##, qual’è?", Answer: "2421" }    ];

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
                Sei sconvolto. Combattuto se nascondere quello che sai o dirlo a tutti. Dopo un po cedi e quando vieni interpellato racconti quello che sai. Sarà davvero stato lui? Vuoi andare a fondo della questione e scoprire la verità.
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

export default DavideMonachini62;