
import React from 'react';
import {  TextInput, AsyncStorage, Alert, Text, View, TouchableOpacity } from 'react-native';
import User from '../User';
import styles from '../constants/style';
import firebase from 'firebase';
export default class LoginnScreen extends React.Component {
    static navigationOptions = {
        header:null
    }
    state = {
        phone: '',
        name: '',
    }
    handelChange = key => val => {
        this.setState({ [key]: val })
    }
    componentWillMount() {
        AsyncStorage.getItem('userPhone').then(val => {
            if (val) {
                this.setState({ phone: val })
            }
        })
    }
    submitForm = async () => {
        if (this.state.phone.length < 10) {
            Alert.alert('Error', 'Please Enter Full Phone Number')
        }
        else if (this.state.name.length < 3) {
            Alert.alert('Error', 'Please Enter Full Name')
        }
        else {
            await AsyncStorage.setItem('userPhone', this.state.phone);
            User.phone=this.state.phone;
            firebase.database().ref('users/' + User.phone).set({name: this.state.name});
            this.props.navigation.navigate('App');
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    placeholder="Phone number" style={styles.input}
                    value={this.state.phone}
                    keyboardType="number-pad"
                    onChangeText={this.handelChange('phone')}
                />
                <TextInput
                    placeholder="Name" style={styles.input}
                    value={this.state.name}
                    onChangeText={this.handelChange('name')}
                />
                <TouchableOpacity onPress={this.submitForm}>
                    <Text style={styles.btntxt}>Register</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

