#!/usr/bin/env node
const program = require('commander')
const config = require('../config/config.json')

const PaletteGenerator = require('./palette-generate');
const PaletteFormatter = require('./palette-format');
const PaletteOutput = require('./palette-output');

program
    .version('0.0.1')
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
        '-d, --dir [dir]',
        'the absolute or relative path where the file will be created'
    )
program.parse(process.argv)

if (program.color) {
    console.log(`Material Color Palette(s) for ${program.color}`)
    const generator = new PaletteGenerator(program.color)
    const formatter = new PaletteFormatter()
    const output = new PaletteOutput()
    
    generator.generate().then((palette) => {
        formatter.palette = palette
    
        if (program.print) {
            const paletteRaw = formatter.addNames()
            paletteRaw.forEach( (val) => {
                console.log(val.name , '\t', val.color.hex())
            })
        }

        if (config.outputOptions.includes(program.format)) { 
            console.log(program)
            const formatted = formatter.addNames()
            output.palette = formatted
            output.path = program.dir ? program.dir : './'
            output.outputTo(program.format)
        }
    })
}

/**
 * validates a object to be a hexa color string
 * @param {*} color validated object
 */
function validateHexColor(color) {
    return color.match(/^#(?:[0-9a-f]{3}){1,2}$/i)
}