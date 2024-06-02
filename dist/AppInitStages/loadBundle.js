var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Assets } from "../../node_modules/pixi.js/dist/pixi.mjs";
export function loadBundle() {
    return __awaiter(this, void 0, void 0, function* () {
        Assets.addBundle('allAssets', {
            background: "./assets/bg.png",
            blink: "./assets/blink.png",
            door: "./assets/door.png",
            doorOpen: "./assets/doorOpen.png",
            handle: "./assets/handle.png",
            handleShadow: "./assets/handleShadow.png",
            enterPassButton: "./assets/enter-pass.png"
        });
        const t = yield Assets.loadBundle('allAssets');
        return t;
    });
}
