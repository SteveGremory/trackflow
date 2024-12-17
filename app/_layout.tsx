import React from "react";
import { View, StyleSheet } from "react-native";
import { Stack, usePathname } from "expo-router";
import { PlayerProvider } from "../context/PlayerContext";
import { PlaylistProvider } from "../context/PlaylistContext";
import MiniPlayer from "../components/MiniPlayer";
import BottomNav from "../components/BottomNav";

export default function Layout() {
	const pathname = usePathname();
	const showMiniPlayer = pathname !== "/player";

	return (
		<PlayerProvider>
			<PlaylistProvider>
				<View style={styles.container}>
					<Stack
						screenOptions={{
							headerShown: false,
							contentStyle: {
								backgroundColor:
									"#121212",
							},
						}}
					/>
					{showMiniPlayer && (
						<>
							<MiniPlayer />
							<BottomNav />
						</>
					)}
				</View>
			</PlaylistProvider>
		</PlayerProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	bottomElements: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: "#282828",
		borderTopWidth: 1,
		borderTopColor: "#383838",
	},
});
