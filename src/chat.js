import firebaseConfig from "./utils/firebaseConfig";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue, push, serverTimestamp, off } from "firebase/database";
import React, { useState, useEffect, useRef } from 'react';
import { getAuth, signInAnonymously } from "firebase/auth";
import './chat.css';
import spam from './assets/images/spam.png';
import notificationSound from './assets/sounds/new-notification.mp3';
import { MdOutlineMessage } from "react-icons/md";
import Fab from '@mui/material/Fab';
import IconButton from '@mui/material/IconButton';
import { createTheme } from '@mui/material';
import { IoIosClose } from "react-icons/io";
import { IoMdSend } from "react-icons/io";
import { IoIosNotifications } from "react-icons/io";

let isBlur = false;
let originalFavicon = document.querySelector("link[rel~='icon']").href;
let blink = false;
const audio = new Audio(notificationSound);
let notificationAsSupported = false



function setFavicon(iconURL) {
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        document.head.appendChild(link);
    }
    link.href = iconURL;
}

function startBlinkingFavicon() {
    if (isBlur) {
        setFavicon(blink ? spam : originalFavicon); // Alterne entre deux icônes
        blink = !blink;
        setTimeout(startBlinkingFavicon, 1500);
    } else {
        setFavicon(originalFavicon);
    }
}

function scrollMessage(message) {
    let index = 0;
    const maxLength = 20;
    updateMessage();
    function updateMessage() {
        document.title = message.substring(index, index + maxLength);

        if (message.length > 9 && isBlur) {
            setTimeout(updateMessage, index === 0 ? 2000 : 100);
        }
        index = (index + 1) % message.length;
    }
}



const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth();
let requestInProgress = false;


const Chat = ({ openChat, setOpenChat }) => {
    const [userInfo, setUserInfo] = useState({});
    const [message, setMessage] = useState("");
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [messagesRecovered, setMessagesRecovered] = useState(false);

    const messageEndRef = useRef(null);

    const signInAutomaticaly = async (username) => {
        try {
            const result = await signInAnonymously(auth);
            setUserInfo(result.user);
        } catch (error) {
            console.error("Error during anonymous sign-in:", error.message);
        }
    };


    const onBlur = () => {
        isBlur = true;

    };

    const onFocus = () => {
        isBlur = false;
        document.title = "CV - Gwenolé Castellier";
        setTimeout(() => {
            if (messageEndRef.current) {
                messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
            }
        }, 300)

    };

    useEffect(() => {
        window.addEventListener("blur", onBlur);

        window.addEventListener("focus", onFocus);
        signInAutomaticaly();
        if ("Notification" in window) {
            notificationAsSupported = true;

        } else {
            console.log("Les notifications ne sont pas supportées par ce navigateur.");
        }
        return () => {
            off(ref(db, `messages/${userInfo?.uid}`));
            window.removeEventListener("blur", onBlur);
            window.removeEventListener("focus", onFocus);
        };

    }, []);

    useEffect(() => {
        if (userInfo.uid) {
            onValue(ref(db, `messages/${userInfo?.uid}`), (snapshot) => {
                setMessages(Object.values(snapshot.val() || []));
                setMessagesRecovered(true);

            });
        }

    }, [userInfo]);

    useEffect(() => {
        if (openChat) {
            setOpen(true)
        } else {
            setOpen(false)
        }

    }, [openChat]);

    useEffect(() => {
        if (messageEndRef.current) {
            messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [open]);

    useEffect(() => {
        if (messageEndRef.current) {
            messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
        if (isBlur) {
            scrollMessage('Gwenolé vous a répondu : ' + messages[messages.length - 1].text);
            startBlinkingFavicon();
            if (Notification.permission === "granted") {
                new Notification("Gwenolé vous a répondu :", {
                    body: messages[messages.length - 1].text,
                    icon: spam, // Chemin vers une icône
                });
            } else {
                audio.play().catch(error => console.log("Erreur de lecture :", error));
            }
        }

    }, [messages]);

    useEffect(() => {
        setTimeout(async () => {
            if (messagesRecovered && messages.length === 0 && userInfo !== {} && !requestInProgress) {
                localStorage.setItem('areldyVisited', true);
                setOpen(true);
                try {
                    requestInProgress = true;
                    await set(push(ref(db, `messages/${userInfo.uid}`)), {
                        text: "Bonjour, merci d'avoir pris le temps de consulter mon CV ! Si vous avez des questions, n'hésitez pas à m'envoyer un message via ce canal. Il s'agit d'une messagerie instantanée que j'ai développée pour reçevoir les messages directement sur mon téléphone !",
                        timestamp: serverTimestamp(),
                        author: 'lehY3xjQYKa5ezjQcTcwAWVxY3i2'
                    });
                    requestInProgress = false;
                } catch (error) {
                    requestInProgress = false;
                    console.log('error', error)
                }

            }

        }, 5000)
    }, [userInfo, messages])

    const requestPermission = () => {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                console.log("Permission accordée !");
            } else if (permission === "denied") {
                console.log("Permission refusée.");
            } else {
                console.log("Permission fermée ou non décidée.");
            }
        });
    }


    const validateInput = async () => {
        if (message.trim()) {
            try {
                await set(push(ref(db, `messages/${userInfo.uid}`)), {
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
        <div>
            {open ? <div className="chat-container">
                <div className="chat-header">
                    {Notification.permission !== "granted" &&
                        <IconButton className="bell" aria-label="close" color="inherit" onClick={requestPermission}>
                            <IoIosNotifications size={"1.4em"} />
                        </IconButton>
                    }
                    <div className="headerChat">Envoyez-moi un message</div>
                    <IconButton aria-label="close" color="inherit" onClick={() => { setOpen(false); setOpenChat(false) }}>
                        <IoIosClose size={"1.8em"} />
                    </IconButton>
                </div>
                <div className="chat-messages" >
                    {messages.map((m) => (

                        <div key={m.timestamp}
                            className={`message ${m.author === userInfo.uid ? 'user-message' : 'other-message'}`}>
                            <p className="text">{m.text}</p>
                        </div>
                    ))}
                    <div ref={messageEndRef} />
                </div>
                <div className="chat-input">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Écrire un message..."
                    />
                    <IconButton aria-label="close" color="primary" onClick={validateInput} disabled={message.length === 0}>
                        <IoMdSend size={"1.5em"} color="#006599" />
                    </IconButton>
                </div>
            </div>
                :

                <Fab aria-label="add" onClick={() => setOpen(true)}>
                    <MdOutlineMessage size="1.7em" />
                </Fab>}
        </div>
    );
};

export default Chat;
