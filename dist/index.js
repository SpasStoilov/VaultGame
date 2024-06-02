var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { resetLibGlobalScopeVariables } from './Utils/global.vars.js';
import { assetScaler } from './Utils/background.scalar.js';
import { positionBinding } from './Utils/position.binding.js';
import { Application, Assets, Sprite } from "../node_modules/pixi.js/dist/pixi.mjs";
import { gsap } from "../node_modules/gsap/gsap-core.js";
// Screen states:
export let initialWindowWidth;
export let initialWindowHeight;
export let currentWindowWidth;
export let currentWindowHeight;
export let prevWindowWidth;
export let prevWindowHeight;
export let howMuchWindowWidthChange;
export let howMuchWindowHeightChange;
export let totalWindowWidthChange;
export let totalWindowHeightChange;
export let worldRation;
export let worldArea;
// Game Vars:
export let APP;
export let assets;
export let secretVaultComb = "";
export let userCombination = "";
export let tryComb = false;
export let currentState = "";
// Animations:
function openVaultDoor() {
    return __awaiter(this, void 0, void 0, function* () {
        currentState = "win";
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
function closeVaultDoor() {
    return __awaiter(this, void 0, void 0, function* () {
        gsap.to(assets.doorOpen, {
            alpha: 0,
            duration: 0.03
        });
        return gsap.to([assets.door, assets.handle, assets.handleShadow], {
            delay: 0.03,
            alpha: 1
        });
    });
}
function shiningGold() {
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
function resetHandleAnimation() {
    return __awaiter(this, void 0, void 0, function* () {
        currentState = "reset-hand-animation";
        for (let _ of Array.from({ length: 6 }, (_, i) => i)) {
            const rotationSign = ["+=", "-="][Math.floor(Math.random() * 2)];
            const offsetValue = Array.from({ length: 10 }, (_, i) => i * i)[Math.floor(Math.random() * 10)];
            yield rotationAnimation(rotationSign, offsetValue);
        }
    });
}
function rotationAnimation(rotationSign_1) {
    return __awaiter(this, arguments, void 0, function* (rotationSign, offsetValue = 1) {
        currentState = "rotation-animation";
        gsap.to(assets.handle, {
            rotation: rotationSign + offsetValue * 60 * (Math.PI / 180)
        });
        return gsap.to(assets.handleShadow, {
            rotation: rotationSign + offsetValue * 60 * (Math.PI / 180),
            delay: 0.03
        });
    });
}
//States
function setSecretVaultPass() {
    currentState = "set-secret-pass";
    const directions = [">", "<"];
    const valuesPerRotation = Array.from({ length: 9 }, (_, i) => i + 1);
    secretVaultComb = Array.from({ length: 3 }, (_, i) => {
        let value = valuesPerRotation[Math.floor(Math.random() * (valuesPerRotation.length))];
        let direction = directions[Math.floor(Math.random() * (directions.length))];
        let part = Array.from({ length: value }, (_, i) => direction);
        return part.join("");
    }).join("");
    assets.enterPassButton.visible = true;
    tryComb = false;
    userCombination = "";
    console.log("Secret Pass:", secretVaultComb);
}
function userEnterCombination(event) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!tryComb) {
            const data = event.data;
            const rotationSign = data.global.x > assets.handle.x ? "+=" : "-=";
            userCombination += rotationSign == "-=" ? "<" : ">";
            yield rotationAnimation(rotationSign);
        }
    });
}
function tryCombination() {
    assets.enterPassButton.visible = false;
    tryComb = true;
    winManager();
}
function winManager() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Win Manager!!!");
        if (userCombination == secretVaultComb) {
            yield openVaultDoor();
            yield shiningGold();
            yield closeVaultDoor();
        }
        yield openVaultDoor();
        yield shiningGold();
        yield closeVaultDoor();
        yield resetHandleAnimation();
        setSecretVaultPass();
    });
}
// App init Stages:
function loadBundel() {
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
function makeAssets(textures) {
    let background = Sprite.from(textures.background);
    let door = Sprite.from(textures.door);
    let doorOpen = Sprite.from(textures.doorOpen);
    let handle = Sprite.from(textures.handle);
    let handleShadow = Sprite.from(textures.handleShadow);
    let enterPassButton = Sprite.from(textures.enterPassButton);
    background.name = "background";
    door.name = "door";
    doorOpen.name = "doorOpen";
    handle.name = "handle";
    handleShadow.name = "handleShadow";
    enterPassButton.name = "enterPassButton";
    let blinkContainer = [];
    for (let i of Array.from({ length: 4 }, (_, i) => i)) {
        let blink = Sprite.from(textures.blink);
        blink.name = `blink-${i}`;
        blinkContainer.push(blink);
    }
    return {
        background,
        blinkContainer,
        door,
        doorOpen,
        handle,
        handleShadow,
        enterPassButton
    };
}
function stageAssets() {
    let { background, blinkContainer, door, doorOpen, handle, handleShadow, enterPassButton } = assets;
    setScaleAndPositions();
    enterPassButton.visible = false;
    APP.stage.addChild(background, doorOpen, door, handleShadow, handle, enterPassButton, ...blinkContainer);
}
function setEvents() {
    assets.handle.on('click', userEnterCombination);
    assets.handle.eventMode = 'static';
    assets.enterPassButton.on('click', tryCombination);
    assets.enterPassButton.eventMode = 'static';
}
function setScaleAndPositions() {
    let globalScale = 0.8;
    let { background, blinkContainer, door, doorOpen, handle, handleShadow, enterPassButton } = assets;
    assetScaler({ x: 0.97, y: 0.97 }, background);
    positionBinding({ x: 0.5, y: 0.5 }, background);
    assetScaler({ x: 0.05, y: 0.05 }, enterPassButton);
    positionBinding({ x: 0.5, y: 0.85 }, enterPassButton);
    assetScaler({ x: 0.3, y: 0.3 }, door, { width: background.width, height: background.height });
    door.position.set(window.innerWidth / 2, window.innerHeight / 2);
    door.anchor.set(0.46, 0.52);
    assetScaler({ x: 0.2, y: 0.2 }, doorOpen, { width: background.width, height: background.height });
    doorOpen.position.set(door.x + (door.width / 2) - 60, door.y);
    doorOpen.anchor.set(0, 0.5);
    assetScaler({ x: 0.1, y: 0.1 }, handle, { width: background.width, height: background.height });
    handle.position.set(window.innerWidth / 2, window.innerHeight / 2.05);
    handle.anchor = 0.5;
    assetScaler({ x: 0.1, y: 0.1 }, handleShadow, { width: background.width, height: background.height });
    handleShadow.position.set(window.innerWidth / 2, window.innerHeight / 2);
    handleShadow.anchor = 0.5;
    let diviations = [
        [window.innerWidth / 2, 0.4],
        [0.8, 0.4], [0.6, 0.4], [0.7, 0.4]
    ];
    for (let i = 0; i < diviations.length; i++) {
        let [divX, divY] = diviations[i];
        let blink = blinkContainer[i];
        if (currentState != "win") {
            doorOpen.alpha = 0;
            blink.alpha = 0;
        }
        blink.position.set(window.innerWidth / (1.7 + 0.27 * i), window.innerHeight / (1.7));
        blink.anchor = 0.5;
    }
}
/**
 * Aplication resizer
 */
export function onResizeView() {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;
    /**
     * Set states
     */
    howMuchWindowWidthChange = newWidth - currentWindowWidth;
    howMuchWindowHeightChange = newHeight - currentWindowHeight;
    totalWindowWidthChange = initialWindowWidth - newWidth;
    totalWindowHeightChange = initialWindowHeight - newHeight;
    prevWindowWidth = currentWindowWidth;
    prevWindowHeight = currentWindowHeight;
    currentWindowWidth = newWidth;
    currentWindowHeight = newHeight;
    setScaleAndPositions();
}
/**
 *  Application starter
 */
export function START_APP() {
    return __awaiter(this, void 0, void 0, function* () {
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
        worldRation = window.innerWidth / window.innerHeight;
        worldArea = window.innerWidth * window.innerHeight;
        resetLibGlobalScopeVariables();
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
        let textures = yield loadBundel();
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
