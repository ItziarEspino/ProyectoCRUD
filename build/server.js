"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const lecturaTeclado_1 = require("./view/lecturaTeclado");
const menu_1 = require("./view/menu");
const hipica_1 = require("./model/hipica");
const database_1 = require("./database/database");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    let n;
    let query;
    let id, tclases, diasem, caballop, pupilaje;
    let inscripcion = new hipica_1.Hipica(0, "", 0, "", "");
    yield setBD(false);
    do {
        n = yield menu_1.menu();
        switch (n) {
            case 1:
                id = parseInt(yield lecturaTeclado_1.leerTeclado('Introduzca el identificador de inscripción: '));
                tclases = yield lecturaTeclado_1.leerTeclado('Introduzca la clase que desea: ');
                diasem = parseInt(yield lecturaTeclado_1.leerTeclado('Escriba los días que desea asistir a la semana: '));
                caballop = yield lecturaTeclado_1.leerTeclado('¿Desea dar las clases con caballo propio?');
                pupilaje = yield lecturaTeclado_1.leerTeclado('¿Desea dejar su caballo a nuestro cuidado?');
                inscripcion = new hipica_1.Hipica(id, tclases, diasem, caballop, pupilaje);
                break;
            case 2:
                yield database_1.db.conectarBD();
                const dSchema = {
                    _id: inscripcion.id,
                    _tclases: inscripcion.tclases,
                    _diasem: inscripcion.diasem,
                    _caballop: inscripcion.caballop,
                    _pupilaje: inscripcion.pupilaje
                };
                const oSchema = new hipica_1.Clases(dSchema);
                yield oSchema.save()
                    .then((doc) => console.log('Guardado correctamente' + doc))
                    .catch((err) => console.log('Error: ' + err));
                yield database_1.db.desconectarBD();
                break;
            case 3:
                yield database_1.db.conectarBD();
                let precioI = parseInt(yield lecturaTeclado_1.leerTeclado('Introduzca el identificador de inscripción: '));
                yield hipica_1.Clases.findOne({ _id: precioI });
                console.log(`El precio de la inscripción es de ${inscripcion.cPrecio()}€`);
                yield database_1.db.desconectarBD();
                break;
            case 4:
                yield database_1.db.conectarBD();
                yield hipica_1.Clases.find({}, (error, doc) => {
                    if (error) {
                        console.log(error);
                    }
                    else {
                        if (doc == null) {
                            console.log('No existen documentos');
                        }
                        else {
                            console.log(doc);
                        }
                    }
                });
                yield database_1.db.desconectarBD();
                break;
            case 5:
                yield database_1.db.conectarBD();
                const eliminar = parseInt(yield lecturaTeclado_1.leerTeclado('Introduzca el identificador de inscripción: '));
                yield hipica_1.Clases.findOneAndDelete({
                    _id: eliminar
                }, (error, doc) => {
                    if (error) {
                        console.log(error);
                    }
                    else {
                        if (doc == null) {
                            console.log('No existe');
                        }
                        else {
                            console.log(doc);
                        }
                    }
                });
                yield database_1.db.desconectarBD();
                break;
            case 6:
                yield database_1.db.conectarBD();
                let precioA = parseInt(yield lecturaTeclado_1.leerTeclado('Introduzca el identificador de inscripción: '));
                yield hipica_1.Clases.findOne({ _id: precioA });
                console.log(`El precio de la inscripción es de ${inscripcion.cPrecio()}€, además de ${inscripcion.caballo()}€ por asignarle un caballo`);
                yield database_1.db.desconectarBD();
                break;
            case 7:
                yield database_1.db.conectarBD();
                let precioP = parseInt(yield lecturaTeclado_1.leerTeclado('Introduzca el identificador de inscripción: '));
                yield hipica_1.Clases.findOne({ _id: precioP });
                console.log(`El precio de la inscripción es de ${inscripcion.cPrecio()}€, además de ${inscripcion.tPupilaje()}€ por encargarnos de su caballo`);
                yield database_1.db.desconectarBD();
                break;
            case 8:
                yield database_1.db.conectarBD();
                let i = yield lecturaTeclado_1.leerTeclado('Introduzca el identificador de la inscripción que quiere modificar: ');
                let inscripcionV = yield hipica_1.Clases.findOne({ _id: i });
                let inscripcionN = new hipica_1.Hipica(inscripcionV._id, inscripcionV._tclases, inscripcionV._diasem, inscripcionV._caballop, inscripcionV._pupilaje);
                let n2;
                do {
                    n2 = yield menu_1.menu2();
                    switch (n2) {
                        case 1:
                            let tclases = yield lecturaTeclado_1.leerTeclado('Escriba la nueva clase a la que quiere asistir: ');
                            inscripcionN._tclases = tclases;
                            console.log(inscripcionN.tclases);
                            yield database_1.db.conectarBD();
                            yield hipica_1.Clases.findOneAndUpdate({ _id: inscripcionN.id }, {
                                _id: inscripcionN.id,
                                _tclases: inscripcionN.tclases,
                                _diasem: inscripcionN.diasem,
                                _caballop: inscripcionN.caballop,
                                _pupilaje: inscripcionN.pupilaje
                            }, {
                                runValidators: true
                            })
                                .then(() => console.log('Se han modificado las clases'))
                                .catch((error) => console.log(error));
                            yield database_1.db.desconectarBD;
                            break;
                        case 2:
                            let diasem = yield lecturaTeclado_1.leerTeclado('Escriba los dias de la semana que quiere asistir: ');
                            inscripcionN._diasem = diasem;
                            console.log(inscripcionN.diasem);
                            yield database_1.db.conectarBD();
                            yield hipica_1.Clases.findOneAndUpdate({ _id: inscripcionN.id }, {
                                _id: inscripcionN.id,
                                _tclases: inscripcionN.tclases,
                                _diasem: inscripcionN.diasem,
                                _caballop: inscripcionN.caballop,
                                _pupilaje: inscripcionN.pupilaje
                            }, {
                                runValidators: true
                            })
                                .then(() => console.log('Se han modificado los días'))
                                .catch((error) => console.log(error));
                            yield database_1.db.desconectarBD;
                            break;
                        case 3:
                            let caballop = yield lecturaTeclado_1.leerTeclado('¿Tiene caballo propio? ');
                            inscripcionN._caballop = caballop;
                            console.log(inscripcionN.caballop);
                            yield database_1.db.conectarBD();
                            yield hipica_1.Clases.findOneAndUpdate({ _id: inscripcionN.id }, {
                                _id: inscripcionN.id,
                                _tclases: inscripcionN.tclases,
                                _diasem: inscripcionN.diasem,
                                _caballop: inscripcionN.caballop,
                                _pupilaje: inscripcionN.pupilaje
                            }, {
                                runValidators: true
                            })
                                .then(() => console.log('Se ha modificado'))
                                .catch((error) => console.log(error));
                            yield database_1.db.desconectarBD;
                            break;
                        case 4:
                            let pupilaje = yield lecturaTeclado_1.leerTeclado('¿Desea pupilaje para su caballo? ');
                            inscripcionN._pupilaje = pupilaje;
                            console.log(inscripcionN.pupilaje);
                            yield database_1.db.conectarBD();
                            yield hipica_1.Clases.findOneAndUpdate({ _id: inscripcionN.id }, {
                                _id: inscripcionN.id,
                                _tclases: inscripcionN.tclases,
                                _diasem: inscripcionN.diasem,
                                _caballop: inscripcionN.caballop,
                                _pupilaje: inscripcionN.pupilaje
                            }, {
                                runValidators: true
                            })
                                .then(() => console.log('Se ha modificado'))
                                .catch((error) => console.log(error));
                            yield database_1.db.desconectarBD;
                            break;
                        case 0:
                            console.log('\n--ADIÓS--');
                            break;
                        default:
                            console.log("Opción incorrecta");
                            break;
                    }
                } while (n2 != 0);
                break;
            case 0:
                console.log('\n--ADIÓS--');
                break;
            default:
                console.log("Opción incorrecta");
                break;
        }
    } while (n != 0);
});
const setBD = (local) => __awaiter(void 0, void 0, void 0, function* () {
    const bdLocal = 'proyecto';
    const conexionLocal = `mongodb://locadlhost/${bdLocal}`;
    if (local) {
        database_1.db.cadenaConexion = conexionLocal;
    }
    else {
        const bdAtlas = 'prueba';
        const userAtlas = yield lecturaTeclado_1.leerTeclado('Usuario BD Atlas');
        const passAtlas = yield lecturaTeclado_1.leerTeclado('Password BD Atlas');
        const conexionAtlas = `mongodb+srv://${userAtlas}:${passAtlas}@cluster0.2jene.mongodb.net/${bdAtlas}?retryWrites=true&w=majority`;
        database_1.db.cadenaConexion = conexionAtlas;
    }
});
main();
