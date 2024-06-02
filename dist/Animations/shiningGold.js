var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { assets } from "../index.js";
import { gsap } from "../../node_modules/gsap/gsap-core.js";
export function shiningGold() {
    return __awaiter(this, void 0, void 0, function* () {
        for (let blink of assets.blinkContainer) {
            yield gsap.to(blink, {
                duration: 0.5,
                alpha: 1
            });
            yield gsap.to(blink, {
                duration: 0.5,
                alpha: 0
            });
        }
    });
}
