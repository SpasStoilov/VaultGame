import { assets, gameVariables } from "../index.js";
export function setSecretVaultPass() {
    gameVariables.currentState = "set-secret-pass";
    const directions = [">", "<"];
    const valuesPerRotation = Array.from({ length: 9 }, (_, i) => i + 1);
    gameVariables.secretVaultComb = Array.from({ length: 3 }, (_, i) => {
        let value = valuesPerRotation[Math.floor(Math.random() * (valuesPerRotation.length))];
        let direction = directions[Math.floor(Math.random() * (directions.length))];
        let part = Array.from({ length: value }, (_, i) => direction);
        return part.join("");
    }).join("");
    assets.enterPassButton.visible = true;
    gameVariables.tryComb = false;
    gameVariables.userCombination = "";
    console.log("Secret Pass:", gameVariables.secretVaultComb);
}
