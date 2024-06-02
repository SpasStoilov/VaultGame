import { setScaleAndPositions } from "../AppInitStages/setScaleAndPositions";

// Screen states:
export let initialWindowWidth:number = window.innerWidth;
export let initialWindowHeight:number = window.innerHeight;
export let currentWindowWidth:number= window.innerWidth;
export let currentWindowHeight:number = window.innerHeight;
export let prevWindowWidth:number = window.innerWidth;
export let prevWindowHeight:number = window.innerHeight;
export let howMuchWindowWidthChange:number = 0;
export let howMuchWindowHeightChange:number = 0;
export let totalWindowWidthChange:number = 0;
export let totalWindowHeightChange:number = 0;
export let worldRation:number = window.innerWidth / window.innerHeight
export let worldArea:number = window.innerWidth * window.innerHeight

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