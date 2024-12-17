import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Search as SearchIcon } from "lucide-react-native";

export default function SearchBar({ value, onChangeText }) {
	return (
		<View style={styles.container}>
			<SearchIcon
				color="#B3B3B3"
				size={20}
				style={styles.icon}
			/>
			<TextInput
				style={styles.input}
				placeholder="Search tracks..."
				placeholderTextColor="#B3B3B3"
				value={value}
				onChangeText={onChangeText}
				autoCorrect={false}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#282828",
		borderRadius: 8,
		marginHorizontal: 20,
		marginVertical: 10,
		paddingHorizontal: 12,
		height: 40,
	},
	icon: {
		marginRight: 8,
	},
	input: {
		flex: 1,
		color: "white",
		fontSize: 16,
	},
});
