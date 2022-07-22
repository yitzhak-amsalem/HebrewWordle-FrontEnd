import React, {useState} from "react";
import axios from "axios";
import {HStack, PinInput, PinInputField} from '@chakra-ui/react'


function GameScreen(){
    const [resultVision, setResultVision] = useState([]);
    const [guesses, setGuesses] = useState([]);
    const [result, setResult] = useState("");
    const [userGuess, setUserGuess] = useState("");
    const [play, setPlay] = useState(false);

    const updateResult = () => {

        let vision = [];
        for (let i = 0; i < result.length; i++) {
            if (result[i] === "*") {
                const g = {Color: "green"}
                vision.push(g);
            } else if (result[i] === "#") {
                const y = {Color: "yellow"}
                vision.push(y);

            } else if (result[i] === "-") {
                const b = {Color: "black"}
                vision.push(b);
            }
        }
        setResultVision(state => [...state, vision]);
        setGuesses(state => [...state, userGuess]);

        setUserGuess("");
        setPlay(true);
    }
    const update = () => {
        axios.get("https://hebrew-wordle.herokuapp.com/guess-and-result",
            {
                params:{
                    userGuess: userGuess
                }
            }).then((res) => {
            const resultString = res.data.resultString;
            setResult(resultString);
        });
    }

    return(
        <div>
            <h3>:הכנס את הניחוש שלך</h3>
            <HStack>
                <PinInput onComplete={update} placeholder='' size='xs' type='alphanumeric' value={userGuess} onChange={(e) => {
                    setUserGuess(e);
                }}>
                    <PinInputField style={{width: "20px", height: "20px"}} />
                    <PinInputField style={{width: "20px", height: "20px"}} />
                    <PinInputField style={{width: "20px", height: "20px"}} />
                    <PinInputField style={{width: "20px", height: "20px"}} />
                    <PinInputField style={{width: "20px", height: "20px"}} />

                </PinInput>
            </HStack>
            <button disabled={userGuess === ''} onClick={update}>Update</button>
            <button disabled={userGuess === ''} onClick={updateResult}>Guess!</button>
            <br/>
            <input value={result} />
            <br/>
            {
                play &&
                resultVision.map((row, i) =>{
                    return(
                        <div>
                        <PinInput placeholder='' size='xs' type='alphanumeric' defaultValue={guesses[i]}>
                            {row.map(res => {
                            return(
                                <PinInputField style={{width: "20px", height: "20px", borderColor: res.Color, borderTopColor: res.Color}}/>
                            )
                        })}
                        </PinInput>
                        </div>
                    )
                })
            }
            <br/>


        </div>

    )



}
export default GameScreen;