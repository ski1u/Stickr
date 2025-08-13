import "@/global.css"

import { View, Text, TextInput } from "react-native"
import { Link } from "expo-router"
import Button from "./button"

import { MaterialIcons } from "@expo/vector-icons"

import { signIn, signUp } from "@/utils/supabase/auth"

export default function Auth({ type = "sign-in" } : {
    type?: "sign-in" | "sign-up"
}) {
    return (
        <>
            <View
                className="flex-1 justify-center items-center"
            >
                
            </View>
            <View style={{ paddingBottom: 50, paddingLeft: 32 }}><MaterialIcons name="arrow-back" color="#fff" size={28} /></View>
        </>
    )
}