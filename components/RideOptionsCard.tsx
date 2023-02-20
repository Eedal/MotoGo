import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image,
  Alert,
} from "react-native";
import React, { useCallback, useMemo, useState } from "react";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { useSelector } from "react-redux";
import { selectTravelTimeInformation } from "../features/nav/navSlice";

interface OptionsRide {
  id: string;
  title: string;
  multiplier: number;
  image: string;
}

const options: OptionsRide[] = [
  {
    id: "Moto-100-1",
    title: "Moto económica",
    multiplier: 1,
    image: "https://i.imgur.com/3x8co7r.png",
  },
  {
    id: "Moto-125-2",
    title: "Moto presentable",
    multiplier: 1.2,
    image: "https://i.imgur.com/U9yG3kN.png",
  },
  {
    id: "Moto-150-3",
    title: "Moto firme",
    multiplier: 1.75,
    image: "https://i.imgur.com/m1hniG0.png",
  },
];

const SURGE_CHARGE_RATE = 750;
const COST_MIN_RATE = 2000;

const RideOptionsCard = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [selected, setSelected] = useState<OptionsRide>({
    id: "Moto-100-1",
    title: "Moto económica",
    multiplier: 1,
    image: "https://i.imgur.com/3x8co7r.png",
  });

  const travelTimeInformation = useSelector(selectTravelTimeInformation);

  const calculateCostTravel = useCallback(
    (multiplier: number) => {
      let costTravel =
        (travelTimeInformation?.duration?.value *
          SURGE_CHARGE_RATE *
          multiplier) /
        100;

      if (costTravel <= COST_MIN_RATE) costTravel = 2000 * multiplier;

      return costTravel;
    },
    [travelTimeInformation]
  );

  return (
    <SafeAreaView className="bg-white flex-grow">
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate("NavigateCard")}
          className="absolute top-3 left-5 p-3 z-50 rounded-full"
        >
          <Icon name="chevron-left" type="fontawesome" />
        </TouchableOpacity>
        <Text className="text-center py-5 text-xl">
          Selecciona una moto - {travelTimeInformation?.distance?.text}
        </Text>
      </View>
      <FlatList
        data={options}
        keyExtractor={(item) => item.id}
        renderItem={({ item: { id, title, multiplier, image }, item }) => (
          <TouchableOpacity
            onPress={() => setSelected(item)}
            className={`flex-row items-center justify-between px-10 ${
              id === selected.id && "bg-gray-200"
            }`}
          >
            <Image
              style={{
                width: 100,
                height: 100,
                resizeMode: "contain",
              }}
              source={{
                uri: image,
              }}
            />
            <View className="-ml-6">
              <Text className="text-xl font-semibold">{title}</Text>
              <Text className="text-center">
                {travelTimeInformation?.duration?.text}
              </Text>
            </View>
            <Text className="text-lg">
              {new Intl.NumberFormat("es-co", {
                style: "currency",
                maximumFractionDigits: 0,
                currency: "COP",
              }).format(calculateCostTravel(multiplier))}
            </Text>
          </TouchableOpacity>
        )}
      />
      <View>
        <TouchableOpacity
          onPress={() =>
            Alert.alert(
              "Aquí voy a mandar un Socket para que los conductores puedan ver la carrera"
            )
          }
          className="bg-black py-3 m-3"
        >
          <Text className="text-center text-white text-xl">
            Vas en {selected.title}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RideOptionsCard;
