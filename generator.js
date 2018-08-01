var Color = require('color')
const contrasts = require('./config').generator.contrasts

const MAIN_PALETTE_SIZE = 10

class Generator {

    constructor(color) {
        this.color = color
        console.log(`new generator of ${this._color}`)
    }

    set color (color) {
        try {
            this._color = Color(color).rgb()
        } catch {
            console.log(`ERROR: "${color}" is not a valid color code`)
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
            console.log(`generating material palette for ${this._color}`)
            const mainPalette = []
            const accentPalette = []
            
            const mainColor = this.color

            for (let index = 0; index < MAIN_PALETTE_SIZE; index++) {
                console.log(contrasts[index])
                if (index < 5) {
                    mainPalette.push(
                        Color('white').mix(
                            mainColor, 
                            contrasts[index]).hex()
                    )
                } else if (index === 5) {
                    mainPalette.push(mainColor.hex())
                    this.contrast = 0
                } else if (index >= 6) {
                    mainPalette.push(
                        Color('black').mix(
                            mainColor, 
                            contrasts[index]).hex()
                    )
                }
            }

            accentPalette.push(
                Color(mainPalette[1]).saturate(1).lighten(0.1).rotate(3).hex()
            )
            accentPalette.push(
                Color(mainPalette[2]).saturate(1).lighten(0.2).rotate(3).hex()
            )
            accentPalette.push(
                Color(mainPalette[4]).saturate(1).lighten(0.4).rotate(3).hex()
            )
            accentPalette.push(
                Color(mainPalette[7]).saturate(1).lighten(0.7).rotate(3).hex()
            )

            mainPalette.forEach( (color) => {
                console.log(color)
            })
            console.log('')
            accentPalette.forEach( (color) => {
                console.log(color)
            })
            
            return mainPalette.concat(accentPalette)
        }
    }


}
module.exports = Generator;