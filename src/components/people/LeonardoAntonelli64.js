import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LeonardoAntonelli64() {
    const navigate = useNavigate();
    const username = "LeonardoAntonelli64";
    const [savedUser, setSavedUser] = useState("");
    const [level, setLevel] = useState(0);

    const QestAns = [
        { Question: "Ti presenti un po con tutti, quando ti imbatti in Mattia Pressiani, insisti di andare a parlare con lui in privato e andate. Restate a parlare qualche minuto. Qualcuno verrà da voi a fare domande sul vostro passato. Chi?", Answer: "Giuseppe Bondi" },
        { Question: "Giuseppe se ne andrà in poco temp. te te ne andrai solo quando vi interrompe una ragazza che ti porge un bicchiere. Tu accetti e inizi a parlare con lei, andandotene. Chi è questa ragazza?", Answer: "Francesca Pilara" },
        { Question: "Parli con francesca e passate la serata assieme. vi conoscete meglio e, quando sarà il momento di sedersi a tavola, decidete di sedervi uno a fianco all’altro. Durante la cena verrà qualcuno a interromperti per palare in privato. ti alzi e senti cosa ha da dire questa persona. chi è?", Answer: "Mattia Pressiani" },
        { Question: "STAI ATTENTO AL NOME DEL MEDICINALE CHE TI MOSTRERÀ MATTIA. sei preoccupato. Mattia ti sembra delirare. Ti vai di nuovo a sedere a tavola e riferisci a Francesca. Le dici solamente di essere in pensiero per Mattia che ti sembra delirare. non racconterai a lei tutta la storia. Dopo poco ti ricordi che mattia ti ha detto che è presente un suo collega alla cena, chi?", Answer: "Tommaso Domeniconi" },
        { Question: "Rimugini per qualche istante e poi ti alzi per parlare una attimo con tommaso. gli chiedi di parlare in privato e gli chiedi gli effetti della medicina che ti ha mostrato mattia, quali siano.Ti avrà detto la verita? Torni a sederti a tavola e durante il proseguire della cena salterà fuori un codice preceduto da ##, qual’è?", Answer: "2421" },
        { Question: "Sei impaurito. Hai paura che Mattia abbia combinato un casino.Se raccontassi tutto ci andresti di mezzo anche te e finirebbe la tua carriera e la tua vita cambierebbe. Qualcuno a una certa propone di aprire il telefono di Giuseppe, chi?", Answer: "Giacomo Oralndi" }
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
                Decidi di raccontare tutto; non hai nulla da perdere. Racconta a tutti cosa sai, come conosci Mattia e cosa è successo stasera.
                Cerca di capire cosa sia successo
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

export default LeonardoAntonelli64;