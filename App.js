import React, { useEffect } from "react";
import { AppState } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginPantalla from "./src/views/LoginPantalla";
import RegistroPantalla from "./src/views/RegistroPantalla";
import VehiculosPantalla from "./src/views/VehiculosPantalla";
import NuevoVehiculoPantalla from "./src/views/NuevoVehiculoPantalla";
import EditarVehiculoPantalla from "./src/views/EditarVehiculoPantalla";
import { loadDataFromJson, saveDataToJson, loadDataFromXml, saveDataToXml, listFilesInDatosDirectory } from "./src/utils/storage";
import vehiculos from "./src/models/vehiculos";
import integrantes from "./src/models/Integrantes";

const Stack = createStackNavigator();

const App = () => {
    useEffect(() => {
        const loadData = async () => {
            const dataJSON = await loadDataFromJson();
            const dataXML = await loadDataFromXml();
            if (dataJSON) {
                vehiculos.push(...dataJSON.vehiculos);
                integrantes.push(...dataJSON.integrantes);
            } else if (dataXML) {
                vehiculos.push(...dataXML.vehiculos);
                integrantes.push(...dataXML.integrantes);
            }
        };

        const saveData = async () => {
            const data = { vehiculos, integrantes };
            await saveDataToJson(data);
            await saveDataToXml(data);
        };

        loadData();

        const handleAppStateChange = (nextAppState) => {
            if (nextAppState === 'inactive' || nextAppState === 'background') {
                saveData();
            }
        };

        AppState.addEventListener('change', handleAppStateChange);

        // Llama a la función para listar archivos al iniciar la aplicación
        listFilesInDatosDirectory();

        return () => {
            AppState.removeEventListener('change', handleAppStateChange);
        };
    }, []);

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="LoginPantalla">
                <Stack.Screen name="LoginPantalla" component={LoginPantalla} />
                <Stack.Screen name="RegistroPantalla" component={RegistroPantalla} />
                <Stack.Screen name="VehiculosPantalla" component={VehiculosPantalla} />
                <Stack.Screen name="NuevoVehiculoPantalla" component={NuevoVehiculoPantalla} />
                <Stack.Screen name="EditarVehiculoPantalla" component={EditarVehiculoPantalla} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;