import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import { Point } from "react-native-google-places-autocomplete";

interface Origin {
  location: Point;
  description: string;
}
interface NavState {
  origin: Origin;
  destination: string | null;
  travelTimeInformation: string | null;
}

const initialState: NavState = {
  origin: {
    location: {
      lat: 11.208337230174132,
      lng: -74.18292069282194
    },
    description: 'Mi ubicación'
  },
  destination: null,
  travelTimeInformation: null,
};

export const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    setOrigin: (state, action: PayloadAction<Origin>) => {
      state.origin = action.payload;
    },
    setDestination: (state, action: PayloadAction<string | null>) => {
      state.destination = action.payload;
    },
    setTravelTimeInformation: (state, action: PayloadAction<string>) => {
      state.travelTimeInformation = action.payload;
    },
  },
});

export const { setOrigin, setDestination, setTravelTimeInformation } =
  navSlice.actions;

export const selectOrigin = (state: RootState) => state.nav.origin;
export const selectDestination = (state: RootState) => state.nav.destination;
export const selectTravelTimeInformation = (state: RootState) =>
  state.nav.travelTimeInformation;

export default navSlice.reducer;
