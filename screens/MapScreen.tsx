import { Text, View } from 'react-native'
import React, { Component } from 'react'
import Map from '../components/Map'

export class MapScreen extends Component {
  render() {
    return (
      <View>
        <View className='h-1/2'>
          <Map />
        </View>
        <View className='h-1/2'></View>
      </View>
    )
  }
}

export default MapScreen