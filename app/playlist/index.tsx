import React, { useState, useContext } from "react";
import {
	View,
	Text,
	StyleSheet,
	TextInput,
	TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { PlaylistContext } from "../../context/PlaylistContext";
import { X } from "lucide-react-native";

export default function CreatePlaylistScreen() {
	const router = useRouter();
	const { createPlaylist } = useContext(PlaylistContext);
	const [playlistName, setPlaylistName] = useState("");

	const handleCreate = () => {
		if (playlistName.trim()) {
			createPlaylist(playlistName.trim());
			router.back();
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<TouchableOpacity onPress={() => router.back()}>
					<X color="white" size={24} />
				</TouchableOpacity>
				<Text style={styles.headerTitle}>
					Create Playlist
				</Text>
				<TouchableOpacity
					onPress={handleCreate}
					style={[
						styles.createButton,
						!playlistName.trim() &&
							styles.createButtonDisabled,
					]}
				>
					<Text style={styles.createButtonText}>
						Create
					</Text>
				</TouchableOpacity>
			</View>

			<View style={styles.content}>
				<TextInput
					style={styles.input}
					placeholder="Playlist name"
					placeholderTextColor="#B3B3B3"
					value={playlistName}
					onChangeText={setPlaylistName}
					autoFocus
					maxLength={50}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#121212",
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 20,
		paddingTop: 60,
		paddingBottom: 20,
	},
	headerTitle: {
		color: "white",
		fontSize: 18,
		fontWeight: "bold",
	},
	createButton: {
		backgroundColor: "#1DB954",
		paddingHorizontal: 16,
		paddingVertical: 8,
		borderRadius: 20,
	},
	createButtonDisabled: {
		backgroundColor: "#1DB95480",
	},
	createButtonText: {
		color: "white",
		fontWeight: "600",
	},
	content: {
		padding: 20,
	},
	input: {
		backgroundColor: "#282828",
		borderRadius: 8,
		padding: 16,
		color: "white",
		fontSize: 16,
	},
});
