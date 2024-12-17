import React, { useContext, useState, useEffect } from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Dimensions,
	Image,
} from "react-native";
import Slider from "@react-native-community/slider";
import { useRouter } from "expo-router";
import { PlayerContext } from "../context/PlayerContext";
import {
	ChevronDown,
	Play,
	Pause,
	SkipBack,
	SkipForward,
	Repeat,
	Shuffle,
	Music,
	Forward,
	Rewind,
	Volume2,
} from "lucide-react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const ALBUM_ART_SIZE = SCREEN_WIDTH - 80;

export default function PlayerScreen() {
	const router = useRouter();
	const {
		currentTrack,
		isPlaying,
		togglePlayPause,
		seekTo,
		duration,
		position,
		skipToNext,
		skipToPrevious,
		fastForward,
		rewind,
		shuffleMode,
		toggleShuffle,
		repeatMode,
		toggleRepeat,
	} = useContext(PlayerContext);

	const [sliderValue, setSliderValue] = useState(0);
	const [isSeeking, setIsSeeking] = useState(false);

	useEffect(() => {
		if (!isSeeking && duration > 0) {
			setSliderValue(position / duration);
		}
	}, [position, duration, isSeeking]);

	if (!currentTrack) {
		router.back();
		return null;
	}

	const formatTime = (seconds) => {
		const mins = Math.floor(seconds / 60);
		const secs = Math.floor(seconds % 60);
		return `${mins}:${secs.toString().padStart(2, "0")}`;
	};

	const handleSeek = (value) => {
		const newPosition = value * duration;
		setSliderValue(value);
		seekTo(newPosition);
	};

	const getRepeatColor = () => {
		switch (repeatMode) {
			case "one":
			case "all":
				return "#1DB954";
			default:
				return "#B3B3B3";
		}
	};

	const getTrackTitle = () => {
		return currentTrack.filename
			.replace(/\.[^/.]+$/, "") // Remove file extension
			.split("-")
			.map((part) => part.trim())
			.join(" - ");
	};

	return (
		<View style={styles.container}>
			{/* Header */}
			<View style={styles.header}>
				<TouchableOpacity
					style={styles.backButton}
					onPress={() => router.back()}
				>
					<ChevronDown color="white" size={28} />
				</TouchableOpacity>
				<Text style={styles.headerTitle}>
					Now Playing
				</Text>
				<View style={styles.headerRight} />
			</View>

			{/* Album Art */}
			<View style={styles.albumContainer}>
				<View style={styles.albumArt}>
					<Music
						size={ALBUM_ART_SIZE / 3}
						color="#1DB954"
					/>
				</View>
			</View>

			{/* Track Info */}
			<View style={styles.trackInfo}>
				<Text
					style={styles.trackTitle}
					numberOfLines={1}
				>
					{getTrackTitle()}
				</Text>
			</View>

			{/* Progress Bar */}
			<View style={styles.progressContainer}>
				<Slider
					style={styles.slider}
					minimumValue={0}
					maximumValue={1}
					value={sliderValue}
					onSlidingStart={() =>
						setIsSeeking(true)
					}
					onSlidingComplete={(value) => {
						setIsSeeking(false);
						handleSeek(value);
					}}
					minimumTrackTintColor="#1DB954"
					maximumTrackTintColor="#4f4f4f"
					thumbTintColor="#1DB954"
				/>
				<View style={styles.timeContainer}>
					<Text style={styles.timeText}>
						{formatTime(position)}
					</Text>
					<Text style={styles.timeText}>
						{formatTime(duration)}
					</Text>
				</View>
			</View>

			{/* Controls */}
			<View style={styles.controlsContainer}>
				{/* Top Row - Shuffle & Repeat */}
				<View style={styles.topControls}>
					<TouchableOpacity
						style={styles.sideControl}
						onPress={toggleShuffle}
					>
						<Shuffle
							size={20}
							color={
								shuffleMode
									? "#1DB954"
									: "#B3B3B3"
							}
						/>
					</TouchableOpacity>

					<TouchableOpacity
						style={styles.sideControl}
						onPress={toggleRepeat}
					>
						<View>
							<Repeat
								size={20}
								color={getRepeatColor()}
							/>
							{repeatMode ===
								"one" && (
								<Text
									style={
										styles.repeatOneText
									}
								>
									1
								</Text>
							)}
						</View>
					</TouchableOpacity>
				</View>

				{/* Main Controls */}
				<View style={styles.mainControls}>
					<TouchableOpacity
						style={styles.secondaryButton}
						onPress={rewind}
					>
						<Rewind
							size={24}
							color="white"
						/>
					</TouchableOpacity>

					<TouchableOpacity
						style={styles.secondaryButton}
						onPress={skipToPrevious}
					>
						<SkipBack
							size={32}
							color="white"
						/>
					</TouchableOpacity>

					<TouchableOpacity
						style={styles.playButton}
						onPress={togglePlayPause}
					>
						{isPlaying ? (
							<Pause
								size={40}
								color="black"
							/>
						) : (
							<Play
								size={40}
								color="black"
								fill="black"
							/>
						)}
					</TouchableOpacity>

					<TouchableOpacity
						style={styles.secondaryButton}
						onPress={skipToNext}
					>
						<SkipForward
							size={32}
							color="white"
						/>
					</TouchableOpacity>

					<TouchableOpacity
						style={styles.secondaryButton}
						onPress={fastForward}
					>
						<Forward
							size={24}
							color="white"
						/>
					</TouchableOpacity>
				</View>

				{/* Volume */}
				<View style={styles.volumeContainer}>
					<Volume2 size={20} color="#B3B3B3" />
					<Slider
						style={styles.volumeSlider}
						minimumValue={0}
						maximumValue={1}
						value={1}
						minimumTrackTintColor="#1DB954"
						maximumTrackTintColor="#4f4f4f"
						thumbTintColor="#1DB954"
					/>
				</View>
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
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 20,
		paddingTop: 50,
		paddingBottom: 20,
	},
	backButton: {
		padding: 8,
	},
	headerTitle: {
		color: "white",
		fontSize: 16,
		fontWeight: "600",
	},
	headerRight: {
		width: 44,
	},
	albumContainer: {
		alignItems: "center",
		marginVertical: 30,
	},
	albumArt: {
		width: ALBUM_ART_SIZE,
		height: ALBUM_ART_SIZE,
		backgroundColor: "#282828",
		borderRadius: 8,
		justifyContent: "center",
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.3,
		shadowRadius: 4.65,
		elevation: 8,
	},
	trackInfo: {
		alignItems: "center",
		paddingHorizontal: 40,
		marginBottom: 20,
	},
	trackTitle: {
		color: "white",
		fontSize: 24,
		fontWeight: "bold",
		textAlign: "center",
	},
	progressContainer: {
		paddingHorizontal: 20,
		marginBottom: 20,
	},
	slider: {
		width: "100%",
		height: 40,
	},
	timeContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: 15,
	},
	timeText: {
		color: "#B3B3B3",
		fontSize: 12,
	},
	controlsContainer: {
		paddingHorizontal: 20,
		alignItems: "center",
	},
	topControls: {
		flexDirection: "row",
		justifyContent: "space-between",
		width: "100%",
		marginBottom: 20,
	},
	mainControls: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		width: "100%",
		marginBottom: 30,
	},
	sideControl: {
		padding: 10,
	},
	playButton: {
		width: 64,
		height: 64,
		backgroundColor: "#1DB954",
		borderRadius: 32,
		justifyContent: "center",
		alignItems: "center",
		marginHorizontal: 20,
	},
	secondaryButton: {
		padding: 10,
	},
	repeatOneText: {
		position: "absolute",
		color: "#1DB954",
		fontSize: 10,
		fontWeight: "bold",
		width: "100%",
		textAlign: "center",
		top: "50%",
		marginTop: -7,
	},
	volumeContainer: {
		flexDirection: "row",
		alignItems: "center",
		width: "100%",
		paddingHorizontal: 10,
	},
	volumeSlider: {
		flex: 1,
		height: 40,
		marginLeft: 10,
	},
});
