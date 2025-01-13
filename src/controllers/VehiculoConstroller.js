import vehiculos from "../models/vehiculos";
import { saveDataToJson, saveDataToXml } from "../utils/storage";

export const obtenerVehiculos = () => vehiculos;

export const agregarVehiculo = async (nuevoVehiculo) => {
    vehiculos.push(nuevoVehiculo);
    await saveDataToJson({ vehiculos });
    await saveDataToXml({ vehiculos });
};

export const eliminarVehiculo = async (placa) => {
    const index = vehiculos.findIndex(vehiculo => vehiculo.placa === placa);
    if (index !== -1) {
        vehiculos.splice(index, 1);
        await saveDataToJson({ vehiculos });
        await saveDataToXml({ vehiculos });
    }
};

export const guardarVehiculos = async () => {
    await saveDataToJson({ vehiculos });
    await saveDataToXml({ vehiculos });
};