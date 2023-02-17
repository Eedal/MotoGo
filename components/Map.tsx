import { View, Text } from "react-native";
import React from "react";
import MapView, { Marker } from "react-native-maps";
import { useSelector } from "react-redux";
import { selectOrigin } from "../features/nav/navSlice";

const Map = () => {
  const origin = useSelector(selectOrigin);

  return (
    <MapView
      className="flex-1"
      mapType="mutedStandard"
      initialRegion={{
        latitude: origin.location.lat,
        longitude: origin?.location?.lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
    >
      <Marker 
        coordinate={{
          latitude: origin.location.lat,
          longitude: origin.location.lng
        }}
        title='Origen'
        description={origin.description}
        identifier="origin"
      />
      </MapView>
  );
};

export default Map;
