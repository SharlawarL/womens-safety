import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

class Inputs extends Component {

   constructor(props) {
      super(props)
      this.state = {
         guardian: '',
         emergency: '',
         harrsment: '',
         police: ''
      }
      this.getItems();
   }

   getItems = async () => {
      this.setState({
         guardian: await AsyncStorage.getItem('guardian'),
         emergency: await AsyncStorage.getItem('emergency'),
         harrsment: await AsyncStorage.getItem('harrsment'),
         police: await AsyncStorage.getItem('police')
      })
      console.log("States", this.state)
   }

   handleGuardian = async (text) => {
      try {
         await AsyncStorage.setItem('guardian', text);
         // read merged item

      } catch (e) {
         // saving error
      }
   }
   handleEmergency = async (text) => {
      try {
         await AsyncStorage.setItem('emergency', text);
      } catch (e) {
         // saving error
      }
   }

   handleHarrsment = async (text) => {
      try {
         await AsyncStorage.setItem('harrsment', text);
      } catch (e) {
         // saving error
      }
   }

   handlePolice = async (text) => {
      try {
         await AsyncStorage.setItem('police', text);
      } catch (e) {
         // saving error
      }
   }

   render() {
      return (
         <View style={styles.container}>
            <ScrollView>
               <View style={styles.content}>
                  <Text style={{ fontSize: 20, fontWeight: 700 }}>Add Emergency Contacts</Text>
               </View>
               <View style={styles.content}>
                  {/** *************************************** */}
                  <Text style={styles.headline}>Panic Situation</Text>
                  <TextInput style={styles.input}
                     underlineColorAndroid="transparent"
                     placeholder="Enter Guardian Number"
                     placeholderTextColor="#9a73ef"
                     autoCapitalize="none"
                     defaultValue={this.state.guardian}
                     onChangeText={this.handleGuardian} />

                  {/** *************************************** */}
                  <Text style={styles.headline}>Health Emergency</Text>
                  <TextInput style={styles.input}
                     underlineColorAndroid="transparent"
                     placeholder="Enter Health Emergency Number"
                     placeholderTextColor="#9a73ef"
                     autoCapitalize="none"
                     defaultValue={this.state.emergency}
                     onChangeText={this.handleEmergency} />

                  {/** *************************************** */}
                  <Text style={styles.headline}>Sexual Harassment</Text>
                  <TextInput style={styles.input}
                     underlineColorAndroid="transparent"
                     placeholder="Enter Sexual Harassment Number"
                     placeholderTextColor="#9a73ef"
                     autoCapitalize="none"
                     defaultValue={this.state.harrsment}
                     onChangeText={this.handleHarrsment} />

                  {/** *************************************** */}
                  <Text style={styles.headline}>Police</Text>
                  <TextInput style={styles.input}
                     underlineColorAndroid="transparent"
                     placeholder="Enter Police Number"
                     placeholderTextColor="#9a73ef"
                     autoCapitalize="none"
                     defaultValue={this.state.police}
                     onChangeText={this.handlePolice} />

                  {/* <TouchableOpacity
               style = {styles.submitButton}
               onPress = {
                  () => this.login(this.state.email, this.state.password)
               }>
               <Text style = {styles.submitButtonText}> Submit </Text>
            </TouchableOpacity> */}
               </View>
               <View style={styles.content}>
                  <Text style={{ fontSize: 20, fontWeight: 700 }}>Developer By</Text>
                  <Text>Mr.  Shyam R Bhalerao</Text>
                  <Text>Ms. Rekha H. Yadav</Text>
                  <Text>Ms. Jagruti G. Bendre</Text>
                  <Text>Mr. Yash M. Wele  </Text>
                  <Text>Ms. Vaishnavi S. Belsare</Text>
               </View>
               <View style={styles.content}>
                  <Text style={{ fontSize: 20, fontWeight: 700 }}>Guided By</Text>
                  <Text>Prof. . P. D. Thakare </Text>
                  <Text>(Project Guide)</Text>
                  <Text>Comp. Engg. Dept.</Text>
               </View>
            </ScrollView>
         </View>
      )
   }
}
export default Inputs

const styles = StyleSheet.create({
   container: {
      paddingTop: 23
   },
   headline: {
      marginTop: 20
   },
   input: {
      marginTop: 15,
      height: 40,
      borderColor: '#7a42f4',
      borderWidth: 1,
      padding: 10
      // padding: '10px'
   },
   content: {
      margin: 15,
   },
   submitButton: {
      backgroundColor: '#7a42f4',
      padding: 10,
      marginTop: 15,
      height: 40,
      alignItems: 'center'
   },
   submitButtonText: {
      color: 'white'
   }
})