#!/usr/bin/env node
const program = require('commander')
const config = require('../config/config.json')
const Generator = require('./palette-generator');
const Formatter = require('./palette-formatter');

/**
 * splits a csv string from cli and returns a string list
 * @param {*} val string of csv
 */
function list(val) {
    return val.split(',').map(String)
}

program
    .version('1.0.0')
    .description('generates a color palette by material design standards')
    .option(
        '-c, --colors [colors]', 
        'base color(s) of the palette(s) in hexadecimal format',
        list
    )
    .option(
        '-t --type [type]',
        'set the filetype',
        'scss'
    )
    .option(
        '-p --print',
        'prints the palette',
    )
    .option(
        '-o, --open',
        'opens the generated file in your browser'
    )
    .option(
        '-c, --chdir <path>',
        'set the location of the generated file'
    )
program.parse(process.argv)

if (program.colors) {
    console.log(`Material Color Palette(s) for ${program.colors}`)
    const generator = new Generator(program.colors[0])
    
    generator.generate().then((palette) => {
        const formatter = new Formatter([palette])
    
        if (program.print) {
            const paletteRaw = formatter.addNames()
            paletteRaw.forEach( (val) => {
                console.log(val.name , '\t', val.color.hex())
            })
        }
    })
}



if ( config.outputOptions.includes(program.type) ) {


} else {
    console.log(`ERROR: ${program.type} is not a valid filetype`)
}

/**
 * validates a object to be an array of hexa color strings
 * @param {*} colors validated object
 */
function validateHexColor(colors) {
    if (!Array.isArray(colors)) { return false }
    colors.forEach(color => {
        if (!color.match(/^#(?:[0-9a-f]{3}){1,2}$/i)) {
            return false
        }
    });
    return true
}