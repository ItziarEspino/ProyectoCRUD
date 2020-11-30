import {leerTeclado} from './lecturaTeclado'



export const menu = async () => {
    let n: number
    console.log('\n')
    console.log('1.- Inscripción')
    console.log('2.- Guardar inscripción')
    console.log('3.- Calcular precio de inscripción')
    console.log('4.- Listar inscripciones')
    console.log('5.- Borrar inscripción')
    console.log('6.- Calcular precio con asignación de caballo')
    console.log('7.- Calcular precio con pupilaje')
    console.log('8.- Modificar inscripción')
    console.log('0.- Salir')
    n = parseInt(await leerTeclado('Opción:'))
    return n
}

export const menu2 = async () => {
    let n2: number
    console.log('\n')
    console.log('1.- Modificar clase a la que asistir')
    console.log('2.- Modificar dia de la semana')
    console.log('3.- Modificar caballo propio')
    console.log('4.- Modificar pupilaje')
    console.log('0.- Salir')
    n2 = parseInt(await leerTeclado('Opción:'))
    return n2
}