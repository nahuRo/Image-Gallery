import React, { useState } from "react";
import { Image, StyleSheet, Text } from "react-native";

import { NavigationContainer } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { StatusBar } from "expo-status-bar";

import HomeScreen from "./screens/HomeScreen";
import ImageScreen from "./screens/ImageScreen";
import pexelsLogo from "./assets/pexels.png";

const Stack = createNativeStackNavigator();

const App = () => {
	const [openSearch, setOpenSearch] = useState(false);

	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen
					name="HomeScreen"
					options={{
						headerLeft: () => <Image source={pexelsLogo} style={styles.logo} />,
						headerRight: () => (
							<Text
								onPress={() => setOpenSearch(!openSearch)}
								style={styles.searchText}
							>
								{openSearch ? "Close" : "Search"}
							</Text>
						),
						title: "Pexel App",
						headerTitleStyle: {
							color: "white",
							fontWeight: "bold",
						},
						headerStyle: {
							backgroundColor: "#000",
						},
					}}
				>
					{(props) => <HomeScreen {...props} openSearch={openSearch} />}
				</Stack.Screen>
				<Stack.Screen
					name="ImageScreen"
					options={{
						title: "Pexel App",
						headerTitleStyle: {
							color: "white",
							fontWeight: "bold",
						},
						headerStyle: {
							backgroundColor: "#000",
						},
					}}
					component={ImageScreen}
				/>
			</Stack.Navigator>
			{/* para manejar la barra de notificaciones */}
			<StatusBar />
		</NavigationContainer>
	);
};

const styles = StyleSheet.create({
	logo: {
		width: 37,
		height: 37,
		marginEnd: 5,
	},
	searchText: {
		color: "white",
		fontWeight: "bold",
		backgroundColor: "#229783",
		padding: 6,
		borderRadius: 5,
	},
});

export default App;
