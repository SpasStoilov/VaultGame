import { currentState, setCurrentState } from "../index.js"
import { rotationAnimation } from "./rotationAnimation.js"

async function resetHandleAnimation():Promise<void>{
    setCurrentState("reset-hand-animation")
    for (let _ of Array.from({ length: 6 }, (_, i) => i)){
        const rotationSign = ["+=", "-="][Math.floor(Math.random()*2)]
        const offsetValue =  Array.from({ length: 10 }, (_, i) => i*i)[Math.floor(Math.random()*10)]
        await rotationAnimation(rotationSign, offsetValue)
    }
}