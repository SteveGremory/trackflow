import React, { useState, useContext } from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	FlatList,
	ScrollView,
	SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";
import { PlayerContext } from "../context/PlayerContext";
import { PlaylistContext } from "../context/PlaylistContext";
import {
	Clock,
	List,
	Plus,
	Music2,
	ChevronRight,
	PlayCircle,
	Library,
} from "lucide-react-native";

export default function LibraryScreen() {
	const router = useRouter();
	const { playlist: tracks, play } = useContext(PlayerContext);
	const { playlists } = useContext(PlaylistContext);
	const [activeTab, setActiveTab] = useState("all");

	const recentlyPlayed = tracks.slice(0, 5); // Just for demonstration, should be managed in PlayerContext

	const tabs = [
		{ id: "all", label: "All Tracks", icon: List },
		{ id: "recent", label: "Recent", icon: Clock },
		{ id: "playlists", label: "Playlists", icon: Library },
	];

	const renderTrackItem = ({ item }) => (
		<TouchableOpacity
			style={styles.trackItem}
			onPress={() => play(item, tracks)}
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
			<TouchableOpacity
				style={styles.playButton}
				onPress={() => play(item, tracks)}
			>
				<PlayCircle color="#1DB954" size={24} />
			</TouchableOpacity>
		</TouchableOpacity>
	);

	const renderPlaylistItem = ({ item }) => (
		<TouchableOpacity
			style={styles.playlistItem}
			onPress={() => router.push(`/playlist/${item.id}`)}
		>
			<View style={styles.playlistIconContainer}>
				<Library color="#1DB954" size={24} />
			</View>
			<View style={styles.playlistInfo}>
				<Text
					style={styles.playlistTitle}
					numberOfLines={1}
				>
					{item.name}
				</Text>
				<Text style={styles.playlistSubtitle}>
					{item.tracks?.length || 0}{" "}
					{(item.tracks?.length || 0) === 1
						? "track"
						: "tracks"}
				</Text>
			</View>
			<ChevronRight color="#B3B3B3" size={24} />
		</TouchableOpacity>
	);

	const renderContent = () => {
		switch (activeTab) {
			case "recent":
				return (
					<FlatList
						data={recentlyPlayed}
						renderItem={renderTrackItem}
						keyExtractor={(item) => item.id}
						contentContainerStyle={
							styles.listContent
						}
						ListEmptyComponent={
							<Text
								style={
									styles.emptyText
								}
							>
								No recently
								played tracks
							</Text>
						}
					/>
				);
			case "playlists":
				return (
					<View style={styles.playlistsContainer}>
						<TouchableOpacity
							style={
								styles.createPlaylistButton
							}
							onPress={() =>
								router.push(
									"/playlist",
								)
							}
						>
							<View
								style={
									styles.createPlaylistIcon
								}
							>
								<Plus
									color="white"
									size={
										24
									}
								/>
							</View>
							<View
								style={
									styles.createPlaylistInfo
								}
							>
								<Text
									style={
										styles.createPlaylistText
									}
								>
									Create
									Playlist
								</Text>
								<Text
									style={
										styles.createPlaylistSubtext
									}
								>
									Add your
									favorite
									tracks
								</Text>
							</View>
							<ChevronRight
								color="#B3B3B3"
								size={24}
							/>
						</TouchableOpacity>

						<FlatList
							data={playlists}
							renderItem={
								renderPlaylistItem
							}
							keyExtractor={(item) =>
								item.id
							}
							contentContainerStyle={
								styles.listContent
							}
							ListEmptyComponent={
								<Text
									style={
										styles.emptyText
									}
								>
									No
									playlists
									yet
								</Text>
							}
						/>
					</View>
				);
			default: // 'all' tab
				return (
					<FlatList
						data={tracks}
						renderItem={renderTrackItem}
						keyExtractor={(item) => item.id}
						contentContainerStyle={
							styles.listContent
						}
						ListEmptyComponent={
							<Text
								style={
									styles.emptyText
								}
							>
								No tracks found
							</Text>
						}
					/>
				);
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.headerTitle}>
					Your Library
				</Text>
			</View>

			<View style={styles.tabContainer}>
				<ScrollView
					horizontal
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={styles.tabScroll}
				>
					{tabs.map((tab) => (
						<TouchableOpacity
							key={tab.id}
							style={[
								styles.tab,
								activeTab ===
									tab.id &&
									styles.activeTab,
							]}
							onPress={() =>
								setActiveTab(
									tab.id,
								)
							}
						>
							<tab.icon
								size={18}
								color={
									activeTab ===
									tab.id
										? "#1DB954"
										: "#B3B3B3"
								}
							/>
							<Text
								style={[
									styles.tabText,
									activeTab ===
										tab.id &&
										styles.activeTabText,
								]}
							>
								{tab.label}
							</Text>
						</TouchableOpacity>
					))}
				</ScrollView>
			</View>

			<View style={styles.content}>{renderContent()}</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#121212",
	},
	header: {
		paddingHorizontal: 20,
		paddingTop: 20,
		paddingBottom: 16,
	},
	headerTitle: {
		color: "white",
		fontSize: 24,
		fontWeight: "bold",
	},
	tabContainer: {
		marginBottom: 16,
	},
	tabScroll: {
		paddingHorizontal: 20,
	},
	tab: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 8,
		paddingHorizontal: 16,
		borderRadius: 20,
		backgroundColor: "#282828",
		marginRight: 8,
	},
	activeTab: {
		backgroundColor: "#333333",
	},
	tabText: {
		color: "#B3B3B3",
		marginLeft: 8,
		fontSize: 14,
		fontWeight: "500",
	},
	activeTabText: {
		color: "#1DB954",
	},
	content: {
		flex: 1,
	},
	listContent: {
		paddingBottom: 130, // Space for bottom nav and mini player
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
	playButton: {
		padding: 8,
	},
	playlistsContainer: {
		flex: 1,
	},
	createPlaylistButton: {
		flexDirection: "row",
		alignItems: "center",
		padding: 16,
		marginHorizontal: 20,
		marginBottom: 16,
		backgroundColor: "#282828",
		borderRadius: 8,
	},
	createPlaylistIcon: {
		width: 40,
		height: 40,
		backgroundColor: "#1DB954",
		borderRadius: 4,
		justifyContent: "center",
		alignItems: "center",
	},
	createPlaylistInfo: {
		flex: 1,
		marginLeft: 12,
	},
	createPlaylistText: {
		color: "white",
		fontSize: 16,
		fontWeight: "bold",
	},
	createPlaylistSubtext: {
		color: "#B3B3B3",
		fontSize: 14,
		marginTop: 2,
	},
	playlistItem: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 12,
		paddingHorizontal: 20,
		borderBottomWidth: 1,
		borderBottomColor: "#282828",
	},
	playlistIconContainer: {
		width: 40,
		height: 40,
		backgroundColor: "#282828",
		borderRadius: 4,
		justifyContent: "center",
		alignItems: "center",
	},
	playlistInfo: {
		flex: 1,
		marginLeft: 12,
	},
	playlistTitle: {
		color: "white",
		fontSize: 16,
		fontWeight: "500",
	},
	playlistSubtitle: {
		color: "#B3B3B3",
		fontSize: 14,
		marginTop: 2,
	},
	emptyText: {
		color: "#B3B3B3",
		fontSize: 16,
		textAlign: "center",
		marginTop: 40,
	},
});
