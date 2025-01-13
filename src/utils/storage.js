import RNFS from 'react-native-fs';
import { parseStringPromise, Builder } from 'react-native-xml2js';

const datosDirectory = `${RNFS.ExternalDirectoryPath}/datos/`;

// Crear la carpeta 'datos' si no existe
const ensureDatosDirectoryExists = async () => {
    const dirInfo = await RNFS.stat(datosDirectory).catch(() => null);
    if (!dirInfo || !dirInfo.isDirectory()) {
        console.log("Creando carpeta 'datos'...");
        await RNFS.mkdir(datosDirectory);
        console.log("Carpeta 'datos' creada.");
    }
};

const jsonFilePath = `${datosDirectory}/datos.json`;
const xmlFilePath = `${datosDirectory}/datos.xml`;

export const saveDataToJson = async (data) => {
    await ensureDatosDirectoryExists();
    if (!data || !data.vehiculos || !data.integrantes) {
        console.error("Datos a guardar en JSON son nulos o incompletos.");
        return;
    }
    console.log(`Guardando datos en JSON en ${jsonFilePath}...`);
    await RNFS.writeFile(jsonFilePath, JSON.stringify(data), 'utf8');
    console.log("Datos guardados en JSON.");
};

export const loadDataFromJson = async () => {
    try {
        await ensureDatosDirectoryExists();
        console.log(`Leyendo datos desde JSON en ${jsonFilePath}...`);
        const data = await RNFS.readFile(jsonFilePath, 'utf8');
        console.log("Datos leídos desde JSON.");
        return JSON.parse(data);
    } catch (error) {
        console.log("No se encontraron datos en JSON.");
        return { vehiculos: [], integrantes: [] };
    }
};

export const saveDataToXml = async (data) => {
    await ensureDatosDirectoryExists();
    if (!data || !data.vehiculos || !data.integrantes) {
        console.error("Datos a guardar en XML son nulos o incompletos.");
        return;
    }
    console.log(`Guardando datos en XML en ${xmlFilePath}...`);
    const builder = new Builder();
    const xml = builder.buildObject({ data });
    await RNFS.writeFile(xmlFilePath, xml, 'utf8');
    console.log("Datos guardados en XML.");
};

export const loadDataFromXml = async () => {
    try {
        await ensureDatosDirectoryExists();
        console.log(`Leyendo datos desde XML en ${xmlFilePath}...`);
        const data = await RNFS.readFile(xmlFilePath, 'utf8');
        const result = await parseStringPromise(data);
        console.log("Datos leídos desde XML.");
        return result.data;
    } catch (error) {
        console.log("No se encontraron datos en XML.");
        return { vehiculos: [], integrantes: [] };
    }
};

export const listFilesInDatosDirectory = async () => {
    try {
        const files = await RNFS.readDir(datosDirectory);
        console.log("Archivos en el directorio 'datos':", files);
    } catch (error) {
        console.log("Error al listar archivos en el directorio 'datos':", error);
    }
};