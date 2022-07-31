import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {PinInput, PinInputField} from '@chakra-ui/react'
import "./buttons.css"

function FirstScreen(){
    const [word, setWord] = useState("");
    const navigate = useNavigate();
    const onPlay = () => {
        axios.get("https://hebrew-wordle.herokuapp.com/set-word" ,
            {
                params:{
                    userWord: word
                }
            });
        navigate('/gameScreen');
    }
    return(
        <div style={{textAlign: "center", direction: "rtl"}}>
            <h5>הכנס מילה:</h5>
                <PinInput placeholder='' size='xs' type='alphanumeric' value={word} onChange={(e) => {
                    setWord(e);
                }} >
                    <PinInputField style={{fontWeight: "bold", width: "40px", height: "40px", textAlign: "center", margin: "3px"}} />
                    <PinInputField style={{fontWeight: "bold", width: "40px", height: "40px", textAlign: "center", margin: "3px"}} />
                    <PinInputField style={{fontWeight: "bold", width: "40px", height: "40px", textAlign: "center", margin: "3px"}} />
                    <PinInputField style={{fontWeight: "bold", width: "40px", height: "40px", textAlign: "center", margin: "3px"}} />
                    <PinInputField style={{fontWeight: "bold", width: "40px", height: "40px", textAlign: "center", margin: "3px"}} />
                </PinInput>
            <br/><br/>
            <button class={"button play-button"} disabled={word.length < 5} onClick={onPlay}>שחק!</button>
        </div>
        )
}

export default FirstScreen;