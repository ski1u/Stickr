import "@/global.css"

import { getSession, signIn, signUp } from "@/utils/supabase/auth"
import { Link, useRouter } from "expo-router"
import { useEffect, useMemo, useState } from "react"
import { Pressable, Text, View } from "react-native"
import { z } from "zod"
import Button from "./button"
import IconTextInput from "./icon-text-input"

import { MaterialIcons } from "@expo/vector-icons"
import { useColorScheme } from "nativewind"

export default function Auth({ type = "sign-in" } : {
    type?: "sign-in" | "sign-up"
}) {
    const router = useRouter()
    const { colorScheme } = useColorScheme()
    const isSignIn = type === "sign-in"
    
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const schema = useMemo(() => z.object({
        email: z.email("Enter a valid email"),
        password: z.string().min(6, "Password must be at least 6 characters"),
    }), [])

    useEffect(() => {
        getSession().then(({ data }) => {
            if (data.session) {
                router.replace("/(tabs)")
            }
        })
    }, [router])

    async function onSubmit() {
        setError(null)
        const parsed = schema.safeParse({ email, password })
        if (!parsed.success) {
            const first = parsed.error.issues[0]
            setError(first?.message || "Invalid form input")
            return
        }; setLoading(true)
        try {
            const action = isSignIn ? signIn : signUp
            const { data, error: authError } = await action(email.trim(), password)
            if (authError) { setError(authError.message); return }
            if (!data?.user) { setError("No user returned from server"); return }
            router.replace("/(tabs)")
        } catch (e: any) { setError(e?.message || "Something went wrong") }
        finally { setLoading(false) }
    }

    return (
        <View className="flex-1 bg-white dark:bg-[#121212]">
            <View
                className="flex-1 justify-center p-8 bg-white dark:bg-[#121212]"
            >
                <Text className="text-black dark:text-white font-bold tracking-tighter text-3xl">{isSignIn ? "Sign in" : "Sign up"}</Text>
                <View className="mt-6 w-11/12 gap-4">
                    <IconTextInput
                        iconName="email"
                        placeholder="Email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoComplete="email"
                        value={email}
                        onChangeText={setEmail}
                    />
                    <IconTextInput
                        iconName="lock"
                        placeholder="Password"
                        secureTextEntry
                        autoCapitalize="none"
                        autoComplete="password"
                        value={password}
                        onChangeText={setPassword}
                    />
                    {error && <Text className="text-red-600 dark:text-red-400 text-xs">{error}</Text>}
                    {isSignIn && <Text className="text-blue-600 dark:text-blue-400 text-sm">Forgot Password?</Text>}
                    <Button
                        className="mt-6"
                        onClick={onSubmit}
                        loading={loading}
                        disabled={loading}
                    >{isSignIn ? "Sign in" : "Sign up"}</Button>
                    <Link
                        href={isSignIn ? "/(auth)/sign-up" : "/(auth)/sign-in"}
                        className="text-[#111] dark:text-white text-xs underline underline-offset-8 text-center"
                    >
                            {isSignIn ? "Don't have an account yet? Sign up" : "Already have an account? Sign in"}
                    </Link>
                </View>
            </View>

            <Pressable
                onPress={() => {
                    if (router.canGoBack()) {
                        router.back()
                    } else {
                        router.replace("/")
                    }
                }}
                style={{ paddingBottom: 50, paddingLeft: 32 }}
            >
                <MaterialIcons name="arrow-back" color={colorScheme === "dark" ? "#fff" : "#333"} size={28} />
            </Pressable>
        </View>
    )
}