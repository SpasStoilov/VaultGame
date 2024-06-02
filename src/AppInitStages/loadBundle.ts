import {Assets} from "../../node_modules/pixi.js/dist/pixi.mjs"

export async function loadBundle():Promise<any>{
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