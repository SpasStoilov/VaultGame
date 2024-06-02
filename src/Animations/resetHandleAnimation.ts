import { gameVariables } from "../index.js"
import { rotationAnimation } from "./rotationAnimation.js"

export async function resetHandleAnimation():Promise<void>{
    gameVariables.currentState = "reset-hand-animation"
    for (let _ of Array.from({ length: 6 }, (_, i) => i)){
        const rotationSign = ["+=", "-="][Math.floor(Math.random()*2)]
        const offsetValue =  Array.from({ length: 10 }, (_, i) => i*i)[Math.floor(Math.random()*10)]
        await rotationAnimation(rotationSign, offsetValue)
    }
}