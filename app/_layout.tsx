import React from "react";
import { View, StyleSheet } from "react-native";
import { Stack, usePathname } from "expo-router";
import { PlayerProvider } from "../context/PlayerContext";
import MiniPlayer from "../components/MiniPlayer";
import BottomNav from "../components/BottomNav";

export default function Layout() {
	const pathname = usePathname();
	const showBottomElements = pathname !== "/player";

	return (
		<PlayerProvider>
			<View style={styles.container}>
				<Stack
					screenOptions={{
						headerStyle: {
							backgroundColor:
								"#121212",
						},
						headerTintColor: "#fff",
						headerTitleStyle: {
							fontWeight: "bold",
						},
						contentStyle: {
							backgroundColor:
								"#121212",
						},
						headerShown: false,
					}}
				/>
				{showBottomElements && (
					<View style={styles.bottomElements}>
						<MiniPlayer />
						<BottomNav />
					</View>
				)}
			</View>
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
