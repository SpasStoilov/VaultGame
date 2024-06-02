import { APP, assets } from "../index.js";
import { setScaleAndPositions } from "./setScaleAndPositions.js";
export function stageAssets() {
    let { background, blinkContainer, door, doorOpen, handle, handleShadow, enterPassButton } = assets;
    setScaleAndPositions();
    enterPassButton.visible = false;
    APP.stage.addChild(background, doorOpen, door, handleShadow, handle, enterPassButton, ...blinkContainer);
}
