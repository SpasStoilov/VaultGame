import { currentWindowHeight, currentWindowWidth, assetScalerRecord } from "./app.resize.js";
/**
 * @param {number} scaleOffestValues
 * @returns
 */
export function assetScaler(scaleOffestValues, asset, rel = null) {
    let currentWindowW = currentWindowWidth;
    let currentWindowH = currentWindowHeight;
    if (rel) {
        currentWindowW = rel.width;
        currentWindowH = rel.height;
    }
    /* Options:
    *---------------------------------------------------------------
    * Register original size of the asset
    */
    if (!assetScalerRecord[asset.name]) {
        assetScalerRecord[asset.name] = { w: asset.width, h: asset.height };
    }
    const initWidth = assetScalerRecord[asset.name].w;
    const initHeight = assetScalerRecord[asset.name].h;
    const initSizeRation = initWidth / initHeight;
    /**
     * New values for resize:
     * R - initSizeRation
     * a - initWidth
     * a'- newWidth
     * b - initHeight
     * b'- newHeight
     * A - initArea
     * A'- newArea
     * H - currentWindowHeight
     * W - currentWindowWidth
     *     R = a/b
     *     R*b = a
     *     b = a/R
     *     a*b = A
     * =>
     *     b = A/a = a/R
     *     a = A/b = R*b
     * =>
     *     a^2 = A*R
     *     b^2 = A/R
     *
     * We want to keep asset geometry and we want it's size to be >= to the screen:
     *     (b')^2 = A'/R >= H^2,
     *     (a')^2 = A'*R >= W^2
     * =>
     *     A' >= H^2*R , A' >= W^2/R
     *     -------------------------
     *     |  2*A' > H^2*R + W^2/R |
     *     -------------------------
     */
    let twiseNewArea = ((Math.pow(currentWindowW, 2) / initSizeRation) + (Math.pow(currentWindowH, 2) * initSizeRation));
    let newWidth = Math.sqrt(twiseNewArea * initSizeRation);
    let newHeight = Math.sqrt(twiseNewArea / initSizeRation);
    asset.scale.set((newWidth / initWidth) * scaleOffestValues.x, (newHeight / initHeight) * scaleOffestValues.y);
}
