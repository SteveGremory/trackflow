import React, { createContext, useState, useRef, useEffect } from "react";
import { Audio } from "expo-av";

export const PlayerContext = createContext();

export function PlayerProvider({ children }) {
	const [currentTrack, setCurrentTrack] = useState(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [duration, setDuration] = useState(0);
	const [position, setPosition] = useState(0);
	const [playlist, setPlaylist] = useState([]);
	const [shuffleMode, setShuffleMode] = useState(false);
	const [repeatMode, setRepeatMode] = useState("off"); // 'off', 'all', 'one'
	const soundRef = useRef(null);
	const positionUpdateInterval = useRef(null);

	useEffect(() => {
		return () => {
			cleanupPlayback();
		};
	}, []);

	const cleanupPlayback = async () => {
		if (soundRef.current) {
			await soundRef.current.unloadAsync();
		}
		if (positionUpdateInterval.current) {
			clearInterval(positionUpdateInterval.current);
		}
	};

	const startPositionUpdate = async () => {
		if (positionUpdateInterval.current) {
			clearInterval(positionUpdateInterval.current);
		}

		positionUpdateInterval.current = setInterval(async () => {
			if (soundRef.current) {
				const status =
					await soundRef.current.getStatusAsync();
				if (status.isLoaded) {
					setPosition(
						status.positionMillis / 1000,
					);
					setDuration(
						status.durationMillis / 1000,
					);

					// Check if we're at the end of the track
					if (
						status.positionMillis >=
						status.durationMillis - 200
					) {
						await handleTrackCompletion();
					}
				}
			}
		}, 1000);
	};

	const handleTrackCompletion = async () => {
		switch (repeatMode) {
			case "one":
				await seekTo(0);
				await resume();
				break;
			case "all":
				await skipToNext();
				break;
			case "off":
				if (
					getCurrentTrackIndex() <
					playlist.length - 1
				) {
					await skipToNext();
				} else {
					await pause();
					await seekTo(0);
				}
				break;
		}
	};

	const getCurrentTrackIndex = () => {
		return playlist.findIndex(
			(track) => track.id === currentTrack?.id,
		);
	};

	const getNextTrackIndex = () => {
		const currentIndex = getCurrentTrackIndex();

		if (shuffleMode) {
			const availableIndices = Array.from(
				{ length: playlist.length },
				(_, i) => i,
			).filter((i) => i !== currentIndex);

			return availableIndices[
				Math.floor(
					Math.random() * availableIndices.length,
				)
			];
		}

		return (currentIndex + 1) % playlist.length;
	};

	const getPreviousTrackIndex = () => {
		const currentIndex = getCurrentTrackIndex();

		if (shuffleMode) {
			const availableIndices = Array.from(
				{ length: playlist.length },
				(_, i) => i,
			).filter((i) => i !== currentIndex);

			return availableIndices[
				Math.floor(
					Math.random() * availableIndices.length,
				)
			];
		}

		return (currentIndex - 1 + playlist.length) % playlist.length;
	};

	const play = async (track, tracks = []) => {
		try {
			await cleanupPlayback();

			if (tracks.length > 0) {
				setPlaylist(tracks);
			}

			const { sound } = await Audio.Sound.createAsync(
				{ uri: track.uri },
				{ shouldPlay: true },
				async (status) => {
					if (status.isLoaded) {
						setPosition(
							status.positionMillis /
								1000,
						);
						setDuration(
							status.durationMillis /
								1000,
						);

						if (status.didJustFinish) {
							await handleTrackCompletion();
						}
					}
				},
			);

			soundRef.current = sound;
			setCurrentTrack(track);
			setIsPlaying(true);
			startPositionUpdate();
		} catch (error) {
			console.error("Error playing track:", error);
		}
	};

	const pause = async () => {
		if (soundRef.current) {
			await soundRef.current.pauseAsync();
			setIsPlaying(false);
		}
	};

	const resume = async () => {
		if (soundRef.current) {
			await soundRef.current.playAsync();
			setIsPlaying(true);
		}
	};

	const togglePlayPause = async () => {
		if (isPlaying) {
			await pause();
		} else {
			await resume();
		}
	};

	const seekTo = async (seconds) => {
		if (soundRef.current) {
			await soundRef.current.setPositionAsync(seconds * 1000);
			setPosition(seconds);

			// Check if we've seeked to the end
			if (seconds >= duration - 0.2) {
				await handleTrackCompletion();
			}
		}
	};

	const fastForward = async () => {
		const newPosition = Math.min(position + 10, duration);
		await seekTo(newPosition);
	};

	const rewind = async () => {
		const newPosition = Math.max(position - 10, 0);
		await seekTo(newPosition);
	};

	const skipToNext = async () => {
		if (playlist.length === 0) return;

		const nextIndex = getNextTrackIndex();
		await play(playlist[nextIndex]);
	};

	const skipToPrevious = async () => {
		if (playlist.length === 0) return;

		// If we're more than 3 seconds into the song, restart it
		if (position > 3) {
			await seekTo(0);
			return;
		}

		const previousIndex = getPreviousTrackIndex();
		await play(playlist[previousIndex]);
	};

	const toggleShuffle = () => {
		setShuffleMode((prev) => !prev);
	};

	const toggleRepeat = () => {
		setRepeatMode((current) => {
			switch (current) {
				case "off":
					return "all";
				case "all":
					return "one";
				case "one":
					return "off";
				default:
					return "off";
			}
		});
	};

	return (
		<PlayerContext.Provider
			value={{
				currentTrack,
				setCurrentTrack,
				isPlaying,
				play,
				pause,
				resume,
				togglePlayPause,
				duration,
				position,
				seekTo,
				skipToNext,
				skipToPrevious,
				fastForward,
				rewind,
				shuffleMode,
				toggleShuffle,
				repeatMode,
				toggleRepeat,
				playlist,
				setPlaylist,
			}}
		>
			{children}
		</PlayerContext.Provider>
	);
}
