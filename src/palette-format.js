class Formatter {

    constructor(palette) {
        if (palette)
            this.palette = palette
    }

    set palette (palettesArray) {
        if (Array.isArray(palettesArray)) 
            this._palette = palettesArray
        else
            throw `${paletteArray} is not an Array`
    }
    get palette () {
        return this._palette
    }

    addNames(palettePos) {
        const palette = this.palette
        const indexedPalette = []

        if (palettePos)
            palette = this.palettes[palettePos]

        palette.forEach( (color, index) => {
                indexedPalette.push(
                    {
                        name: `${ 
                            index === 0 ? 50 
                            : index < 10 ? index * 100
                            : index === 10 ? 'A100'
                            : index === 11 ? 'A200'
                            : index === 12 ? 'A400'
                            : index === 13 ? 'A700'
                            : ''}`,
                        color: color,
                    }
                )
        })
        return indexedPalette  
    }
}
module.exports = Formatter