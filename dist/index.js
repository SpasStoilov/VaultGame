var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Application } from "../node_modules/pixi.js/dist/pixi.mjs";
import { setSecretVaultPass } from './States/setSecretVaultPass.js';
import { makeAssets } from './AppInitStages/makeAssets.js';
import { loadBundle } from './AppInitStages/loadBundle.js';
import { stageAssets } from './AppInitStages/stageAssets.js';
import { setEvents } from './AppInitStages/events.js';
import { onResizeView } from './Utils/app.resize.js';
// Game Vars:
export let APP;
export let assets;
export let secretVaultComb = "";
export let userCombination = "";
export let tryComb = false;
export let currentState = "";
export let gameVariables = {
    secretVaultComb,
    userCombination,
    tryComb,
    currentState,
};
/**
 *  Application starter
 */
export function START_APP() {
    return __awaiter(this, void 0, void 0, function* () {
        /** ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
         *              Create Application
         * -----------------------------------------------
         */
        let app = new Application();
        yield app.init({
            background: '#1099bb',
            resizeTo: window
        });
        app.canvas.id = "game-world";
        APP = app;
        /** ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
         *          Load MANIFEST with all bundles
         * -----------------------------------------------
         */
        let textures = yield loadBundle();
        assets = makeAssets(textures);
        /** ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
         *                   STAGE ASSETS
         * -----------------------------------------------
         */
        stageAssets();
        setEvents();
        /** ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
         *           Keep track of screen size
         * -----------------------------------------------
         */
        window.removeEventListener('resize', onResizeView);
        window.addEventListener('resize', onResizeView);
        onResizeView();
        /** ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
         *        Dock Application to index.html
         * -----------------------------------------------
         */
        document.body.appendChild(app.canvas);
        /** ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
         *                INIT GAME
         * -----------------------------------------------
         */
        setSecretVaultPass();
    });
}
START_APP();
