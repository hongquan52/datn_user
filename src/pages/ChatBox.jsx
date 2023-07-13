// Import the functions you need from the SDKs you need

import { getDatabase, ref, onValue, onChildAdded, set, off } from "firebase/database";
import React from 'react'
import { useEffect, useContext } from "react";
import { useState } from "react";
import { AppContext } from "../Context/AppProvider";
import { Col, Container, Row } from "reactstrap";
import '../styles/chat-box.css'
import avatar from '../assets/images/avatarDefault.jpg'
import avatar1 from '../assets/images/QTNN.jpg'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries



const ChatBox = () => {
    const userID = parseInt(sessionStorage.getItem('userID'));
    const { app } = useContext(AppContext);
    const [content, setContent] = useState();
    const [sendMessageState, setSendMessageState] = useState(false);


    const [messageList, setMessageList] = useState([]);


    const database = getDatabase(app);

    useEffect(() => {
        // Your web app's Firebase configuration
        // For Firebase JS SDK v7.20.0 and later, measurementId is optional


        const fetchChat = ref(database, "chatmessage/");
        //=====================================
        let y = []
        onChildAdded(fetchChat, (snapshot) => {
            const messages = snapshot.val();

            //     const message = `<li class=${messages.userIdFrom === 1 ? "sent" : "receive"
            // }><span>${messages.userIdTo}: </span>${messages.content}</li>`;
            // // append the message on the page
            // document.getElementById("messages").innerHTML += message;

            y.push({
                userIdFrom: messages.userIdFrom,
                userIdTo: messages.userIdTo,
                content: messages.content
            })
            
            let z = y.filter(
                (item) => (item.userIdFrom === userID && item.userIdTo === 3)
                || (item.userIdFrom === 3 && item.userIdTo === userID)
                )
            setMessageList(z);

        })
        off(fetchChat, (snapshot) => {
            const messages = snapshot.val();
            const message = `<li class=${messages.userIdFrom === 1 ? "sent" : "receive"
                }><span>${messages.userIdTo}: </span>${messages.content}</li>`;
            // append the message on the page
            document.getElementById("messages").innerHTML += message;
            console.log("=======================: ", messages.userIdFrom, messages.content);

        })

    }, [sendMessageState])
    useEffect(() => {
        setSendMessageState(!sendMessageState);
        
    }, [])

    function sendMessage(userIdFrom, userIdTo, content) {
        const timestamp = Date.now();

        set(ref(database, 'chatmessage/' + timestamp), {
            userIdFrom: userIdFrom,
            userIdTo: userIdTo,
            content: content,

        });

        setSendMessageState(!sendMessageState);
        setContent('');
    }

    return (
        <section>
            <div>

                <div className="body" id="messages">

                </div>


            </div>
            <Container className="message-container">
                <Row >
                    <Col className="message__title">
                        <img
                            src={avatar}

                        />
                        <h5>Admin</h5>
                    </Col>
                </Row>
                <Row style={{marginBottom : 50, overflowY: 'scroll', height: 400}}>
                    <div>
                        {
                            messageList
                                .map((item) => (
                                    <div className=
                                        "message__item-container"
                                       style={{
                                        flexDirection: item.userIdTo !==  userID? "row" : "row-reverse"
                                        }}  
                                    >
                                        <p
                                            style={{backgroundColor: item.userIdTo !== userID ? "#F9813A" : "grey"}}
                                        >{item.content}</p>
                                        {
                                           item.userIdTo === userID ?
                                           <img
                                               src={avatar}
                                               className={'marginRight' }
                                           />
                                           :
                                           null
                                        }
                                    </div>
                                ))
                        }

                    </div>
                </Row>
                <Row >
                    <Col className="message__footer">
                        <input
                            onChange={(e) => setContent(e.target.value)}
                            style={{ width: 'inherit' }}
                            value={content}
                        />
                        <button onClick={() => sendMessage(userID, 3, content)} >SEND</button>
                    </Col>
                   
                </Row>
            </Container>
        </section>
    )
}

export default ChatBox

