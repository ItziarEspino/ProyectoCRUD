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
exports.menu2 = exports.menu = void 0;
const lecturaTeclado_1 = require("./lecturaTeclado");
const menu = () => __awaiter(void 0, void 0, void 0, function* () {
    let n;
    console.log('\n');
    console.log('1.- Inscripción');
    console.log('2.- Guardar inscripción');
    console.log('3.- Calcular precio de inscripción');
    console.log('4.- Listar inscripciones');
    console.log('5.- Borrar inscripción');
    console.log('6.- Calcular precio con asignación de caballo');
    console.log('7.- Calcular precio con pupilaje');
    console.log('8.- Modificar inscripción');
    console.log('0.- Salir');
    n = parseInt(yield lecturaTeclado_1.leerTeclado('Opción:'));
    return n;
});
exports.menu = menu;
const menu2 = () => __awaiter(void 0, void 0, void 0, function* () {
    let n2;
    console.log('\n');
    console.log('1.- Modificar clase a la que asistir');
    console.log('2.- Modificar dia de la semana');
    console.log('3.- Modificar caballo propio');
    console.log('4.- Modificar pupilaje');
    console.log('0.- Salir');
    n2 = parseInt(yield lecturaTeclado_1.leerTeclado('Opción:'));
    return n2;
});
exports.menu2 = menu2;
