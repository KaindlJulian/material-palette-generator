#!/usr/bin/env node
'use strict'
const program = require('commander')
const chalk = require('chalk')
const config = require('./config/config.json')

const PaletteGenerator = require('./src/palette-generate');
const PaletteFormatter = require('./src/palette-format');
const PaletteOutput = require('./src/palette-output');

program
    .version('1.0.0')
    .description('generates a color palette by material design standards')
    .option(
        '-c, --color [color]', 
        'base color of the palette in hexadecimal format',
    )
    .option(
        '-f --format [format]',
        'set the outputformat (see github for details)',
    )
    .option(
        '-p --print',
        'prints the palette the the command line',
    )
    .option(
        '-o, --open',
        'opens the generated file with your associated application'
    )
    .option(
        '-n, --file-name [filename]',
        'name of the file (standart is material-palette.scss)'
    )
    .option(
        '-d, --directory [directory]',
        'the absolute or relative path where the file will be created'
    )
program.parse(process.argv)

if (program.color) {
    if (!validateInputColor()) {
        program.help()
    }
    console.log(`Material Color Palette for ${chalk.hex(program.color)(program.color)}`)
    const generator = new PaletteGenerator(program.color)
    const formatter = new PaletteFormatter()
    const output = new PaletteOutput()
    
    generator.generate().then((palette) => {
        formatter.palette = palette
        console.log()
        if (program.print) {
            const paletteRaw = formatter.addNames()
            paletteRaw.forEach( (val) => {
                console.log(val.name, '\t:', 
                    chalk.bgHex(val.color.hex())
                    (chalk.keyword(val.color.isLight() ? 'black' : 'white')
                    (val.color.hex()))
                )
            })
        } else {
            palette.forEach((color) => {
                console.log(
                    chalk.bgHex(color.hex())
                    (chalk.keyword(color.isLight() ? 'black' : 'white')
                    (color.hex()))
                )
            })
        }

        if (config.outputOptions.includes(program.format)) { 
            const formatted = formatter.addNames()

            output.palette = formatted
            output.path = program.directory ? program.directory : '.'

            if (program.open) { output.open = true }
            if (program.fileName) { output.filename = program.fileName }

            output.outputTo(program.format)
        }
    })
}

/**
 * validates a object to be a hexa color string and adds a hash if it is missing
 * @param {*} color validated object
 */
function validateInputColor() {
    if (!program.color.startsWith('#')) 
        program.color = '#' + program.color
    return program.color.match(/^#(?:[0-9a-f]{3}){1,2}$/i)
}