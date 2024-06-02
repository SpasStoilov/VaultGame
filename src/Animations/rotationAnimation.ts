import { assets, currentState, setCurrentState } from "../index.js"
import { gsap } from "../../node_modules/gsap/gsap-core.js";

export async function rotationAnimation(rotationSign:string, offsetValue:number=1):Promise<any>{
    setCurrentState("reset-hand-animation")
    gsap.to(
        assets.handle, 
        {
            rotation: rotationSign + offsetValue*60* (Math.PI / 180)
        }
    )
    return gsap.to(
            assets.handleShadow, 
            {
                rotation: rotationSign + offsetValue*60 * (Math.PI / 180),
                delay:0.03   
            }
        )
}