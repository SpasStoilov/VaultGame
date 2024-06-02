var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { gameVariables } from "../index.js";
import { rotationAnimation } from "./rotationAnimation.js";
export function resetHandleAnimation() {
    return __awaiter(this, void 0, void 0, function* () {
        gameVariables.currentState = "reset-hand-animation";
        for (let _ of Array.from({ length: 6 }, (_, i) => i)) {
            const rotationSign = ["+=", "-="][Math.floor(Math.random() * 2)];
            const offsetValue = Array.from({ length: 10 }, (_, i) => i * i)[Math.floor(Math.random() * 10)];
            yield rotationAnimation(rotationSign, offsetValue);
        }
    });
}
