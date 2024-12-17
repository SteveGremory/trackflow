import { useState } from "react";
import * as MediaLibrary from "expo-media-library";

export function useMusicLibrary() {
	const [tracks, setTracks] = useState([]);

	const requestPermission = async () => {
		try {
			const { status } =
				await MediaLibrary.requestPermissionsAsync();
			if (status === "granted") {
				await fetchTracks();
			}
		} catch (error) {
			console.error("Permission error:", error);
		}
	};

	const fetchTracks = async () => {
		try {
			const { assets } = await MediaLibrary.getAssetsAsync({
				mediaType: "audio",
				first: 1000, // Limit to first 1000 tracks
			});

			const formattedTracks = assets.map((track) => ({
				id: track.id,
				uri: track.uri,
				filename: track.filename,
				duration: track.duration,
			}));

			setTracks(formattedTracks);
		} catch (error) {
			console.error("Fetch tracks error:", error);
		}
	};

	return {
		tracks,
		requestPermission,
		fetchTracks,
	};
}
