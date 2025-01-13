import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Button, Alert } from "react-native";
import { obtenerVehiculos, eliminarVehiculo } from "../controllers/VehiculoConstroller";
import integrantes from "../models/Integrantes";
import { saveDataToJson, saveDataToXml } from "../utils/storage";
import vehiculos from "../models/vehiculos";

const VehiculosPantalla = ({ navigation }) => {
    const [vehiculos, setVehiculos] = useState(obtenerVehiculos()); // Estado local para manejar la lista de vehículos

    const handleSignOut = async () => {
        try {

            // Guarda los vehículos antes de cerrar sesión
            const data = { vehiculos, integrantes };
            await saveDataToJson(data);
            await saveDataToXml(data);

            navigation.reset({
                index: 0, // Esto indica que la nueva pantalla será la principal
                routes: [{ name: "LoginPantalla" }], // Reemplaza "Login" con el nombre de tu pantalla de inicio de sesión
            });
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };

    const handleDelete = (placa) => {
        Alert.alert(
            "Confirmar eliminación",
            "¿Estás seguro de que deseas eliminar este vehículo?",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Confirmar",
                    onPress: () => {
                        eliminarVehiculo(placa);
                        setVehiculos(obtenerVehiculos()); // Actualizar la lista de vehículos después de eliminar
                        alert("Vehículo eliminado");
                    }
                }
            ]
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={vehiculos}
                keyExtractor={(item) => `${item.placa}-${item.nombre}`}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.label}>Placa:</Text>
                        <Text style={styles.value}>{item.placa}</Text>

                        <Text style={styles.label}>Marca:</Text>
                        <Text style={styles.value}>{item.marca}</Text>

                        <Text style={styles.label}>Fecha de Fabricación:</Text>
                        <Text style={styles.value}>{item.fecFabricacion}</Text>

                        <Text style={styles.label}>Color:</Text>
                        <Text style={styles.value}>{item.color}</Text>

                        <Text style={styles.label}>Costo:</Text>
                        <Text style={styles.value}>{`${item.costo} $`}</Text>

                        <Text style={styles.label}>Activo:</Text>
                        <Text style={styles.value}>{item.activo ? "Sí" : "No"}</Text>

                        <Button title="Editar" onPress={() => navigation.navigate("EditarVehiculoPantalla", { placa: item.placa })} />
                        <Button title="Eliminar" onPress={() => handleDelete(item.placa)} color="red" />
                    </View>
                )}
            />
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate("NuevoVehiculoPantalla")}
            >
                <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.logoutButton}
                /* onPress={() => navigation.navigate("LoginPantalla")} */
                onPress={() => handleSignOut()}
            >
                <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f5f5f5",
    },
    card: {
        backgroundColor: "#ffffff",
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    label: {
        fontWeight: "bold",
        fontSize: 14,
        color: "#555",
    },
    value: {
        fontSize: 14,
        color: "#333",
        marginBottom: 5,
    },
    addButton: {
        position: "absolute",
        bottom: 20,
        right: 20,
        backgroundColor: "#2196F3",
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    addButtonText: {
        color: "#fff",
        fontSize: 30,
        fontWeight: "bold",
    },
    logoutButton: {
        position: "absolute",
        top: 20,
        right: 20,
        backgroundColor: "#d32f2f",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    logoutButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default VehiculosPantalla;
