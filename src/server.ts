import {leerTeclado} from './view/lecturaTeclado'
import {menu, menu2} from './view/menu'
import {Hipica, Clases, hHipica} from './model/hipica'
import {db} from './database/database'

const main = async() => {
    let n: number
    let query: any

    let id:number, tclases:string, diasem:number, caballop:string, pupilaje:string
    let inscripcion: Hipica = new Hipica (0,"",0,"","")
    
    await setBD (false)
    
    do {
        n = await menu()

        switch(n){
            case 1:
                id = parseInt(await leerTeclado('Introduzca el identificador de inscripción: '))
                tclases = await leerTeclado('Introduzca la clase que desea: ')
                diasem = parseInt(await leerTeclado('Escriba los días que desea asistir a la semana: '))
                caballop = await leerTeclado('¿Desea dar las clases con caballo propio?')
                pupilaje = await leerTeclado('¿Desea dejar su caballo a nuestro cuidado?')
                inscripcion = new Hipica (id, tclases, diasem, caballop, pupilaje)
            break
            case 2: 
                await db.conectarBD()
                const dSchema = {
                    _id: inscripcion.id,
                    _tclases: inscripcion.tclases,
                    _diasem: inscripcion.diasem,
                    _caballop: inscripcion.caballop,
                    _pupilaje: inscripcion.pupilaje
                }
                const oSchema = new Clases(dSchema)
                await oSchema.save()
                .then ((doc) => console.log('Guardado correctamente' + doc))
                .catch((err: any) => console.log('Error: ' + err))
                await db.desconectarBD()
            break
            case 3: 
                await db.conectarBD()
                let precioI = parseInt(await leerTeclado('Introduzca el identificador de inscripción: '))
                await Clases.findOne({_id: precioI})
                console.log(`El precio de la inscripción es de ${inscripcion.cPrecio()}€`)
                await db.desconectarBD()
            break
            case 4:
                await db.conectarBD()
                await Clases.find({},
                    (error, doc: any) => {
                        if (error) {
                            console.log(error)
                        } else {
                            if (doc == null) {
                                console.log ('No existen documentos')
                            } else {
                                console.log(doc)
                            }
                        }
                    }
                )
                await db.desconectarBD()
            break
            case 5:
                await db.conectarBD()
                const eliminar = parseInt(await leerTeclado('Introduzca el identificador de inscripción: '))
                await Clases.findOneAndDelete(
                    {
                        _id: eliminar
                    },
                    (error, doc : any) => {
                        if (error) {
                            console.log(error)
                        } else {
                            if (doc == null) {
                                console.log ('No existe')
                            } else {
                                console.log(doc)
                            }
                        }
                    }
                )
                await db.desconectarBD()
            break
            case 6:
                await db.conectarBD()
                let precioA = parseInt(await leerTeclado('Introduzca el identificador de inscripción: '))
                await Clases.findOne({_id: precioA})
                console.log(`El precio de la inscripción es de ${inscripcion.cPrecio()}€, además de ${inscripcion.caballo()}€ por asignarle un caballo`)
                await db.desconectarBD()
            break
            case 7:
                await db.conectarBD()
                let precioP = parseInt(await leerTeclado('Introduzca el identificador de inscripción: '))
                await Clases.findOne({_id: precioP})
                console.log(`El precio de la inscripción es de ${inscripcion.cPrecio()}€, además de ${inscripcion.tPupilaje()}€ por encargarnos de su caballo`)
                await db.desconectarBD()
            break
            case 8:
                await db.conectarBD()
                let i = await leerTeclado('Introduzca el identificador de la inscripción que quiere modificar: ')
                let inscripcionV: any = await Clases.findOne({_id: i}) 
                let inscripcionN: any = new Hipica(inscripcionV._id, inscripcionV._tclases, inscripcionV._diasem, inscripcionV._caballop, inscripcionV._pupilaje)
                let n2: number
                do {
                    n2 = await menu2()
                    switch(n2) {
                        case 1:
                            let tclases = await leerTeclado('Escriba la nueva clase a la que quiere asistir: ')
                            inscripcionN._tclases = tclases
                            console.log(inscripcionN.tclases)
                            await db.conectarBD()
                            await Clases.findOneAndUpdate(
                                {_id: inscripcionN.id},
                                {
                                    _id: inscripcionN.id,
                                    _tclases: inscripcionN.tclases,
                                    _diasem: inscripcionN.diasem,
                                    _caballop: inscripcionN.caballop,
                                    _pupilaje: inscripcionN.pupilaje
                                },
                                {
                                    runValidators: true
                                }
                            )
                            .then(() => console.log('Se han modificado las clases'))
                            .catch((error) => console.log(error))
                            await db.desconectarBD
                        break
                        case 2:
                            let diasem = await leerTeclado('Escriba los dias de la semana que quiere asistir: ')
                            inscripcionN._diasem = diasem
                            console.log(inscripcionN.diasem)
                            await db.conectarBD()
                            await Clases.findOneAndUpdate(
                                {_id: inscripcionN.id},
                                {
                                    _id: inscripcionN.id,
                                    _tclases: inscripcionN.tclases,
                                    _diasem: inscripcionN.diasem,
                                    _caballop: inscripcionN.caballop,
                                    _pupilaje: inscripcionN.pupilaje
                                },
                                {
                                    runValidators: true
                                }
                            )
                            .then(() => console.log('Se han modificado los días'))
                            .catch((error) => console.log(error))
                            await db.desconectarBD
                        break
                        case 3:
                            let caballop = await leerTeclado('¿Tiene caballo propio? ')
                            inscripcionN._caballop = caballop
                            console.log(inscripcionN.caballop)
                            await db.conectarBD()
                            await Clases.findOneAndUpdate(
                                {_id: inscripcionN.id},
                                {
                                    _id: inscripcionN.id,
                                    _tclases: inscripcionN.tclases,
                                    _diasem: inscripcionN.diasem,
                                    _caballop: inscripcionN.caballop,
                                    _pupilaje: inscripcionN.pupilaje
                                },
                                {
                                    runValidators: true
                                }
                            )
                            .then(() => console.log('Se ha modificado'))
                            .catch((error) => console.log(error))
                            await db.desconectarBD
                        break
                        case 4:
                            let pupilaje = await leerTeclado('¿Desea pupilaje para su caballo? ')
                            inscripcionN._pupilaje = pupilaje
                            console.log(inscripcionN.pupilaje)
                            await db.conectarBD()
                            await Clases.findOneAndUpdate(
                                {_id: inscripcionN.id},
                                {
                                    _id: inscripcionN.id,
                                    _tclases: inscripcionN.tclases,
                                    _diasem: inscripcionN.diasem,
                                    _caballop: inscripcionN.caballop,
                                    _pupilaje: inscripcionN.pupilaje
                                },
                                {
                                    runValidators: true
                                }
                            )
                            .then(() => console.log('Se ha modificado'))
                            .catch((error) => console.log(error))
                            await db.desconectarBD
                        break
                        case 0:
                            console.log('\n--ADIÓS--')
                        break
                        default:
                            console.log("Opción incorrecta")
                        break 
                    }
                } while (n2!=0)
            break
            case 0:
                console.log('\n--ADIÓS--')
            break
            default:
                console.log("Opción incorrecta")
            break 
        }
    } while (n!=0)

}

const setBD = async (local: boolean) => {
    
    const bdLocal = 'proyecto'

    const conexionLocal = `mongodb://locadlhost/${bdLocal}`
    if (local) {
        db.cadenaConexion = conexionLocal
    }else{
        const bdAtlas = 'prueba'
        const userAtlas = await leerTeclado('Usuario BD Atlas')
        const passAtlas = await leerTeclado('Password BD Atlas')
        const conexionAtlas =  
        `mongodb+srv://${userAtlas}:${passAtlas}@cluster0.2jene.mongodb.net/${bdAtlas}?retryWrites=true&w=majority`
        db.cadenaConexion = conexionAtlas
    }
}

main()