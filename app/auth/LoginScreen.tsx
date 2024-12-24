import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity, Image, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemedView } from "@/components/ThemedView";
import API_URL from "../../config/config";

export default function LoginScreen() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = async () => {
        try {
            const response = await axios.post(`${API_URL}/api/auth/login`, {
                username,
                password,
            });
            const { token } = response.data.data;
            await AsyncStorage.setItem("token", token);
            router.replace("/(tabs)"); // Prevent back navigation to login
        } catch (error) {
            const errorMessage = (error.response?.data?.message || "An error occurred");
            Alert.alert("Login Failed", errorMessage);
        }
    };

    return (
        <ThemedView style={styles.container}>
            <Image
                source={require("../../assets/images/adan.jpg")}
                style={styles.logo}
            />
            <Text style={styles.title}>Welcome Back!</Text>
            <Text style={styles.subtitle}>Log in to continue</Text>
            <TextInput
                style={styles.input}
                placeholder="Username"
                placeholderTextColor="#a1a1a1"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#a1a1a1"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TouchableOpacity
                style={styles.loginButton}
                onPress={handleLogin}
            >
                <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.registerButton}
                onPress={() => router.push("/auth/RegisterScreen")}
            >
                <Text style={styles.registerButtonText}>Register</Text>
            </TouchableOpacity>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
        backgroundColor: "#0d0d0d", // Warna gelap manja
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: 24,
        resizeMode: "contain",
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 8,
        color: "#f0f0f0",
        textAlign: "center",
    },
    subtitle: {
        fontSize: 18,
        marginBottom: 24,
        color: "#a1a1a1",
        textAlign: "center",
    },
    input: {
        width: "100%",
        height: 50,
        borderColor: "#444",
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 16,
        marginBottom: 16,
        backgroundColor: "#1a1a1a",
        fontSize: 16,
        color: "#f0f0f0",
    },
    loginButton: {
        width: "100%",
        height: 50,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#6a11cb", // Gradasi gelap manja
        marginBottom: 16,
    },
    loginButtonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "600",
    },
    registerButton: {
        width: "100%",
        height: 50,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#333",
        borderWidth: 1,
        borderColor: "#444",
    },
    registerButtonText: {
        color: "#a1a1a1",
        fontSize: 16,
        fontWeight: "600",
    },
});
