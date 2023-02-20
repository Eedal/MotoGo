import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useDispatch } from "react-redux";
import { setDestination } from "../features/nav/navSlice";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import NavFavourites from "./NavFavourites";
import { Icon } from "react-native-elements";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const NavigateCard = () => {
  const dispatch = useDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView className="bg-white flex-1">
      <Text className="text-center py-5 text-xl">Buenos días, Elkin</Text>
      <View className="border-t border-gray-200 flex-shrink">
        <View>
          <GooglePlacesAutocomplete
            styles={toInputBoxStyles}
            fetchDetails={true}
            enablePoweredByContainer={false}
            placeholder="¿Para donde vas?"
            nearbyPlacesAPI="GooglePlacesSearch"
            debounce={400}
            minLength={2}
            onPress={(data, details = null) => {
              if (details) {
                dispatch(
                  setDestination({
                    location: details?.geometry.location,
                    description: data.description,
                  })
                );
                navigation.navigate("RideOptionsCard");
              }
            }}
            query={{
              key: GOOGLE_MAPS_APIKEY,
              language: "es",
            }}
          />
          <NavFavourites />
        </View>
        <View className="flex-row justify-evenly bg-white py-2 mt-auto border-t border-gray-100">
          <TouchableOpacity 
            onPress={() => navigation.navigate('RideOptionsCard')}
          className="flex flex-row justify-between bg-black w-24 px-4 py-3 rounded-full">
            <Icon
              name="motorcycle"
              type="font-awesome"
              color="white"
              size={16}
            />
            <Text className="text-white text-center">Motos</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex flex-row justify-between w-24 px-4 py-3 rounded-full">
            <Icon
              name="human-dolly"
              type="material-community"
              color="black"
              size={16}
            />
            <Text className="text-center">Pedido</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NavigateCard;

const toInputBoxStyles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingTop: 20,
    flex: 0,
  },
  textInput: {
    backgroundColor: "#DDDDDF",
    borderRadius: 0,
    fontSize: 18,
  },
  textInputContainer: {
    paddingHorizontal: 20,
    paddingBottom: 0,
  },
});
