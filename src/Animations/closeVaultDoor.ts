import { assets } from "../index.js"
import { gsap } from "../../node_modules/gsap/gsap-core.js";

export async function closeVaultDoor():Promise<any>{
    gsap.to(
        assets.doorOpen, 
        {
            alpha: 0,
            duration: 0.03   
        }
    )

    return gsap.to(
        [assets.door, assets.handle, assets.handleShadow], 
        {
            delay: 0.03,
            alpha: 1
        }
    )
}