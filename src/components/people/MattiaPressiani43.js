import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function MattiaPressiani43() {
    const navigate = useNavigate();
    const username = "MattiaPressiani43";
    const [savedUser, setSavedUser] = useState("");
    const [level, setLevel] = useState(0);

    const QestAns = [
        { Question: "Come ti chiami?", Answer: "Mattia" }
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
            return <h2>All inizio come prima cosa devi parlare con tony come da storia. Di seguito l’obbiettivo di tony: Ti presenti un po con tutti, quando ti imbatti in Mattia Pressiani, insisti di andare a parlare con lui in privato e andate. Restate a parlare qualche minuto. Qualcuno verrà da voi a fare domande sul vostro passato. Chi? (Giuseppe Bondi)

            poi durante la cena vedi il coso di giornale e vai ancora da tony:
            Parli con francesca e passate la serata assieme. vi conoscete meglio e, quando sarà il momento di sedersi a tavola, decidete di sedervi uno a fianco all’altro. Durante la cena verrà qualcuno a interromperti per palare in privato. ti alzi e senti cosa ha da dire questa persona. chi è? (mattia pressiani) 
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
            <h1>Benvenuto, {savedUser}!</h1>
            <QestAndReply />
        </div>
    );
}

export default MattiaPressiani43;