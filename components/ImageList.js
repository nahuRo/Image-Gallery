import { View, FlatList } from "react-native";
import React from "react";

import CardImage from "./CardImage";

const ImageList = ({ images }) => {
	return (
		<View>
			<FlatList
				data={images}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => {
					return <CardImage image={item} />;
				}}
				numColumns={2}
			/>
		</View>
	);
};

export default ImageList;
