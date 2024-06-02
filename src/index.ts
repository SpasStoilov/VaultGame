import { resetLibGlobalScopeVariables } from './Utils/global.vars.js';
import { Application, Sprite} from "../node_modules/pixi.js/dist/pixi.mjs"
import { setSecretVaultPass } from './States/setSecretVaultPass.js';
import { makeAssets } from './AppInitStages/makeAssets.js';
import { loadBundel } from './AppInitStages/loadBundel.js';
import { stageAssets } from './AppInitStages/stageAssets.js';
import { setEvents } from './AppInitStages/events.js';
import { onResizeView } from './Utils/app.resize.js';

// Types:
export type assetBulk = {
    background:Sprite;
    blinkContainer:Sprite[];
    door:Sprite;
    doorOpen:Sprite;
    handle:Sprite;
    handleShadow:Sprite;
    enterPassButton:Sprite;
    blink?:Sprite;
}

// Game Vars:
export let APP: Application;
export let assets!:assetBulk;
export let secretVaultComb:string = ""
export let userCombination:string = ""
export let tryComb:boolean = false
export let currentState:string = ""
export let gameVariables = {
    secretVaultComb,
    userCombination,
    tryComb,
    currentState,
}

/**
 *  Application starter
 */
export async function START_APP():Promise<void>{
    /** ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ 
     *           Keep track of screen size
     * -----------------------------------------------
     */
    window.removeEventListener('resize', onResizeView);
    window.addEventListener('resize', onResizeView);
    onResizeView()
    /** ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
     *               Set Global variables
     * -----------------------------------------------
     */
    resetLibGlobalScopeVariables()
    /** ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
     *              Create Application
     * -----------------------------------------------
     */
    let app = new Application()
    await app.init(
        { 
            background: '#1099bb',
            resizeTo: window
        } 
    );
  
    app.canvas.id = "game-world";
    APP = app
    /** ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
     *          Load MANIFEST with all bundles
     * -----------------------------------------------
     */
    let textures = await loadBundel()
    assets = makeAssets(textures)
    /** ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
     *                   STAGE ASSETS
     * -----------------------------------------------
     */
    stageAssets()
    setEvents()
    /** ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
     *        Dock Application to index.html
     * -----------------------------------------------
     */
    document.body.appendChild(app.canvas)
    /** ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
     *                INIT GAME
     * -----------------------------------------------
     */
    setSecretVaultPass()
}

START_APP()