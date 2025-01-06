import * as FileSystem from 'expo-file-system';
import { parseStringPromise, Builder } from 'react-native-xml2js';

const vehiculosJsonFilePath = `${FileSystem.documentDirectory}vehiculos.json`;
const vehiculosXmlFilePath = `${FileSystem.documentDirectory}vehiculos.xml`;
const integrantesJsonFilePath = `${FileSystem.documentDirectory}integrantes.json`;
const integrantesXmlFilePath = `${FileSystem.documentDirectory}integrantes.xml`;

export const saveDataToJson = async (data, filePath) => {
    console.log(`Guardando datos en JSON en ${filePath}...`);
    await FileSystem.writeAsStringAsync(filePath, JSON.stringify(data));
    console.log("Datos guardados en JSON.");
    console.log(data);
};

export const loadDataFromJson = async (filePath) => {
    try {
        console.log(`Leyendo datos desde JSON en ${filePath}...`);
        const data = await FileSystem.readAsStringAsync(filePath);
        console.log("Datos leídos desde JSON.");
        console.log(data);
        return JSON.parse(data);
    } catch (error) {
        console.log("No se encontraron datos en JSON.");
        return null;
    }
};

export const saveDataToXml = async (data, filePath) => {
    console.log(`Guardando datos en XML en ${filePath}...`);
    const builder = new Builder();
    const xml = builder.buildObject({ data });
    await FileSystem.writeAsStringAsync(filePath, xml);
    console.log("Datos guardados en XML.");
    console.log(data);
};

export const loadDataFromXml = async (filePath) => {
    try {
        console.log(`Leyendo datos desde XML en ${filePath}...`);
        const data = await FileSystem.readAsStringAsync(filePath);
        const result = await parseStringPromise(data);
        console.log("Datos leídos desde XML.");
        return result.data;
    } catch (error) {
        console.log("No se encontraron datos en XML.");
        return null;
    }
};

// Funciones específicas para vehiculos
export const saveVehiculosToJson = async (data) => saveDataToJson(data, vehiculosJsonFilePath);
export const loadVehiculosFromJson = async () => loadDataFromJson(vehiculosJsonFilePath);
export const saveVehiculosToXml = async (data) => saveDataToXml(data, vehiculosXmlFilePath);
export const loadVehiculosFromXml = async () => loadDataFromXml(vehiculosXmlFilePath);

// Funciones específicas para integrantes
export const saveIntegrantesToJson = async (data) => saveDataToJson(data, integrantesJsonFilePath);
export const loadIntegrantesFromJson = async () => loadDataFromJson(integrantesJsonFilePath);
export const saveIntegrantesToXml = async (data) => saveDataToXml(data, integrantesXmlFilePath);
export const loadIntegrantesFromXml = async () => loadDataFromXml(integrantesXmlFilePath);