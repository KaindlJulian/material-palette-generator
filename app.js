#!/usr/bin/env node
const program = require('commander')
const fileTypes = require('./filetypes.json').all
const Generator = require('./generator');

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
        'set the base color(s) of the palette in hexadecimal format',
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

if (program.rawArgs.length === 2) program.help();

if ( fileTypes.includes(program.type) ) {

    console.log(validateHexColor(program.colors))
    console.log(`Material Color Palette(s) for ${program.colors}`)

    const generator = new Generator(program.colors[0])
    const palette = generator.generate()
    console.log(palette)

} else {
    console.log(`ERROR: ${program.type} is not a valid filetype`)
}

/**
 * validates a object to be an array of hexa color strings
 * @param {*} colors validated object
 */
function validateHexColor(colors) {
    if (!Array.isArray(colors)) { return false }
    console.log(`validating ${colors}`)
    colors.forEach(color => {
        if (!color.match(/^#(?:[0-9a-f]{3}){1,2}$/i)) {
            return false
        }
    });
    return true
}