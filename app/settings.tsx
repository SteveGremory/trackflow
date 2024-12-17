import React from "react";
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	Switch,
	ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import {
	ChevronRight,
	Volume2,
	HardDrive,
	FileAudio,
	Info,
	Settings as SettingsIcon,
	Bell,
} from "lucide-react-native";

export default function SettingsScreen() {
	const router = useRouter();

	const settingsOptions = [
		{
			title: "Audio Settings",
			icon: Volume2,
			options: [
				{
					label: "Gapless Playback",
					type: "switch",
					value: true,
				},
				{
					label: "Normalize Volume",
					type: "switch",
					value: false,
				},
			],
		},
		{
			title: "Storage",
			icon: HardDrive,
			options: [
				{ label: "Scan Media Storage", type: "button" },
				{ label: "Clear Cache", type: "button" },
			],
		},
		{
			title: "Audio Format",
			icon: FileAudio,
			options: [
				{
					label: "Show File Extensions",
					type: "switch",
					value: false,
				},
			],
		},
		{
			title: "Notifications",
			icon: Bell,
			options: [
				{
					label: "Media Controls",
					type: "switch",
					value: true,
				},
			],
		},
		{
			title: "About",
			icon: Info,
			options: [
				{
					label: "Version",
					type: "info",
					value: "1.0.0",
				},
				{ label: "Licenses", type: "button" },
			],
		},
	];

	const renderOption = (option) => {
		switch (option.type) {
			case "switch":
				return (
					<Switch
						value={option.value}
						onValueChange={() => {}}
						trackColor={{
							false: "#767577",
							true: "#1DB954",
						}}
						thumbColor={
							option.value
								? "#fff"
								: "#f4f3f4"
						}
					/>
				);
			case "info":
				return (
					<Text style={styles.infoText}>
						{option.value}
					</Text>
				);
			case "button":
				return (
					<ChevronRight
						size={20}
						color="#B3B3B3"
					/>
				);
			default:
				return null;
		}
	};

	return (
		<ScrollView
			style={styles.container}
			contentContainerStyle={styles.contentContainer}
		>
			<View style={styles.header}>
				<Text style={styles.headerTitle}>Settings</Text>
			</View>

			{settingsOptions.map((section, index) => (
				<View key={index} style={styles.section}>
					<View style={styles.sectionHeader}>
						<section.icon
							size={20}
							color="#1DB954"
						/>
						<Text
							style={
								styles.sectionTitle
							}
						>
							{section.title}
						</Text>
					</View>

					{section.options.map(
						(option, optionIndex) => (
							<TouchableOpacity
								key={
									optionIndex
								}
								style={
									styles.option
								}
								onPress={() => {}}
							>
								<Text
									style={
										styles.optionLabel
									}
								>
									{
										option.label
									}
								</Text>
								{renderOption(
									option,
								)}
							</TouchableOpacity>
						),
					)}
				</View>
			))}
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#121212",
	},
	contentContainer: {
		paddingBottom: 130, // Added padding for MiniPlayer and BottomNav
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
	section: {
		marginBottom: 20,
	},
	sectionHeader: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 20,
		paddingVertical: 10,
	},
	sectionTitle: {
		color: "#1DB954",
		fontSize: 16,
		fontWeight: "600",
		marginLeft: 10,
	},
	option: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingVertical: 15,
		paddingHorizontal: 20,
		borderBottomWidth: 1,
		borderBottomColor: "#282828",
	},
	optionLabel: {
		color: "white",
		fontSize: 16,
	},
	infoText: {
		color: "#B3B3B3",
		fontSize: 14,
	},
});
