var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { assets, gameVariables } from "../index.js";
import { gsap } from "../../node_modules/gsap/gsap-core.js";
export function rotationAnimation(rotationSign_1) {
    return __awaiter(this, arguments, void 0, function* (rotationSign, offsetValue = 1) {
        gameVariables.currentState = "reset-hand-animation";
        gsap.to(assets.handle, {
            rotation: rotationSign + offsetValue * 60 * (Math.PI / 180)
        });
        return gsap.to(assets.handleShadow, {
            rotation: rotationSign + offsetValue * 60 * (Math.PI / 180),
            delay: 0.03
        });
    });
}
