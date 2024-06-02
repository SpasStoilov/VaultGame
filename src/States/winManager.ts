import { closeVaultDoor } from "../Animations/closeVaultDoor.js";
import { openVaultDoor } from "../Animations/openVaultDoor.js";
import { resetHandleAnimation } from "../Animations/resetHandleAnimation.js";
import { shiningGold } from "../Animations/shiningGold.js";
import { gameVariables } from "../index.js";
import { setSecretVaultPass } from "./setSecretVaultPass.js";

export async function winManager(){
    console.log("Win Manager!!!");

    if (gameVariables.userCombination == gameVariables.secretVaultComb){
        await openVaultDoor()
        await shiningGold()
        await closeVaultDoor()
    }

    await resetHandleAnimation()
    setSecretVaultPass()
}