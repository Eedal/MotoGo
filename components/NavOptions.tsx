import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";

type StackOptions = {
  id: string;
  title: string;
  image: string;
  screen: keyof RootStackParamList
}

const options: StackOptions[] = [
  {
    id: "1",
    title: "Una carrera",
    image: "https://i.imgur.com/b43mlKc.png",
    screen: "MapScreen",
  },
  {
    id: "2",
    title: "Un pedido",
    image: "https://i.imgur.com/lVHHrWN.png",
    screen: "OrderScreen",
  },
];

const NavOptions = () => {
  const navigation =
    useNavigation <NativeStackNavigationProp<RootStackParamList>>();

  return (
    <FlatList
      data={options}
      horizontal
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => navigation.navigate(item.screen)}
          className="p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2 w-40"
        >
          <View>
            <Image
              style={{
                width: 120,
                height: 120,
                resizeMode: "contain",
              }}
              source={{
                uri: item.image,
              }}
            />
            <Text className="mt-2 text-lg font-semibold text-center">
              {item.title}
            </Text>
            <Icon
              className="p-2 bg-black rounded-full w-10 mt-4"
              name="arrowright"
              color="white"
              type="antdesign"
            />
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default NavOptions;
