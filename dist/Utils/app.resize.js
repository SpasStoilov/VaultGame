import { setScaleAndPositions } from "../AppInitStages/setScaleAndPositions.js";
// Screen states:
export let initialWindowWidth = window.innerWidth;
export let initialWindowHeight = window.innerHeight;
export let currentWindowWidth = window.innerWidth;
export let currentWindowHeight = window.innerHeight;
export let prevWindowWidth = window.innerWidth;
export let prevWindowHeight = window.innerHeight;
export let howMuchWindowWidthChange = 0;
export let howMuchWindowHeightChange = 0;
export let totalWindowWidthChange = 0;
export let totalWindowHeightChange = 0;
export let worldRation = window.innerWidth / window.innerHeight;
export let worldArea = window.innerWidth * window.innerHeight;
export let assetScalerRecord = {};
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
