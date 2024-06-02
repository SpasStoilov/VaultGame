import {Sprite, Texture, TextureSourceLike} from "../../node_modules/pixi.js/dist/pixi.mjs"
import { assetBulk } from "../index.js"

export function makeAssets(textures:{[key:string]: Texture | TextureSourceLike}): assetBulk{
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