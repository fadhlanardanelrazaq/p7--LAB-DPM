import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity, Image, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import axios from "axios";
import API_URL from "../../config/config";

export default function RegisterScreen() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const router = useRouter();

	const handleRegister = async () => {
		try {
			await axios.post(`${API_URL}/api/auth/register`, {
				username,
				password,
				email,
			});
			Alert.alert("Registration Successful", "You can now log in");
			router.replace("/auth/LoginScreen");
		} catch (error) {
			Alert.alert("Registration Failed", (error.response?.data?.message || "An error occurred"));
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.header}> 
				<Image
					source={require("../../assets/images/adan.jpg")}
					style={styles.image}
				/>
				<Text style={styles.title}>Create an Account</Text>
				<Text style={styles.subtitle}>Join us and get started</Text>
			</View>

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
				placeholder="Email"
				placeholderTextColor="#a1a1a1"
				value={email}
				onChangeText={setEmail}
				keyboardType="email-address"
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
				style={styles.registerButton}
				onPress={handleRegister}
			>
				<Text style={styles.registerButtonText}>Register</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={styles.backButton}
				onPress={() => router.replace("/auth/LoginScreen")}
			>
				<Text style={styles.backButtonText}>Back to Login</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#0d0d0d",
		padding: 16,
	},
	header: {
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 32,
		paddingTop: 50,
	},
	image: {
		width: 120,
		height: 120,
		marginBottom: 16,
	},
	title: {
		fontSize: 28,
		fontWeight: "bold",
		color: "#f0f0f0",
	},
	subtitle: {
		fontSize: 16,
		color: "#a1a1a1",
	},
	input: {
		width: "100%",
		height: 50,
		borderColor: "#444",
		borderWidth: 1,
		borderRadius: 8,
		paddingHorizontal: 16,
		marginBottom: 16,
		backgroundColor: "#1a1a1a",
		fontSize: 16,
		color: "#f0f0f0",
	},
	registerButton: {
		width: "100%",
		height: 50,
		backgroundColor: "#6a11cb",
		borderRadius: 8,
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 16,
		shadowColor: "#222",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
	},
	registerButtonText: {
		color: "#fff",
		fontSize: 18,
		fontWeight: "bold",
	},
	backButton: {
		width: "100%",
		height: 50,
		borderColor: "#444",
		backgroundColor: "#333",
		borderWidth: 1,
		borderRadius: 8,
		justifyContent: "center",
		alignItems: "center",
	},
	backButtonText: {
		color: "#a1a1a1",
		fontSize: 16,
		fontWeight: "bold",
	},
});
