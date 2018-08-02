const exec = require('child_process').exec;
const fs = require('fs')
const validOptions = require('../config/config.json').outputOptions

class Output {

    constructor () {
        this._open = false
        this._filename = 'material-palette.scss'
    }

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

    set open (value) {
        this._open = value
    }
    get open () {
        return this._open
    }

    set filename (value) {
        this._filename = value
    }
    get filename () {
        return this._filename
    }

    output() {
        if (this.option) {
            switch (this.option) {
                case validOptions[0]:
                    this.material2Format(this.palette)

                    break;
            } 
            if (this.open) {
                exec(`${this.getCommandLine()} ${this.path + this.filename}`)
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
        fs.writeFile(`${this.path}/${this.filename}`, file, (err) => {
            if (err) throw err
            console.log(`Created file: ${this.path + this.filename}`)
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