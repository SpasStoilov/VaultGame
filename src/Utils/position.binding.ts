import{
    currentWindowHeight,
    currentWindowWidth,
}from "../Utils/app.resize.js"

/**
 * Keep assets position difrence same.
 * @param {object} values { bind: <number in %> }
 * @param {DisplayObject} asset 
 * @returns {number}
 * 
 */
export function positionBinding(
    values:{x:number, y:number}, asset: any
){
    /**
     * %   = value.bind
     * S.W = currentWindowWidth
     * A.W = asset.width
     * dw  = S.W - A.W = x + x'
     * x   = % * dw
     * 
     *              S.W 
     * ^------------------------------^
     *     x                    x'
     * ^-------*          ------------^
     *             A.W 
     *         ^---------^
     * 
     * NOTE: We calculate the "y" in same way!
     */
    asset.position.set(
        values.x*(currentWindowWidth - asset.width),
        values.y*(currentWindowHeight - asset.height)
    )
}