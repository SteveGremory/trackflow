import React, { useContext } from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	FlatList,
	Alert,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { PlayerContext } from "../../context/PlayerContext";
import { PlaylistContext } from "../../context/PlaylistContext";
import {
	ChevronLeft,
	Music2,
	MoreVertical,
	Play,
	Trash2,
	PlayCircle,
} from "lucide-react-native";

export default function PlaylistScreen() {
	const router = useRouter();
	const { id } = useLocalSearchParams();
	const { play } = useContext(PlayerContext);
	const { playlists, removeTrackFromPlaylist, deletePlaylist } =
		useContext(PlaylistContext);

	const playlist = playlists.find((p) => p.id === id);

	if (!playlist) {
		router.back();
		return null;
	}

	const handlePlayAll = () => {
		if (playlist.tracks.length > 0) {
			play(playlist.tracks[0], playlist.tracks);
		}
	};

	const handleDeleteTrack = (trackId) => {
		Alert.alert(
			"Remove Track",
			"Are you sure you want to remove this track from the playlist?",
			[
				{ text: "Cancel", style: "cancel" },
				{
					text: "Remove",
					onPress: () =>
						removeTrackFromPlaylist(
							playlist.id,
							trackId,
						),
					style: "destructive",
				},
			],
		);
	};

	const handleDeletePlaylist = () => {
		Alert.alert(
			"Delete Playlist",
			"Are you sure you want to delete this playlist?",
			[
				{ text: "Cancel", style: "cancel" },
				{
					text: "Delete",
					onPress: () => {
						deletePlaylist(playlist.id);
						router.back();
					},
					style: "destructive",
				},
			],
		);
	};

	const renderTrackItem = ({ item }) => (
		<TouchableOpacity
			style={styles.trackItem}
			onPress={() => play(item, playlist.tracks)}
		>
			<View style={styles.trackIconContainer}>
				<Music2 color="#1DB954" size={24} />
			</View>
			<View style={styles.trackInfo}>
				<Text
					style={styles.trackTitle}
					numberOfLines={1}
				>
					{item.filename.replace(/\.[^/.]+$/, "")}
				</Text>
			</View>
			<View style={styles.trackActions}>
				<TouchableOpacity
					style={styles.actionButton}
					onPress={() =>
						play(item, playlist.tracks)
					}
				>
					<PlayCircle color="#1DB954" size={24} />
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.actionButton}
					onPress={() =>
						handleDeleteTrack(item.id)
					}
				>
					<Trash2 color="#ff4444" size={20} />
				</TouchableOpacity>
			</View>
		</TouchableOpacity>
	);

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<TouchableOpacity
					style={styles.backButton}
					onPress={() => router.back()}
				>
					<ChevronLeft color="white" size={28} />
				</TouchableOpacity>
				<Text
					style={styles.headerTitle}
					numberOfLines={1}
				>
					{playlist.name}
				</Text>
				<TouchableOpacity
					style={styles.menuButton}
					onPress={handleDeletePlaylist}
				>
					<MoreVertical color="white" size={24} />
				</TouchableOpacity>
			</View>

			<View style={styles.playlistInfo}>
				<View style={styles.playlistIconLarge}>
					<Music2 color="#1DB954" size={40} />
				</View>
				<Text style={styles.playlistName}>
					{playlist.name}
				</Text>
				<Text style={styles.trackCount}>
					{playlist.tracks.length}{" "}
					{playlist.tracks.length === 1
						? "track"
						: "tracks"}
				</Text>
				{playlist.tracks.length > 0 && (
					<TouchableOpacity
						style={styles.playAllButton}
						onPress={handlePlayAll}
					>
						<Play
							size={20}
							color="black"
							fill="black"
						/>
						<Text
							style={
								styles.playAllText
							}
						>
							Play All
						</Text>
					</TouchableOpacity>
				)}
			</View>

			<FlatList
				data={playlist.tracks}
				renderItem={renderTrackItem}
				keyExtractor={(item) => item.id}
				contentContainerStyle={styles.trackList}
				ListEmptyComponent={
					<View style={styles.emptyContainer}>
						<Text style={styles.emptyText}>
							No tracks in this
							playlist
						</Text>
						<Text
							style={
								styles.emptySubtext
							}
						>
							Add tracks from your
							library
						</Text>
					</View>
				}
			/>
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
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 20,
		paddingTop: 60,
		paddingBottom: 20,
	},
	backButton: {
		padding: 8,
	},
	headerTitle: {
		flex: 1,
		color: "white",
		fontSize: 18,
		fontWeight: "bold",
		marginHorizontal: 16,
		textAlign: "center",
	},
	menuButton: {
		padding: 8,
	},
	playlistInfo: {
		alignItems: "center",
		padding: 20,
	},
	playlistIconLarge: {
		width: 120,
		height: 120,
		backgroundColor: "#282828",
		borderRadius: 8,
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 16,
	},
	playlistName: {
		color: "white",
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 8,
	},
	trackCount: {
		color: "#B3B3B3",
		fontSize: 16,
		marginBottom: 16,
	},
	playAllButton: {
		flexDirection: "row",
		backgroundColor: "#1DB954",
		paddingHorizontal: 24,
		paddingVertical: 12,
		borderRadius: 24,
		alignItems: "center",
	},
	playAllText: {
		color: "black",
		fontSize: 16,
		fontWeight: "bold",
		marginLeft: 8,
	},
	trackList: {
		paddingBottom: 130,
	},
	trackItem: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 12,
		paddingHorizontal: 20,
		borderBottomWidth: 1,
		borderBottomColor: "#282828",
	},
	trackIconContainer: {
		width: 40,
		height: 40,
		backgroundColor: "#282828",
		borderRadius: 4,
		justifyContent: "center",
		alignItems: "center",
	},
	trackInfo: {
		flex: 1,
		marginLeft: 12,
		marginRight: 8,
	},
	trackTitle: {
		color: "white",
		fontSize: 16,
		fontWeight: "500",
	},
	trackActions: {
		flexDirection: "row",
		alignItems: "center",
	},
	actionButton: {
		padding: 8,
		marginLeft: 8,
	},
	emptyContainer: {
		alignItems: "center",
		paddingTop: 40,
	},
	emptyText: {
		color: "white",
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 8,
	},
	emptySubtext: {
		color: "#B3B3B3",
		fontSize: 16,
	},
});
