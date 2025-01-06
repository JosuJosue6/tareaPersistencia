import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { registrarIntegrante } from "../controllers/LoginController";

export default function RegistroPantalla({ navigation }) {
    const [nombre, setNombre] = useState("");
    const [contrasenia, setContrasenia] = useState("");

    const handleRegister = () => {
        if (!nombre || !contrasenia) {
            alert("Por favor, complete todos los campos.");
            return;
        }
        registrarIntegrante(nombre, contrasenia);
        alert("Registro exitoso");
        navigation.navigate("LoginPantalla");
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Nombre</Text>
            <TextInput
                value={nombre}
                onChangeText={setNombre}
                style={styles.input}
                placeholder="Ingrese su nombre"
            />
            <Text style={styles.label}>Contraseña</Text>
            <TextInput
                value={contrasenia}
                onChangeText={setContrasenia}
                secureTextEntry
                style={styles.input}
                placeholder="Ingrese su contraseña"
            />
            <Button title="Registrarse" onPress={handleRegister} color="#1E90FF" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        padding: 20,
        justifyContent: "center",
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        fontWeight: "bold",
        color: "#333",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
        backgroundColor: "#fff",
        fontSize: 16,
    },
});
