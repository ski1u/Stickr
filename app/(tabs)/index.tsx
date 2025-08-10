import { useState } from "react";

import { MaterialIcons } from "@expo/vector-icons";
import { ImageSourcePropType, Pressable, View } from "react-native";

import Button from "@/components/button";
import EmojiList from "@/components/emoji-list";
import EmojiPicker from "@/components/emoji-picker";
import EmojiSticker from "@/components/emoji-sticker";
import IconButton from "@/components/icon-button";
import ImageViewer from "@/components/image-viewer";

import * as ImagePicker from "expo-image-picker";

import "@/global.css";

const placeholder_image = require("@/assets/images/background-image.png")

export default function Index() {
  const [image, setImage] = useState<string | undefined>(undefined)
  const [options, setOptions] = useState<boolean>(false)
  const [modal, setModal] = useState<boolean>(false)
  const [emoji, setEmoji] = useState<ImageSourcePropType | undefined>(undefined)

  const pickImage = async () => {
    let res = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      quality: 1
    })

    if (!res.canceled) { setImage(res.assets[0].uri) }
  }
  const saveImage = async () => {}

  // ---

  const onReset = () => { setOptions(false) }
  const closeModal = () => { setModal(false) }
  const onAddSticker = () => {
    setModal(true)
  }

  return (
    <View className="bg-[#121212] flex-1 items-center p-12 py-20">
      <View className="flex-1">
        <ImageViewer
          className="p-6"
          src={image || placeholder_image}
        />
        <View
          className="flex-row justify-center items-center"
        >{emoji && <EmojiSticker size={32} sticker={emoji} />}</View>
      </View>

      {options ? (
        <View
          className="flex-row items-center gap-20"
        >
          <IconButton
            icon="refresh"
            onClick={onReset}
          >Reset</IconButton>
          <Pressable
            className="bg-white rounded-full p-4"
            onPress={onAddSticker}
          ><MaterialIcons name="add" size={40} color="#000" /></Pressable>
          <IconButton
            icon="save-alt"
            onClick={saveImage}
          >Save</IconButton>
        </View>
      ) : (
        <View className="w-full flex-[1/3] items-center gap-4">
          <Button
            className="bg-[#1F6FEB]"
            textClassName="text-white"
            onClick={() => setOptions(true)}
          >
            Use this photo
          </Button>
          <Button
            variant="outline"
            icon="picture-o"
            iconColor="#ddd"
            onClick={pickImage}
          >
            {image ? "Choose another photo" : "Choose a photo"}
          </Button>
        </View>
      )}

      <EmojiPicker
        isVisible={modal}
        onClose={closeModal}
      >
        <EmojiList onSelect={setEmoji} onClose={closeModal} />
      </EmojiPicker>
    </View>
  );
}