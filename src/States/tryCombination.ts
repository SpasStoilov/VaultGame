import { assets, gameVariables } from "../index.js"

export function tryCombination(){
    assets.enterPassButton.visible = false
    gameVariables.tryComb = true
    winManager()
}