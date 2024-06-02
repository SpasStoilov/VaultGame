import { assetScaler } from "../Utils/background.scalar.js"
import { positionBinding } from "../Utils/position.binding.js"
import { assets, gameVariables } from "../index.js"

export function setScaleAndPositions():void{
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

        if (gameVariables.currentState != "win"){
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