import { tryCombination } from "../States/tryCombination.js";
import { userEnterCombination } from "../States/userEnterCombination.js";
import { assets } from "../index.js";
export function setEvents() {
    assets.handle.on('click', userEnterCombination);
    assets.handle.eventMode = 'static';
    assets.enterPassButton.on('click', tryCombination);
    assets.enterPassButton.eventMode = 'static';
}
