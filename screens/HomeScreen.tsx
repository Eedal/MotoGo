import { Image, SafeAreaView, Text, View } from "react-native";
import React from "react";
import NavOptions from "../components/NavOptions";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useDispatch } from "react-redux";
import { setDestination, setOrigin } from "../features/nav/navSlice";

const HomeScreen = () => {
  const dispatch = useDispatch();

  return (
    <SafeAreaView className="bg-white h-full">
      <View className="p-3">
        <Image
          style={{
            width: 100,
            height: 100,
            resizeMode: "contain",
          }}
          source={{
            uri: "https://i.imgur.com/ojfdLNa.png",
          }}
        />
        <GooglePlacesAutocomplete
          placeholder="¿Donde estás?"
          styles={{
            container: {
              flex: 0,
            },
            textInput: {
              fontSize: 18,
            },
          }}
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={400}
          minLength={2}
          enablePoweredByContainer={false}
          onPress={(data, details = null) => {
            if(details) {
              dispatch(
                setOrigin({
                  location: details?.geometry.location,
                  description: data.description,
                })
              );
            }
            dispatch(setDestination(null));
          }}
          fetchDetails={true}
          query={{
            key: GOOGLE_MAPS_APIKEY,
            language: "es",
          }}
        />
        <NavOptions />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
