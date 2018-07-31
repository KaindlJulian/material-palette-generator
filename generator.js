var Color = require('color')
const chalk = require('chalk') 

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
            console.log(`generating palette for ${this._color}`)
            const mainPalette = []
            const accentPalette = []
    
            const mainColor = this.color

            for (let index = 0; index < MAIN_PALETTE_SIZE; index++) {
                if (index < 5) {
                    mainPalette.push(
                        mainColor.lighten((5 - (index + 1)) * 2 / 5).hex()
                    )
                } else if (index === 5) {
                    mainPalette.push(mainColor.hex())
                } else {
                    mainPalette.push(
                        mainColor.darken((index - 1) / 15).hex()
                    )
                }
            }

            accentPalette.push(
                Color(mainPalette[1]).saturate(1.80).rotate(33) .hex()
            )
            accentPalette.push(
                Color(mainPalette[2]).saturate(1.85).rotate(33).hex()
            )
            accentPalette.push(
                Color(mainPalette[4]).saturate(1.90).rotate(33).hex()
            )
            accentPalette.push(
                Color(mainPalette[7]).saturate(1.95).rotate(33).hex()
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