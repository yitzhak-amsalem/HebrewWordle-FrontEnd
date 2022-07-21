import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {HStack, PinInput, PinInputField} from '@chakra-ui/react'

function FirstScreen(){
    const [word, setWord] = useState("");
    const navigate = useNavigate();
    const onPlay = () => {
        axios.get("http://localhost:8989/set-word",
            {
                params:{
                    userWord: word
                }
            }).then((res) => {
        });
        navigate('/gameScreen');
    }
    return(
        <div>
            <h3>:הכנס מילה</h3>
            <HStack>
                <PinInput placeholder='' size='xs' type='alphanumeric' value={word} onChange={(e) => {
                    setWord(e);
                }} >
                    <PinInputField style={{width: "20px", height: "20px"}} />
                    <PinInputField style={{width: "20px", height: "20px"}} />
                    <PinInputField style={{width: "20px", height: "20px"}} />
                    <PinInputField style={{width: "20px", height: "20px"}} />
                    <PinInputField style={{width: "20px", height: "20px"}} />
                </PinInput>
            </HStack>
            <input value={word}/>
            <br/>
            <button disabled={word === ''} onClick={onPlay}>שחק!</button>
        </div>
        )
}

export default FirstScreen;