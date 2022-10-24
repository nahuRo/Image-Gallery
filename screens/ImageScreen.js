import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
// react native elements
import { Avatar, Button } from "@rneui/themed";

import * as WebBrowser from "expo-web-browser";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";

import { getImages } from "../api";

import ImageList from "../components/ImageList";

const ImageScreen = ({ route }) => {
	const { image } = route.params;

	const [photos, setPhotos] = useState([]);

	const loadImagenes = async () => {
		const { data } = await getImages();
		setPhotos(data.photos);
	};

	useEffect(() => {
		loadImagenes();
	}, []);

	const handlePress = async () => {
		await WebBrowser.openBrowserAsync(image.photographer_url);
	};

	const handleDownload = () => {
		downloadFile();
	};

	const downloadFile = async () => {
		try {
			let fileUri = FileSystem.documentDirectory + `${image.id}.jpg`;

			const { uri } = await FileSystem.downloadAsync(image.src.large2x, fileUri);

			saveFile(uri);
		} catch (error) {
			console.error(error);
		}
	};

	const saveFile = async (fileUri) => {
		// con el status  lo que hago es pedir permisos, como cuando dice permiso de usar la ubicacion
		const { status } = await MediaLibrary.requestPermissionsAsync();
		// si le di permisos a la app el status es 'granted'
		if (status === "granted") {
			// guardo/creo la imagen
			const asset = await MediaLibrary.createAssetAsync(fileUri);
			// guardo y muestro img en una carpeta
			await MediaLibrary.createAlbumAsync("Download", asset, false);
		}
	};

	return (
		<View style={styles.containerPhotographer}>
			<Image
				source={{
					uri: image.src.large2x,
					height: 350,
				}}
			/>
			<View
				style={{
					paddingVertical: 15,
					display: "flex",
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
					width: "100%",
				}}
			>
				<View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
					<Avatar
						title={image.photographer
							.split(" ")
							.map((string) => string[0])
							.join("")
							.toUpperCase()}
						rounded
						containerStyle={{ backgroundColor: "red" }}
					/>
					<TouchableOpacity onPress={handlePress}>
						<Text style={styles.name}>{image.photographer}</Text>
					</TouchableOpacity>
				</View>
				<Button
					title="Download"
					buttonStyle={{ backgroundColor: "#229783" }}
					onPress={handleDownload}
				/>
			</View>
			<View>
				<ImageList images={photos} />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	containerPhotographer: {
		backgroundColor: "black",
		flex: 1,
		flexDirection: "column",
		padding: 10,
	},
	name: {
		color: "white",
		fontWeight: "bold",
		marginStart: 5,
		fontSize: 18,
	},
});

export default ImageScreen;
