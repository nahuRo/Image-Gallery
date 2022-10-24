import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Image, StyleSheet, TouchableOpacity } from "react-native";

const CardImage = ({ image }) => {
	// hook para navegar entre las diferentes Screens
	const navigation = useNavigation();

	return (
		<TouchableOpacity
			style={styles.CardImage}
			onPress={() => {
				// como segundo 'parametro' le paso un objeto con la info que quiero compartir con este hook
				navigation.navigate("ImageScreen", { image });
			}}
		>
			<Image
				source={{
					uri:
						image.src.portrait ||
						"https://media.istockphoto.com/photos/the-splits-by-female-gymnast-in-sunset-picture-id483344587?k=20&m=483344587&s=170667a&w=0&h=b5LxxcSmB6xR43c9DZpIo1cKPnD6nm-pXyfP5YlpJEw=",
				}}
				style={{ height: 180, width: "100%" }}
			/>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	CardImage: {
		display: "flex",
		width: "48%",
		margin: 4,
		borderWidth: 0,
		borderRadius: 5,
		overflow: "hidden",
	},
});

export default CardImage;
