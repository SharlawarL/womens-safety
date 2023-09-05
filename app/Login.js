import React, { Component } from 'react'
import { View, Image, Text, TouchableOpacity, TextInput, StyleSheet, Button, ToastAndroid } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";

class Inputs extends Component {

   constructor(props) {
      super(props)
      this.state = {
         mobile: '',
         name: '',
         otp: '',
         redirect: false
       }
       this.getItems();
   }


   getItems = async () => {
      this.setState({
         user_mobile :  await AsyncStorage.getItem('mobile')
      })
      console.log("States",this.state)
   }

   handleMobile = (text) => {
      this.setState({ mobile: text })
   }
   
   
   login = (mobile) => {
      if(mobile != '')
      {
      axios.get('https://smartmenucard.in/alert.php?method=otp&mobile='+this.state.mobile)
            .then((response) => {
               if(response?.data?.response)
               {
                  this.setState({ 
                     redirect: true,
                     otp: response?.data?.otp,
                     name: response?.data?.data?.name
                  })
               } else {
                  // alert("User not exits!");
                  ToastAndroid.show("User not exits...!", ToastAndroid.SHORT);
               }
            })
            .catch(function (error) {
               console.log(error);
             });
            } else {
               ToastAndroid.show("Please Enter Mobile Number", ToastAndroid.SHORT);
            }
   }

   render() {
      const { navigation } = this.props
      if(this.state.redirect)
      {
         navigation.navigate('OtpVerify', { otp : this.state.otp, mobile:  this.state.mobile, name : this.state.name})
      }
      if(this.state.user_mobile)
      {
         navigation.navigate('Details')
      }
      return (
         <View style={styles.container}>
            <View style={styles.image}>
               <Image
                  source={require('../assets/start.png')}
                  style={{ width: 200, height: 100 }}
               />
            </View>
            <TextInput style={styles.input}
               underlineColorAndroid="transparent"
               placeholder="Mobile"
               placeholderTextColor="#9a73ef"
               autoCapitalize="none"
               onChangeText={this.handleMobile} />

            <TouchableOpacity
               style={styles.submitButton}
               onPress={
                  () => this.login(this.state.mobile)
               }>
               <Text style={styles.submitButtonText}> 
                  Click to Generate OTP 
               </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
               <Text style={styles.image}>
                  New to <Text style={{fontWeight:700}}>Womens Safety</Text> ? Create Account
               </Text>
            </TouchableOpacity>
         </View>
      )
   }
}
export default Inputs

const styles = StyleSheet.create({
   container: {
      paddingTop: 23,
      padding: 20
   },
   image: {
      margin: 50,
      alignItems: 'center',
      textAlign: 'center'
   },
   input: {
      margin: 15,
      height: 40,
      borderColor: '#7a42f4',
      borderWidth: 1,
      padding: 10
   },
   submitButton: {
      backgroundColor: '#7a42f4',
      padding: 10,
      margin: 15,
      height: 40,
      textAlign: 'center'
   },
   submitButtonText: {
      color: 'white'
   }
})