import firebaseConfig from "./utils/firebaseConfig";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, onValue, push, serverTimestamp, off } from "firebase/database";
import React, { useState, useEffect } from 'react';
import { getAuth, signInAnonymously } from "firebase/auth";
import './chat.css';



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth();


const Chat = () => {
    const [userInfo, setUserInfo] = useState({});
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    const signInAutomaticaly = async (username) => {
        try {
            const result = await signInAnonymously(auth);
            setUserInfo(result.user);
            console.log(result.user.uid)
        } catch (error) {
            console.error("Error during anonymous sign-in:", error.message);
        }
    };



    useEffect(() => {
        signInAutomaticaly();
        return () => {
            off(ref(db, `messages/${userInfo?.uid}`));
        };
    }, []);

    useEffect(() => {
        onValue(ref(db, `messages/${userInfo?.uid}`), (snapshot) => {
            setMessages(Object.values(snapshot.val() || []))
        });

    }, [userInfo]);


    const validateInput = async () => {
        if (message.trim()) {
            try {
                const send = await set(push(ref(db, `messages/${userInfo.uid}`)), {
                    text: message.trim(),
                    timestamp: serverTimestamp(),
                    author: userInfo.uid
                });
                setMessage('');

            } catch (error) {
                console.error("Error during send message:", error.message);
            }
        }
    };

    // Fonction pour gérer la touche "Entrée"
    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            validateInput();
        }
    };
    return (

        <div className="chat-container">
            <div className="chat-header">
                <h2>Messagerie direct</h2>
            </div>
            <div className="chat-messages">
                {messages.map((m) => (
                    <div
                        key={m.timestamp}
                        className={`message ${message.author === userInfo.uid ? 'user-message' : 'other-message'}`}
                    >
                        {m.text}
                    </div>
                ))}
            </div>
            <div className="chat-input">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Écrire un message..."
                />
                <button onClick={validateInput}>Envoyer</button>
            </div>
        </div>
    );
};

export default Chat;
