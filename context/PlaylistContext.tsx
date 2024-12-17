import React, { createContext, useState } from "react";

export const PlaylistContext = createContext();

export function PlaylistProvider({ children }) {
	const [playlists, setPlaylists] = useState([]);

	const createPlaylist = (name) => {
		const newPlaylist = {
			id: Date.now().toString(),
			name,
			tracks: [],
		};
		setPlaylists((prev) => [...prev, newPlaylist]);
		return newPlaylist.id;
	};

	const addTrackToPlaylist = (playlistId, track) => {
		setPlaylists((prev) =>
			prev.map((playlist) => {
				if (playlist.id === playlistId) {
					return {
						...playlist,
						tracks: [
							...playlist.tracks,
							track,
						],
					};
				}
				return playlist;
			}),
		);
	};

	const removeTrackFromPlaylist = (playlistId, trackId) => {
		setPlaylists((prev) =>
			prev.map((playlist) => {
				if (playlist.id === playlistId) {
					return {
						...playlist,
						tracks: playlist.tracks.filter(
							(track) =>
								track.id !==
								trackId,
						),
					};
				}
				return playlist;
			}),
		);
	};

	const deletePlaylist = (playlistId) => {
		setPlaylists((prev) =>
			prev.filter((playlist) => playlist.id !== playlistId),
		);
	};

	return (
		<PlaylistContext.Provider
			value={{
				playlists,
				createPlaylist,
				addTrackToPlaylist,
				removeTrackFromPlaylist,
				deletePlaylist,
			}}
		>
			{children}
		</PlaylistContext.Provider>
	);
}
