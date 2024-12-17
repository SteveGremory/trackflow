import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useRouter, usePathname } from "expo-router";
import { Home, Library, Settings } from "lucide-react-native";

export default function BottomNav() {
	const router = useRouter();
	const pathname = usePathname();

	const isActive = (path) => pathname === path;

	const routes = [
		{ name: "Home", icon: Home, path: "/" },
		{ name: "Library", icon: Library, path: "/library" },
		{ name: "Settings", icon: Settings, path: "/settings" },
	];

	if (pathname === "/player") return null;

	return (
		<View style={styles.container}>
			{routes.map((route) => (
				<TouchableOpacity
					key={route.path}
					style={styles.tab}
					onPress={() => router.push(route.path)}
				>
					<route.icon
						size={24}
						color={
							isActive(route.path)
								? "#1DB954"
								: "#B3B3B3"
						}
					/>
					<Text
						style={[
							styles.tabText,
							isActive(route.path) &&
								styles.activeTabText,
						]}
					>
						{route.name}
					</Text>
				</TouchableOpacity>
			))}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		backgroundColor: "#282828",
		paddingBottom: 20, // Add extra padding for iPhone home indicator
		borderTopWidth: 1,
		borderTopColor: "#383838",
	},
	tab: {
		flex: 1,
		alignItems: "center",
		paddingVertical: 8,
	},
	tabText: {
		color: "#B3B3B3",
		fontSize: 12,
		marginTop: 4,
	},
	activeTabText: {
		color: "#1DB954",
	},
});
