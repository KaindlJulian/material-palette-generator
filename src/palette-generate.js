var Color = require('color')
const contrasts = require('../config/config.json').generator.contrasts

const MAIN_PALETTE_SIZE = 10

class Generator {

    constructor(color) {
        this.color = color
    }

    set color (color) {
        try {
            this._color = Color(color).rgb()
        } catch (err) {
            console.log(`ERROR: "${color}" is not a valid color code!`)
        }
    }
    get color () {
        return this._color
    }

    generateOf(color) {
        this.color = color
        return this.generate()
    }

    async generate() {
        if (this._color) {
            const mainPalette = []
            const accentPalette = []          
            const mainColor = this.color

            for (let index = 0; index < MAIN_PALETTE_SIZE; index++) {
                if (index < 5) {
                    mainPalette.push(
                        Color('white').mix(
                            mainColor, 
                            contrasts[index])
                    )
                } else if (index === 5) {
                    mainPalette.push(mainColor)
                    this.contrast = 0
                } else if (index >= 6) {
                    mainPalette.push(
                        Color('black').mix(
                            mainColor, 
                            contrasts[index])
                    )
                }
            }

            const accentColor = mainColor.saturate(1).rotate(3)
            accentPalette.push(
                accentColor.lighten(0.7)
            )
            accentPalette.push(
                accentColor.lighten(0.5)
            )
            accentPalette.push(
                accentColor.lighten(0.3)
            )
            accentPalette.push(
                accentColor.lighten(0.1)
            )
            
            return mainPalette.concat(accentPalette)
        }
    }
}
module.exports = Generator