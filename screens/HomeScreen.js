import { View, StyleSheet, Text } from "react-native";
import React, { useEffect, useState } from "react";
// react native elements
import { Input, Button } from "@rneui/themed";

import { getImages } from "../api";
import ImageList from "../components/ImageList";

const HomeScreen = ({ openSearch }) => {
	const [images, setImages] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");

	const loadImagenes = async (buscameEsto) => {
		const { data } = await getImages(buscameEsto);
		setImages(data.photos);
	};

	useEffect(() => {
		loadImagenes();
	}, []);

	const handleSearch = async () => {
		await loadImagenes(searchTerm);
	};

	return (
		<>
			{openSearch && (
				<View style={styles.searchSection}>
					<Input
						leftIcon={{ type: "feather", name: "search", color: "white" }}
						placeholder="Search a Term"
						style={styles.searchInput}
						value={searchTerm}
						onChangeText={(value) => setSearchTerm(value)}
					/>
					<Button
						title="Search"
						onPress={() => handleSearch()}
						buttonStyle={{ backgroundColor: "#229783" }}
					/>
				</View>
			)}
			<View style={styles.container}>
				<Text style={styles.totalResultText}>{`${images.length} resultados`}</Text>
				<ImageList images={images} />
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "black",
		alignItems: "center",
		justifyContent: "center",
	},
	totalResultText: {
		color: "white",
		textAlign: "right",
		width: "100%",
		marginTop: 35,
		marginRight: 15,
	},
	searchSection: {
		backgroundColor: "black",
		width: "100%",
		paddingLeft: 10,
	},
	searchInput: {
		backgroundColor: "transparent",
		color: "white",
		borderBottomWidth: 0,
		paddingHorizontal: 4,
	},
});

export default HomeScreen;
