import CryptoJS from "crypto-js";
import integrantes from "../models/Integrantes";
import { saveIntegrantesToJson, saveIntegrantesToXml, loadIntegrantesFromJson, loadIntegrantesFromXml } from "../utils/storage";

// Función de hash usando crypto-js
function hash(contrasenia) {
    const hashHex = CryptoJS.SHA256(contrasenia).toString(CryptoJS.enc.Hex);
    return hashHex;
}

export const autenticar = (nombre, contrasenia) => {
    // Generar el hash de la contraseña ingresada
    const hashedPassword = hash(contrasenia);
    console.log("Hashed password generada:", hashedPassword);

    // Comparar con los integrantes
    return integrantes.some(integrante => {
        return (
            integrante.nombre === nombre &&
            integrante.contrasenia === hashedPassword
        );
    });
};

export const registrarIntegrante = async (nombre, contrasenia) => {
    const hashedPassword = hash(contrasenia);
    integrantes.push({ nombre, contrasenia: hashedPassword });
    console.log("Guardando nuevo integrante...");
    await saveIntegrantesToJson(integrantes);
    await saveIntegrantesToXml(integrantes);
    console.log("Nuevo integrante guardado.");
};

// Cargar los integrantes al iniciar la aplicación
export const cargarIntegrantes = async () => {
    const jsonData = await loadIntegrantesFromJson();
    const xmlData = await loadIntegrantesFromXml();
    if (jsonData) {
        integrantes.push(...jsonData);
    } else if (xmlData) {
        integrantes.push(...xmlData);
    }
};