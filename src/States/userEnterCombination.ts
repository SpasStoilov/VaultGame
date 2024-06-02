import { rotationAnimation } from "../Animations/rotationAnimation.js";
import { assets, gameVariables } from "../index.js";

export async function userEnterCombination(event: { data: any; }){
    if (!gameVariables.tryComb){
        const data = event.data;
        const rotationSign = data.global.x > assets!.handle.x ? "+=" :"-="
        gameVariables.userCombination += rotationSign == "-=" ? "<" : ">"
        await rotationAnimation(rotationSign)
    }
}