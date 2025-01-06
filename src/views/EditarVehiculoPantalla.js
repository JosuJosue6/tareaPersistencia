import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet,Switch, ScrollView, Alert, TouchableOpacity } from "react-native";
import { editarVehiculo, obtenerVehiculos } from "../controllers/VehiculoConstroller";
import DateTimePicker from "@react-native-community/datetimepicker";

const EditarVehiculoPantalla = ({ navigation, route }) => {
    const { placa } = route.params;
    const [vehiculo, setVehiculo] = useState(null);
    const [marca, setMarca] = useState("");
    const [fecFabricacion, setFecFabricacion] = useState(new Date());
    const [color, setColor] = useState("Blanco");
    const [costo, setCosto] = useState("");
    const [activo, setActivo] = useState(true);
    const [showDatePicker, setShowDatePicker] = useState(false);

    useEffect(() => {
        const vehiculoEncontrado = obtenerVehiculos().find((v) => v.placa === placa);
        if (vehiculoEncontrado) {
            setVehiculo(vehiculoEncontrado);
            setMarca(vehiculoEncontrado.marca);
            setFecFabricacion(new Date(vehiculoEncontrado.fecFabricacion));
            setColor(vehiculoEncontrado.color);
            setCosto(vehiculoEncontrado.costo.toString());
            setActivo(vehiculoEncontrado.activo);
        } else {
            Alert.alert("Error", "Vehículo no encontrado.");
            navigation.goBack();
        }
    }, [placa, navigation]);

    const handleEditVehicle = () => {
        if (!marca || !fecFabricacion || !color || !costo) {
            Alert.alert("Error", "Por favor completa todos los campos.");
            return;
        }

        const updatedVehiculo = {
            placa,
            marca,
            fecFabricacion: fecFabricacion.toISOString().split("T")[0],
            color,
            costo: parseFloat(costo),
            activo,
        };

        editarVehiculo(placa, updatedVehiculo);
        Alert.alert("Éxito", "Vehículo actualizado.");
        navigation.navigate("VehiculosPantalla");
    };

    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || fecFabricacion;
        setShowDatePicker(false);
        setFecFabricacion(currentDate);
    };

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    return (
        <ScrollView contentContainerStyle={styles.container} style={{ flex: 1 }}>
            <View style={styles.form}>
                <Text style={styles.label}>Placa:</Text>
                <TextInput
                    style={styles.input}
                    value={placa}
                    editable={false}
                />

                <Text style={styles.label}>Marca:</Text>
                <TextInput
                    style={styles.input}
                    value={marca}
                    onChangeText={setMarca}
                />

                <Text style={styles.label}>Fecha de fabricación:</Text>
                <Button onPress={() => setShowDatePicker(true)} title="Seleccionar fecha" />
                {showDatePicker && (
                    <DateTimePicker
                        value={fecFabricacion}
                        mode="date"
                        display="default"
                        onChange={onChangeDate}
                    />
                )}
                <TextInput
                    style={styles.input}
                    value={formatDate(fecFabricacion)}
                    editable={false}
                />

                <Text style={styles.label}>Color:</Text>
                <View style={styles.colorContainer}>
                    {["Blanco", "Negro", "Azul"].map((col) => (
                        <TouchableOpacity
                            key={col}
                            style={[
                                styles.colorButton,
                                color === col && styles.selectedColorButton,
                            ]}
                            onPress={() => setColor(col)}
                        >
                            <Text style={styles.colorButtonText}>{col}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <Text style={styles.label}>Costo:</Text>
                <TextInput
                    style={styles.input}
                    value={costo}
                    onChangeText={setCosto}
                    keyboardType="numeric"
                />

                <View style={styles.switchContainer}>
                    <Text style={styles.label}>Activo:</Text>
                    <Switch
                        value={activo}
                        onValueChange={setActivo}
                    />
                </View>

                <Button title="Guardar cambios" onPress={handleEditVehicle} />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 16,
    },
    form: {
        backgroundColor: "#ffffff",
        padding: 20,
        borderRadius: 10,
        width: "100%",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
        color: "#333",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
        backgroundColor: "#f9f9f9",
    },
    colorContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    colorButton: {
        flex: 1,
        padding: 10,
        marginHorizontal: 5,
        borderWidth: 1,
        borderColor: 'gray',
        alignItems: 'center',
    },
    selectedColorButton: {
        backgroundColor: 'lightgray',
    },
    colorButtonText: {
        fontSize: 16,
    },
    switchContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
    },
});

export default EditarVehiculoPantalla;
