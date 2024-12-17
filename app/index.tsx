import React, { useState, useEffect, useContext, useMemo } from "react";
import {
	View,
	Text,
	FlatList,
	StyleSheet,
	TouchableOpacity,
} from "react-native";
import { useMusicLibrary } from "../hooks/useMusicLibrary";
import { PlayerContext } from "../context/PlayerContext";
import TrackItem from "../components/TrackItem";
import SearchBar from "../components/SearchBar";
import { Minus } from "lucide-react-native";

export default function HomeScreen() {
	const { tracks, requestPermission } = useMusicLibrary();
	const { setCurrentTrack, play } = useContext(PlayerContext);
	const [searchQuery, setSearchQuery] = useState("");

	useEffect(() => {
		requestPermission();
	}, []);

	const filteredTracks = useMemo(() => {
		if (!searchQuery.trim()) return tracks;

		const searchTerms = searchQuery.toLowerCase().split(" ");
		return tracks.filter((track) => {
			const trackName = track.filename.toLowerCase();
			return searchTerms.every((term) =>
				trackName.includes(term),
			);
		});
	}, [tracks, searchQuery]);

	const handleTrackSelect = (track) => {
		setCurrentTrack(track);
		play(track, tracks);
	};

	const renderEmptyState = () => (
		<View style={styles.emptyContainer}>
			<Text style={styles.emptyText}>
				{tracks.length === 0
					? "No tracks found. Grant permissions to access your music."
					: "No matches found for your search."}
			</Text>
			{tracks.length === 0 && (
				<TouchableOpacity
					onPress={requestPermission}
					style={styles.permissionButton}
				>
					<Text style={styles.buttonText}>
						Request Permissions
					</Text>
				</TouchableOpacity>
			)}
		</View>
	);

	return (
		<View style={styles.container}>
			<View style={styles.headerContainer}>
				<Text style={styles.title}>TrackFlow</Text>
				<Minus color="white" size={24} />
			</View>

			<SearchBar
				value={searchQuery}
				onChangeText={setSearchQuery}
			/>

			<FlatList
				data={filteredTracks}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<TrackItem
						track={item}
						onPress={() =>
							handleTrackSelect(item)
						}
					/>
				)}
				contentContainerStyle={styles.listContainer}
				ListEmptyComponent={renderEmptyState}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#121212",
	},
	headerContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		padding: 20,
		paddingTop: 50,
	},
	title: {
		color: "white",
		fontSize: 24,
		fontWeight: "bold",
	},
	emptyContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		paddingTop: 50,
	},
	emptyText: {
		color: "#B3B3B3",
		fontSize: 16,
		textAlign: "center",
		marginHorizontal: 20,
		marginBottom: 20,
	},
	permissionButton: {
		backgroundColor: "#1DB954",
		padding: 15,
		borderRadius: 10,
	},
	buttonText: {
		color: "white",
		fontWeight: "bold",
	},
	listContainer: {
		paddingBottom: 130,
	},
});
