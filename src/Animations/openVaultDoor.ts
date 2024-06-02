import { assets, gameVariables } from "../index.js"
import { gsap } from "../../node_modules/gsap/gsap-core.js";

export async function openVaultDoor():Promise<any>{
    gameVariables.currentState = "win"
    gsap.to(
        [assets.door, assets.handle, assets.handleShadow], 
        {
            duration: 0.3,
            alpha: 0
        }
    )
    return gsap.to(
            assets.doorOpen, 
            {
                alpha: 1,
                delay: 0.03   
            }
        )
}