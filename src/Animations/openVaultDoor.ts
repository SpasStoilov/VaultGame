import { assets, setCurrentState } from "../index.js"
import { gsap } from "../../node_modules/gsap/gsap-core.js";

async function openVaultDoor():Promise<any>{
    setCurrentState("win")
    gsap.to(
        [assets.door, assets.handle, assets.handleShadow], 
        {
            duration:0.3,
            alpha: 0
        }
    )
    return gsap.to(
            assets.doorOpen, 
            {
                alpha: 1,
                delay:0.03   
            }
        )
}