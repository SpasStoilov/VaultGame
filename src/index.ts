import { resetLibGlobalScopeVariables } from './Utils/global.vars.js';
import { assetScaler } from './Utils/background.scalar.js';
import { positionBinding } from './Utils/position.binding.js';
import { Application, Assets, Sprite, Texture, TextureSourceLike } from "../node_modules/pixi.js/dist/pixi.mjs"


// Screen states:
export let initialWindowWidth!:number;
export let initialWindowHeight!:number;
export let currentWindowWidth!:number;
export let currentWindowHeight!:number;
export let prevWindowWidth!:number;
export let prevWindowHeight!:number;
export let howMuchWindowWidthChange!:number;
export let howMuchWindowHeightChange!:number;
export let totalWindowWidthChange!:number;
export let totalWindowHeightChange!:number;
export let worldRation!:number;
export let worldArea!:number;

// Types:
type assetBulk = {
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

// App init Stages:
async function loadBundel():Promise<any>{
    Assets.addBundle(
        'allAssets', {
            background:"./assets/bg.png",
            blink:"./assets/blink.png",
            door:"./assets/door.png",
            doorOpen:"./assets/doorOpen.png",
            handle:"./assets/handle.png",
            handleShadow:"./assets/handleShadow.png",
            enterPassButton:"./assets/enter-pass.png"
        }
    )
    const t = await Assets.loadBundle('allAssets')
    return t
}
function makeAssets(textures:{[key:string]: Texture | TextureSourceLike}): assetBulk{
    let background = Sprite.from(textures.background)
    let door = Sprite.from(textures.door)
    let doorOpen = Sprite.from(textures.doorOpen)
    let handle = Sprite.from(textures.handle)
    let handleShadow = Sprite.from(textures.handleShadow)
    let enterPassButton = Sprite.from(textures.enterPassButton)

    background.name = "background"
    door.name= "door"
    doorOpen.name = "doorOpen"
    handle.name = "handle"
    handleShadow.name = "handleShadow"
    enterPassButton.name = "enterPassButton"

    let blinkContainer = []
    for (let i of Array.from({ length: 4 }, (_, i) => i)){
        let blink = Sprite.from(textures.blink)
        blink.name = `blink-${i}`
        blinkContainer.push(blink)
    }

    return {
        background,
        blinkContainer,
        door,
        doorOpen,
        handle,
        handleShadow,
        enterPassButton
    }
}
function stageAssets():void{
    let {
        background,
        blinkContainer,
        door,
        doorOpen,
        handle,
        handleShadow,
        enterPassButton
    } = assets

    setScaleAndPositions()
    enterPassButton.visible = false
 
    APP.stage.addChild(
        background,
        doorOpen,
        door,
        handleShadow,
        handle,
        enterPassButton,
        ...blinkContainer,
    )
}
function setEvents():void{
    assets.handle.on('click', userEnterCombination);
    assets.handle.eventMode = 'static';
    
    assets.enterPassButton.on('click', tryCombination);
    assets.enterPassButton.eventMode = 'static';
}
function setScaleAndPositions():void{
    let {
        background,
        blinkContainer,
        door,
        doorOpen,
        handle,
        handleShadow,
        enterPassButton
    } = assets

    assetScaler({x:0.97, y:0.97}, background)
    positionBinding({x:0.5, y:0.5}, background)

    assetScaler({x:0.05, y:0.05}, enterPassButton)
    positionBinding({x:0.5, y:0.85}, enterPassButton)

    assetScaler(
        {x:0.3, y:0.3}, 
        door, 
        {width:background.width, height:background.height}
    )
    door.position.set(
        window.innerWidth/2,
        window.innerHeight/2
    )
    door.anchor.set(0.46, 0.52)

    assetScaler(
        {x:0.2, y:0.2}, 
        doorOpen,
        {width:background.width, height:background.height}
    )
    doorOpen.position.set(
        door.x + (door.width/2)-60,
        door.y
    )
    doorOpen.anchor.set(0, 0.5)

    assetScaler(
        {x:0.1, y:0.1}, 
        handle,
        {width:background.width, height:background.height}
    )
    handle.position.set(
        window.innerWidth/2,
        window.innerHeight/2.05
    )
    handle.anchor = 0.5

    assetScaler(
        {x:0.1, y:0.1},
        handleShadow,
        {width:background.width, height:background.height}
    )
    handleShadow.position.set(
        window.innerWidth/2,
        window.innerHeight/2
    )
    handleShadow.anchor = 0.5

    let diviations = [
        [window.innerWidth/2, 0.4], 
        [0.8, 0.4], [0.6, 0.4], [0.7, 0.4]]

    for (let i =0; i <diviations.length; i++){
        let blink =  blinkContainer[i]

        if (currentState != "win"){
            doorOpen.alpha = 0
            blink.alpha = 0
        }
        blink.position.set(
            window.innerWidth/(1.7 + 0.25*i),
            window.innerHeight/(1.7)
        )
        blink.anchor = 0.5
    }
}

/**
 * Aplication resizer
 */
export function onResizeView(): void{
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;
    /**
     * Set states
     */
    howMuchWindowWidthChange = newWidth - currentWindowWidth!;
    howMuchWindowHeightChange = newHeight - currentWindowHeight!;
    totalWindowWidthChange = initialWindowWidth! - newWidth
    totalWindowHeightChange = initialWindowHeight! - newHeight
    prevWindowWidth = currentWindowWidth;
    prevWindowHeight = currentWindowHeight;
    currentWindowWidth = newWidth;
    currentWindowHeight = newHeight;

    setScaleAndPositions()
}

/**
 *  Application starter
 */
export async function START_APP():Promise<void>{
    /** ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
     *               Set Sreen variables
     * -----------------------------------------------
     */
    initialWindowWidth = window.innerWidth;
    initialWindowHeight = window.innerHeight;
    currentWindowWidth = window.innerWidth;
    currentWindowHeight = window.innerHeight;
    prevWindowWidth = window.innerWidth;
    prevWindowHeight = window.innerHeight;
    howMuchWindowWidthChange = 0;
    howMuchWindowHeightChange = 0;
    totalWindowWidthChange = 0;
    totalWindowHeightChange = 0;
    worldRation = window.innerWidth / window.innerHeight
    worldArea = window.innerWidth * window.innerHeight
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
     *           Keep track of screen size
     * -----------------------------------------------
     */
    window.removeEventListener('resize', onResizeView);
    window.addEventListener('resize', onResizeView);
    onResizeView()
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