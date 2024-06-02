import { assets } from "../index.js"
import { gsap } from "../../node_modules/gsap/gsap-core.js";

export async function shiningGold():Promise<void>{
   
    for (let blink of assets.blinkContainer){
        await gsap.to(
            blink, 
            {
                duration:0.5,
                alpha: 1
            }
        )
        await gsap.to(
            blink, 
            {
                duration:0.5,
                alpha: 0
            }
        )
    }
}