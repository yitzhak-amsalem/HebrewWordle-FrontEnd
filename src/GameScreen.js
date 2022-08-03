import React, {useState, useEffect} from "react";
import axios from "axios";
import {PinInput, PinInputField} from '@chakra-ui/react';


function GameScreen(){
    const [resultVision, setResultVision] = useState([]);
    const [guesses, setGuesses] = useState([]);
    const [result, setResult] = useState("");
    const [isWin, setIsWin] = useState(false);
    const [userGuess, setUserGuess] = useState("");
    const [play, setPlay] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(false);
        let vision = [];
        for (let i = 0; i < result.length; i++) {
            if (result[i] === "*") {
                const g = {color: "Chartreuse"}
                vision.push(g);
            } else if (result[i] === "#") {
                const y = {color: "Yellow"}
                vision.push(y);

            } else if (result[i] === "-") {
                const b = {color: "#777474"}
                vision.push(b);
            }
        }
        setResultVision(state => [...state, vision]);
        setGuesses(state => [...state, userGuess]);

        setUserGuess("");
        setPlay(isWin);

    }, [result]);
    const onGuess = () => {
        setIsLoading(true);

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
    }
    return(
        <div style={{textAlign: "center", direction: "rtl"}}>
            <h4>הכנס את הניחוש שלך:</h4>
                <PinInput placeholder='' size='xs' type='alphanumeric'
                          value={userGuess}
                          onChange={(e) => {
                            setUserGuess(e);
                          }}>

                    <PinInputField style={{fontWeight: "bold", width: "40px", height: "40px", textAlign: "center", margin: "3px"}} />
                    <PinInputField style={{fontWeight: "bold", width: "40px", height: "40px", textAlign: "center", margin: "3px"}} />
                    <PinInputField style={{fontWeight: "bold", width: "40px", height: "40px", textAlign: "center", margin: "3px"}} />
                    <PinInputField style={{fontWeight: "bold", width: "40px", height: "40px", textAlign: "center", margin: "3px"}} />
                    <PinInputField style={{fontWeight: "bold", width: "40px", height: "40px", textAlign: "center", margin: "3px"}} />

                </PinInput>
            <br/>
            {
                isLoading ?
                    <div>Loading...</div>
                    :
                    <button class={"button update-button"} disabled={userGuess.length < 5} onClick={onGuess}>נחש!</button>
            }
            <br/>
            {
                resultVision.map((row, i) =>{
                    return(
                        <div>
                        <PinInput placeholder='' size='xs' type='alphanumeric' defaultValue={guesses[i]} value={guesses[i]} >
                            {row.map(res => {
                            return(
                                <PinInputField style={{fontWeight: "bold", width: "40px", height: "40px", border: "2px solid " + res.color, backgroundColor: res.color ,margin: "3px", textAlign: "center"}}/>
                            )
                        })}
                        </PinInput>
                        </div>
                    )
                })
            }
            {
                play &&
                <div>
                    {
                        guesses.length < 6 ?
                            <h2 style={{margin: "5px"}}>ברכות! ניצחת!</h2>
                            :
                            <h2 style={{margin: "5px"}}>יפה, אבל לקח לך זמן...</h2>
                    }
                </div>
            }
        </div>
    )
}
export default GameScreen;