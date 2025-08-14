import "@/global.css"

import SettingsRow from "@/components/settings-row"
import SettingsSection from "@/components/settings-section"
import { getSession, signOut } from "@/utils/supabase/auth"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useRouter } from "expo-router"
import { useColorScheme } from "nativewind"
import { useCallback, useEffect, useState } from "react"
import { ActivityIndicator, Alert, Switch, Text, View } from "react-native"
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import Button from "@/components/button"

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowBanner: true,
        shouldShowList: true,
        shouldPlaySound: true,
        shouldSetBadge: false
    })
})

export default function Settings() {
    const router = useRouter()

    const [isDarkMode, setIsDarkMode] = useState(false)
    const [email, setEmail] = useState<string>("")
    const [signingOut, setSigningOut] = useState(false)
    
    const { colorScheme, setColorScheme } = useColorScheme()

    useEffect(() => {
        AsyncStorage.getItem("theme").then((stored) => {
            setIsDarkMode(stored === "dark")
        })
        getSession().then(({ data }) => { setEmail(data.session!.user.email!) })
    }, [router])

    const toggleDarkMode = useCallback(async () => {
        const next = !isDarkMode
        setIsDarkMode(next)
        const target = next ? "dark" : "light"
        setColorScheme(target as any)
        await AsyncStorage.setItem("theme", target)
    }, [isDarkMode, setColorScheme])

    const handleSignOut = useCallback(async () => {
        setSigningOut(true)
        try {
            await signOut()
            router.replace("/(auth)/onboard-auth")
        } finally {
            setSigningOut(false)
        }
    }, [router])

    const requestNotif = async () => {
        const { status } = await Notifications.requestPermissionsAsync()
        if (status !== "granted") { Alert.alert("Notifications", "Permission for notifications not granted") }
    }; const scheduleNotif = async () => {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: "Hello from Stickr!",
                body: "This is a notification test"
            },
            trigger: { seconds: 5, repeats: false, type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL }
        })
    }

    return (
        <View className="flex-1 px-6 py-32 gap-8 bg-white dark:bg-[#121212]">
            <SettingsSection title="APP SETTINGS">
                <SettingsRow bordered={false} right={
                    <Switch
                        value={isDarkMode}
                        onValueChange={toggleDarkMode}
                        ios_backgroundColor="#2a2a2a"
                        trackColor={{ false: colorScheme === "dark" ? "#2a2a2a" : "#e5e5e5", true: "#1F6FEB55" }}
                        thumbColor={isDarkMode ? "#1F6FEB" : (colorScheme === "dark" ? "#888" : "#bbb")}
                    />
                }>
                    Dark Mode
                </SettingsRow>
            </SettingsSection>

            <SettingsSection title="ACCOUNT">
                <SettingsRow>
                    <View>
                        <Text className="text-black dark:text-white text-base">Account Details</Text>
                        <Text className="text-[#666] dark:text-[#999] text-sm mt-1">{email}</Text>
                    </View>
                </SettingsRow>
                <SettingsRow destructive onPress={handleSignOut} bordered={false} right={signingOut ? <ActivityIndicator size="small" color="#666" /> : null}>
                    Sign Out
                </SettingsRow>
            </SettingsSection>

            <SettingsSection title="NOTIFICATIONS">
                <SettingsRow
                    onPress={requestNotif}
                    right={
                        <Button
                            className="w-1/3 z-50"
                            onClick={scheduleNotif}
                        >Test</Button>
                    }
                >
                    Enable Notifications
                </SettingsRow>
            </SettingsSection>
        </View>
    )
}