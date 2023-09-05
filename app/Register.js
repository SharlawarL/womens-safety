import React, { Component } from 'react'
import { View, Image, Text, TouchableOpacity, TextInput, StyleSheet, ToastAndroid, ScrollView, Platform, Button } from 'react-native'
import axios from "axios";
import DateTimePicker from '@react-native-community/datetimepicker';


class Inputs extends Component {

    state = {
        otp: '',
        name: '',
        mobile: '',
        email: '',
        address: '',
        isPickerShow: false,
        dob: new Date(Date.now()),
        navigation: this.props
    }
    handleName = (text) => {
        this.setState({ name: text })
    }
    handleMobile = (text) => {
        this.setState({ mobile: text })
    }
    handleEmail = (text) => {
        this.setState({ email: text })
    }
    handleAddress = (text) => {
        this.setState({ address: text })
    }
    handleDob = (text) => {
        console.log(text)
        this.setState({ dob: text })
    }

    showPicker = (text) => {
        this.setState({ isPickerShow: !this.state.isPickerShow })
    }
    register = (name, mobile, email, address, dob) => {
        if (name != '' && mobile != '') {
            axios.get('https://smartmenucard.in/alert.php?method=register&mobile=' + mobile + '&email='+email+'&address='+address+'&dob='+dob+'&name=' + name + '&message=User successfully created.login with ' + mobile + ' and otp is ')
                .then((response) => {
                    console.log("response?.respons", response)
                    if (response?.data?.response) {
                        this.setState({
                            redirect: true,
                            otp: response?.data?.otp,
                            name: response?.data?.data?.name
                        })
                    } else {
                        alert("User already exits!")
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {
            ToastAndroid.show("Please Enter Name and Mobile Number", ToastAndroid.SHORT);
        }
    }

    backToLogin = () => {
        navigation.navigate('Home')
    }
    render() {
        const { navigation } = this.props
        if (this.state.redirect) {
            navigation.navigate('OtpVerify', { otp: this.state.otp, mobile: this.state.mobile, name: this.state.name })
        }

        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.image}>
                        <Image
                            source={require('../assets/start.png')}
                            style={{ width: 200, height: 100 }}
                        />
                    </View>
                    <TextInput style={styles.input}
                        underlineColorAndroid="transparent"
                        placeholder="Enter Name"
                        placeholderTextColor="#9a73ef"
                        autoCapitalize="none"
                        onChangeText={this.handleName} />
                    <TextInput style={styles.input}
                        underlineColorAndroid="transparent"
                        placeholder="Enter Mobile"
                        placeholderTextColor="#9a73ef"
                        autoCapitalize="none"
                        onChangeText={this.handleMobile} />

                    <TextInput style={styles.input}
                        underlineColorAndroid="transparent"
                        placeholder="Enter Email"
                        placeholderTextColor="#9a73ef"
                        autoCapitalize="none"
                        onChangeText={this.handleEmail} />

                    <TextInput style={styles.input}
                        underlineColorAndroid="transparent"
                        placeholder="Enter Address"
                        placeholderTextColor="#9a73ef"
                        autoCapitalize="none"
                        onChangeText={this.handleAddress} />

                    <TextInput style={styles.input}
                        underlineColorAndroid="transparent"
                        placeholder="Enter DOB"
                        mode='date'
                        placeholderTextColor="#9a73ef"
                        autoCapitalize="none"
                        onChangeText={this.handleDob} />
                    {/* <View style={styles.pickedDateContainer}>
                        <Text style={styles.pickedDate}>{this.state.dob.toUTCString()}</Text>
                    </View> */}
                    {/* {!this.state.isPickerShow && (
                            <View style={styles.containerInput}>
                            <Button title="Show Picker" color="purple" onPress={this.showPicker} />
                            </View>
                        )}
                    {this.state.isPickerShow && (
                    <DateTimePicker
                            value={this.state.dob}
                            mode={'date'}
                            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                            is24Hour={true}
                            onChange={this.handleDob}
                            />
                            )} */}

                    <TouchableOpacity
                        style={styles.submitButton}
                        onPress={
                            () => this.register(this.state.name, this.state.mobile, this.state.email, this.state.address, this.state.dob)
                        }>
                        <Text style={styles.submitButtonText}> Create Account </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                        <Text style={styles.image} >
                            Already have an <Text style={{ fontWeight: 700 }}>Account</Text>? Sign In
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
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
    containerInput: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        padding: 30,
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
    },
    pickedDateContainer: {
        padding: 20,
        backgroundColor: '#eee',
        borderRadius: 10,
    },
    pickedDate: {
        fontSize: 18,
        color: 'black',
    },
})