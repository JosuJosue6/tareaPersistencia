import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import { autenticar } from "../controllers/LoginController";

const LoginPantalla = ({ navigation }) => {
    const [nombre, setNombre] = useState("");
    const [contrasenia, setContrasenia] = useState("");

    const handleLogin = async () => {
        let aux = await autenticar(nombre, contrasenia);
        if (aux) {
            Alert.alert("Éxito", "Inicio de sesión exitoso.");
            navigation.navigate("VehiculosPantalla");
        } else {
            Alert.alert("Error", "Credenciales Incorrectas.");
            console.log("Credenciales Incorrectas");
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.loginBox}>
                <Text style={styles.title}>Iniciar sesión</Text>
                <Text style={styles.label}>Nombre:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setNombre}
                    value={nombre}
                    placeholder="Ingrese su nombre"
                />
                <Text style={styles.label}>Contraseña:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setContrasenia}
                    value={contrasenia}
                    placeholder="Ingrese su contraseña"
                    secureTextEntry={true}
                />
                <Button title="Iniciar sesión" onPress={handleLogin} />
                <View style={{ height: 20 }} />
                <Button title="Registrarse" onPress={() => navigation.navigate("RegistroPantalla")} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
    },
    loginBox: {
        width: "80%",
        backgroundColor: "#ffffff",
        borderRadius: 10,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
        color: "#333",
    },
    label: {
        fontSize: 14,
        color: "#555",
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
        backgroundColor: "#f9f9f9",
    },
});

export default LoginPantalla;
