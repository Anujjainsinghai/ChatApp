import React from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    View,
} from 'react-native';
import User from '../User';
import firebase from 'firebase';

export default class AuthLoadingScreen extends React.Component {
    constructor(props) {
        super(props);
        this._bootstrapAsync();
    }
    componentWillMount(){
        var config = {
            apiKey: "AIzaSyB87UdJDJ3oLTZiWGadgEJhmjdVdYceO1A",
            authDomain: "chat-27bc1.firebaseapp.com",
            databaseURL: "https://chat-27bc1.firebaseio.com",
            projectId: "chat-27bc1",
            storageBucket: "chat-27bc1.appspot.com",
            messagingSenderId: "749901056144"
        };
        firebase.initializeApp(config);
    }

    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
        User.phone = await AsyncStorage.getItem('userPhone');
        this.props.navigation.navigate(User.phone ? 'App' : 'Auth');
    };

    // Render any loading content that you like here
    render() {
        return (
            <View>
                <ActivityIndicator />
                <StatusBar barStyle="default" />
            </View>
        );
    }
}