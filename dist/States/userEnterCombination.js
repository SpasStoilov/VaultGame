var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { rotationAnimation } from "../Animations/rotationAnimation.js";
import { assets, gameVariables } from "../index.js";
export function userEnterCombination(event) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!gameVariables.tryComb) {
            const data = event.data;
            const rotationSign = data.global.x > assets.handle.x ? "+=" : "-=";
            gameVariables.userCombination += rotationSign == "-=" ? "<" : ">";
            yield rotationAnimation(rotationSign);
        }
    });
}
