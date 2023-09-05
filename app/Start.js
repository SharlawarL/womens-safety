import { StyleSheet, View, Text,Image,Button,Pressable, Linking, ToastAndroid } from 'react-native'
import React, { Component, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as Location from 'expo-location';
import { json } from 'react-router-dom';
// import MapView from 'react-native-maps';


class Inputs extends Component {

  constructor(props) {
     super(props)
     this.state = {
        guardian: '',
        emergency: '',
        harrsment: '',
        location: '',
        latitude: '20.3899',
        longitude: '78.1307'
    }
    this.getItems();
    this.useEffect()
  }

  // shouldComponentUpdate = () => {
  //   this.getItems();
  //   this.useEffect()
  // }

  getItems = async () => {
    this.setState({
       guardian :  await AsyncStorage.getItem('guardian'),
       emergency :  await AsyncStorage.getItem('emergency'),
       harrsment :  await AsyncStorage.getItem('harrsment')
    })
    console.log("States",this.state)
 }


 useEffect = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();

  if (status !== 'granted') {
    ToastAndroid.show("Permission to access location was denied..!", ToastAndroid.SHORT);
  }

  let location = await Location.getCurrentPositionAsync({});
  console.log("location", JSON.stringify(location))
  this.setState({
    location : location,
    latitude: location?.coords?.latitude,
    longitude: location?.coords?.longitude,
  })
 }
   render() {
    return (
        <View style={styles.container}>
            <Image
              source={require('../assets/start.png')}
              style={{width: 200, height: 100}}
            />
            <Text style={styles.subtext}>Welcome to</Text>
            <Text style={styles.headline}> Women Safety App</Text>
            {/* <MapView
            style={{ alignSelf: 'stretch', height: 200, margin: 30, borderWidth: 5, borderColor: '#d3d9e3' }}
            region={{ latitude: this.state.location.coords?.latitude, longitude: this.state.location.coords?.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}
          
               /> */}

            <Pressable style={styles.button} onPress={()=> Linking.openURL(`tel: `+this.state.guardian)}>
              <Text style={styles.text}>Call Guardian : {this.state.guardian ? this.state.guardian : 'Please config'}</Text>
            </Pressable>
        </View>
    )
   }
}

export default Inputs

const styles = StyleSheet.create({
    container: {
      width: '100%',
      flex: 1,
      backgroundColor: '#eb15cb',
      alignItems: 'center',
      paddingTop: 150
    },
    subtext:{
      marginTop: 20,
    },
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 4,
      elevation: 3,
      marginTop: 50,
      backgroundColor: 'black',
    },
    text: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'white',
    },
    headline:{
      marginTop: 20,
      fontSize: 30,
      fontWeight: 900,
    },
    map: {
      width: '100%',
      height: 200,
      marginTop: 20,
      marginBottom: 20
    },
  });