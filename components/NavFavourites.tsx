import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import {Icon} from 'react-native-elements'

interface OptionsFavourites {
  id: string;
  icon: string;
  location: string;
  destination: string;
}

const options: OptionsFavourites[] = [
  {
    id: '1', 
    icon: 'home',
    location: 'Casa',
    destination: "Brisas - reserva de curinca, Carrera 30, Santa Marta, Magdalena, Colombia"
  },
  {
    id: '2',
    icon: 'briefcase',
    location: 'Trabajo',
    destination: 'Ocean Mall, Avenida Del Ferrocarril, Comuna 4, Santa Marta, Magdalena, Colombia'
  }
]

const NavFavourites = () => {
  return (
    <FlatList
      data={options}
      keyExtractor={(item) =>  item.id}
      ItemSeparatorComponent={() => (
        <View 
          className='bg-gray-200 h-0.5'
        />
      )}
      renderItem={({item: {location, destination, icon}}) => (
        <TouchableOpacity 
          className='flex-row items-center p-5'
        >
          <Icon 
            className='mr-4 rounded-full bg-gray-300 p-3'
            name={icon}
            type="ionicon"
            color="white"
            size={18}
          />
          <View>
            <Text className='font-semibold text-lg' >{location}</Text>
            <Text className='text-gray-500'>{destination}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  )
}

export default NavFavourites