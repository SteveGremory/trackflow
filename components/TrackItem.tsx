import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Music } from "lucide-react-native";

export default function TrackItem({ track, onPress }) {
	// Format filename to remove extension
	const trackTitle = track.filename.replace(/\.[^/.]+$/, "");

	return (
		<TouchableOpacity style={styles.container} onPress={onPress}>
			<View style={styles.iconContainer}>
				<Music color="#1DB954" size={24} />
			</View>
			<View style={styles.textContainer}>
				<Text
					style={styles.titleText}
					numberOfLines={1}
				>
					{trackTitle}
				</Text>
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 10,
		paddingHorizontal: 15,
		backgroundColor: "#121212",
		borderBottomWidth: 1,
		borderBottomColor: "#282828",
	},
	iconContainer: {
		marginRight: 15,
		width: 40,
		alignItems: "center",
	},
	textContainer: {
		flex: 1,
	},
	titleText: {
		color: "white",
		fontSize: 16,
	},
});
