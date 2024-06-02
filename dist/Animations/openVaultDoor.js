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
export function openVaultDoor() {
    return __awaiter(this, void 0, void 0, function* () {
        gameVariables.currentState = "win";
        gsap.to([assets.door, assets.handle, assets.handleShadow], {
            duration: 0.3,
            alpha: 0
        });
        return gsap.to(assets.doorOpen, {
            alpha: 1,
            delay: 0.03
        });
    });
}
