import React, {useState} from "react";
import axios from "axios";
import {PinInput, PinInputField} from '@chakra-ui/react'


function GameScreen(){
    const [resultVision, setResultVision] = useState([]);
    const [guesses, setGuesses] = useState([]);
    const [result, setResult] = useState("");
    const [isWin, setIsWin] = useState(false);
    const [userGuess, setUserGuess] = useState("");
    const [play, setPlay] = useState(false);
    const [onGuess, setOnGuess] = useState(true);

    const updateResult = () => {

        let vision = [];
        for (let i = 0; i < result.length; i++) {
            if (result[i] === "*") {
                const g = {color: "Chartreuse"}
                vision.push(g);
            } else if (result[i] === "#") {
                const y = {color: "Yellow"}
                vision.push(y);

            } else if (result[i] === "-") {
                const b = {color: "Black"}
                vision.push(b);
            }
        }
        setResultVision(state => [...state, vision]);
        setGuesses(state => [...state, userGuess]);

        setUserGuess("");
        setPlay(isWin);
        setOnGuess(true);
    }
    const update = () => {
        axios.get("https://hebrew-wordle.herokuapp.com/guess-and-result",
            {
                params:{
                    userGuess: userGuess
                }
            }).then((res) => {
            const resultString = res.data.resultString;
            const isWinner = res.data.correctGuess;
            setResult(resultString);
            setIsWin(isWinner);
        });
        setOnGuess(false);
    }
    return(
        <div style={{textAlign: "center"}}>
            <h5>:הכנס את הניחוש שלך</h5>
                <PinInput placeholder='' size='xs' type='alphanumeric'
                          value={userGuess}
                          onChange={(e) => {
                            setUserGuess(e);
                          }}>
                    <PinInputField style={{width: "20px", height: "20px", textAlign: "center", margin: "3px"}} />
                    <PinInputField style={{width: "20px", height: "20px", textAlign: "center", margin: "3px"}} />
                    <PinInputField style={{width: "20px", height: "20px", textAlign: "center", margin: "3px"}} />
                    <PinInputField style={{width: "20px", height: "20px", textAlign: "center", margin: "3px"}} />
                    <PinInputField style={{width: "20px", height: "20px", textAlign: "center", margin: "3px"}} />

                </PinInput>
            <br/>
            {
                onGuess?
                    <button class={"button update-button"} disabled={userGuess.length < 5} onClick={update}>Update</button>
                    :
                    <button class={"button guess-button"} onClick={updateResult}>Guess!</button>
            }
            <br/>
            {
                resultVision.map((row, i) =>{
                    return(
                        <div>
                        <PinInput placeholder='' size='xs' type='alphanumeric' defaultValue={guesses[i]}>
                            {row.map(res => {
                            return(
                                <PinInputField style={{width: "20px", height: "20px", border: "2px solid " + res.color ,margin: "3px", textAlign: "center"}}/>
                            )
                        })}
                        </PinInput>
                        </div>
                    )
                })
            }
            {
                play &&
                <h3 style={{margin: "5px"}}>!ברכות! ניצחת</h3>
            }
        </div>
    )
}
export default GameScreen;