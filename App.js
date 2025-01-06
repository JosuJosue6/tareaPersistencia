import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginPantalla from "./src/views/LoginPantalla";
import RegistroPantalla from "./src/views/RegistroPantalla";
import VehiculosPantalla from "./src/views/VehiculosPantalla";
import NuevoVehiculoPantalla from "./src/views/NuevoVehiculoPantalla";
import EditarVehiculoPantalla from "./src/views/EditarVehiculoPantalla";
import { loadVehiculosFromJson, loadVehiculosFromXml, loadIntegrantesFromJson, loadIntegrantesFromXml } from "./src/utils/storage";
import vehiculos from "./src/models/vehiculos";
import integrantes from "./src/models/Integrantes";

const Stack = createStackNavigator();

const App = () => {
    useEffect(() => {
        const loadData = async () => {
            const vehiculosJsonData = await loadVehiculosFromJson();
            const vehiculosXmlData = await loadVehiculosFromXml();
            if (vehiculosJsonData) {
                vehiculos.push(...vehiculosJsonData);
            } else if (vehiculosXmlData) {
                vehiculos.push(...vehiculosXmlData);
            }

            const integrantesJsonData = await loadIntegrantesFromJson();
            const integrantesXmlData = await loadIntegrantesFromXml();
            if (integrantesJsonData) {
                integrantes.push(...integrantesJsonData);
            } else if (integrantesXmlData) {
                integrantes.push(...integrantesXmlData);
            }
        };
        loadData();
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