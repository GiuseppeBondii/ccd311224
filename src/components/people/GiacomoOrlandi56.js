import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function GiacomoOrlandi56() {
    const navigate = useNavigate();
    const username = "GiacomoOrlandi56";
    const [savedUser, setSavedUser] = useState("");
    const Giornale=require('./img/image.png');
    const [level, setLevel] = useState(0);

    const QestAns = [
        { Question: "Ti presenti con tutti. Quando sali sul soppalco noti una moneta di gran valore dentro una piccola teca sul tavolino. La teca è allarmata per cui non la prendi in mano. Cosa cè scritto sopra?", Answer: "EXTRA LIFE" },
        { Question: "L’allarme è collegato alla corrente elettrica per cui salterebbe se venisse staccata la corrente. Nessuno ti sembra particolarmente interessato alla moneta per cui decidi di esporre il piano alla tua ragazza convinto che nessuno se ne possa accorgere: Le dici che cè questa moneta in esposizione e che, se la rubaste, dareste una svolta alla vostra vita. Basterebbe che lei spenga le luci senza farsi vedere. Te vai su, sollevi la teca, prendi la moneta e te la metti in tasca. Lei avrà delle idee in merito al piano. Ti sembrano idee sensate e le dai corda. Attuate il piano senza che nessuno vi veda. Benedetta spegne le luci di nascosto, te prendi la moneta e tutto sembra fili liscio. Ci sarà una persona che andrà ad accendere le luci dopo il furto: chi?", Answer: "Francesco Romagnoli" },
        { Question: "Prosegui la serata tranquillamente. Ad un certo punto comparirà un codice numerico preceduto da ##, qual’è?", Answer: "2421" },
        { Question: "sei impaurito e hai paura che la gente nel casino generale scopra quello che hai fatto. In un attimo di lucidità, qunado si sarà ripresa, proponi di sbloccare il telefono del defunto e chiedi a Sofia se sa il pin. lei ti dirà un codice che sbloccherà il telefono. qual’è?", Answer: "2121" }
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
La batteria segnava un residuo del 42%, e la luminosità era impostata al 73%, con il tema scuro attivo. Sullo schermo è visibile un’icona di notifica rossa per un aggiornamento software non ancora installato. Le ultime impronte sul vetro sembrano formare una sorta di spirale confusa, forse segno di una pulizia approssimativa con un lembo di stoffa. Un piccolo granello di polvere si è insinuato tra il bordo del display e la cover, visibile solo se osservato da un angolo specifico. L’angolo inferiore destro del telefono ha una leggera ammaccatura, come se fosse stato fatto cadere da una piccola altezza.               
Le uniche applicazioni aperte in background sono Safari e l’applicazione “Memo Vocali”, che però non sembra contenere registrazioni recenti. Safari mostra un sito web del Corriere di Bologna:
<img src={Giornale} alt="Giornale il corriere di Bologna" className="Giornale"/>
<br />

Condividi queste informazioni con tutti e prova a capire cosa sia successo.
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

export default GiacomoOrlandi56;