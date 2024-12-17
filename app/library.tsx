import React, { useState, useContext } from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
	FlatList,
} from "react-native";
import { useRouter } from "expo-router";
import { PlayerContext } from "../context/PlayerContext";
import {
	Clock,
	List,
	Plus,
	Music2,
	ChevronRight,
	PlayCircle,
} from "lucide-react-native";

export default function LibraryScreen() {
	const router = useRouter();
	const { playlist: tracks, play } = useContext(PlayerContext);
	const [activeTab, setActiveTab] = useState("all");

	const recentlyPlayed = tracks.slice(0, 5); // Simulate recently played

	const tabs = [
		{ id: "all", label: "All Tracks", icon: List },
		{ id: "recent", label: "Recently Played", icon: Clock },
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
			<PlayCircle color="#B3B3B3" size={24} />
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
						style={styles.trackList}
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
			case "all":
				return (
					<FlatList
						data={tracks}
						renderItem={renderTrackItem}
						keyExtractor={(item) => item.id}
						style={styles.trackList}
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
			default:
				return null;
		}
	};

	const renderCreatePlaylist = () => (
		<TouchableOpacity style={styles.createPlaylist}>
			<View style={styles.createPlaylistIcon}>
				<Plus color="white" size={24} />
			</View>
			<View style={styles.createPlaylistInfo}>
				<Text style={styles.createPlaylistText}>
					Create Playlist
				</Text>
				<Text style={styles.createPlaylistSubtext}>
					Add your favorite tracks
				</Text>
			</View>
			<ChevronRight color="#B3B3B3" size={24} />
		</TouchableOpacity>
	);

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.headerTitle}>
					Your Library
				</Text>
			</View>

			<View style={styles.tabContainer}>
				{tabs.map((tab) => (
					<TouchableOpacity
						key={tab.id}
						style={[
							styles.tab,
							activeTab === tab.id &&
								styles.activeTab,
						]}
						onPress={() =>
							setActiveTab(tab.id)
						}
					>
						<tab.icon
							size={20}
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
			</View>

			{renderCreatePlaylist()}
			{renderContent()}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#121212",
	},
	header: {
		paddingHorizontal: 20,
		paddingTop: 60,
		paddingBottom: 20,
	},
	headerTitle: {
		color: "white",
		fontSize: 24,
		fontWeight: "bold",
	},
	tabContainer: {
		flexDirection: "row",
		paddingHorizontal: 20,
		marginBottom: 20,
	},
	tab: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 8,
		paddingHorizontal: 16,
		borderRadius: 20,
		backgroundColor: "#282828",
		marginRight: 10,
	},
	activeTab: {
		backgroundColor: "#333",
	},
	tabText: {
		color: "#B3B3B3",
		marginLeft: 8,
		fontSize: 14,
	},
	activeTabText: {
		color: "#1DB954",
	},
	trackList: {
		flex: 1,
		paddingBottom: 130, // Increased padding for both bottom elements
	},

	trackItem: {
		flexDirection: "row",
		alignItems: "center",
		padding: 16,
		borderBottomWidth: 1,
		borderBottomColor: "#282828",
	},
	trackIconContainer: {
		width: 40,
		height: 40,
		borderRadius: 4,
		backgroundColor: "#282828",
		justifyContent: "center",
		alignItems: "center",
		marginRight: 12,
	},
	trackInfo: {
		flex: 1,
		marginRight: 12,
	},
	trackTitle: {
		color: "white",
		fontSize: 16,
	},
	emptyText: {
		color: "#B3B3B3",
		textAlign: "center",
		marginTop: 40,
		fontSize: 16,
	},
	createPlaylist: {
		flexDirection: "row",
		alignItems: "center",
		padding: 16,
		borderBottomWidth: 1,
		borderBottomColor: "#282828",
		marginBottom: 20,
	},
	createPlaylistIcon: {
		width: 40,
		height: 40,
		borderRadius: 4,
		backgroundColor: "#1DB954",
		justifyContent: "center",
		alignItems: "center",
		marginRight: 12,
	},
	createPlaylistInfo: {
		flex: 1,
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
});
