import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { PlayerContext } from "../context/PlayerContext";
import { Play, Pause, Music } from "lucide-react-native";

export default function MiniPlayer() {
	const router = useRouter();
	const { currentTrack, isPlaying, togglePlayPause } =
		useContext(PlayerContext);

	if (!currentTrack) return null;

	return (
		<TouchableOpacity
			style={styles.container}
			onPress={() => router.push("/player")}
		>
			<View style={styles.content}>
				<View style={styles.albumArt}>
					<Music size={24} color="#1DB954" />
				</View>
				<View style={styles.trackInfo}>
					<Text
						style={styles.title}
						numberOfLines={1}
					>
						{currentTrack.filename.replace(
							/\.[^/.]+$/,
							"",
						)}
					</Text>
				</View>
				<TouchableOpacity
					style={styles.playButton}
					onPress={(e) => {
						e.stopPropagation();
						togglePlayPause();
					}}
				>
					{isPlaying ? (
						<Pause
							size={24}
							color="white"
						/>
					) : (
						<Play size={24} color="white" />
					)}
				</TouchableOpacity>
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#282828",
		borderBottomWidth: 1,
		borderBottomColor: "#383838",
	},
	content: {
		flexDirection: "row",
		alignItems: "center",
		padding: 10,
	},
	albumArt: {
		width: 40,
		height: 40,
		backgroundColor: "#181818",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 4,
	},
	trackInfo: {
		flex: 1,
		marginHorizontal: 12,
	},
	title: {
		color: "white",
		fontSize: 14,
		fontWeight: "500",
	},
	playButton: {
		padding: 8,
	},
});
