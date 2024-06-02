import { assets, gameVariables } from "../index.js"
import { winManager } from "./winManager.js"

export function tryCombination(){
    assets.enterPassButton.visible = false
    gameVariables.tryComb = true
    winManager()
}