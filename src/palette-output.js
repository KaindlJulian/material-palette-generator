const exec = require('child_process').exec;
const fs = require('fs')
const validOptions = require('../config/config.json').outputOptions

class Output {

    set option (value) {
        if (validOptions.includes(value))
            this._option = value
    }
    get option () {
        return this._option
    }

    set palette (value) {
        this._palette = value
    }
    get palette () {
        return this._palette
    }

    set path (value) {
        this._path = value
    }
    get path () {
        return this._path
    }

    output() {
        if (this.option) {
            switch (this.option) {
                case validOptions[0]:
                    this.material2Format(this.palette)
                    exec(`${this.getCommandLine()} ${this.path}/material2-palette.scss`)
                    break;
            }
        }
    } 

    outputTo(option) {
        this.option = option
        this.output()
    }

    async material2Format(palette) {
        let file = `$generated-palette: (\n`
        palette.forEach((paletteItem) => {
            file += `\t${paletteItem.name} : ${paletteItem.color.hex()},\n`
        })
        file += '\tcontrast: (\n'
        palette.forEach((paletteItem) => {
            file += `\t\t${paletteItem.name} : ${paletteItem.color.isLight() ? '#000000' : '#ffffff'},\n`
        })
        file += '\t)\n);\n'
        fs.writeFile(`${this.path}/material2-palette.scss`, file, (err) => {
            if (err) throw err
            console.log('created')
        })
    }

    getCommandLine() {
        switch (process.platform) { 
            case 'darwin' : return 'open';
            case 'win32' : return 'start';
            case 'win64' : return 'start';
            default : return 'xdg-open';
        }
    }
}
module.exports = Output