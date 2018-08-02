

class Formatter {

    constructor(palettes) {
        this.palettes = palettes
    }

    set palettes (palettesArray) {
        if (Array.isArray(palettesArray)) 
            this._palettes = palettesArray
        else
            throw `${palettesArray} is not an Array`
    }
    get palettes () {
        return this._palettes
    }


    addNames(palettePos) {
        const palette = this.palettes[0] 
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
module.exports = Formatter;