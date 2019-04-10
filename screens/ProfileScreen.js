import React from "react";
import {
  View,
  SafeAreaView,
  Text,
  Alert,
  TextInput,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import User from "../User";
import styles from "../constants/style";
import firebase from "firebase";
export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: "Profile"
  };
  state = {
    name: User.name
  };
  handelChange = key => val => {
    this.setState({ [key]: val });
  };
  changeName = async () => {
    if (this.state.name.length < 3) {
      Alert.alert("Error", "Please Enter Full Name");
    } else if (User.name !== this.state.name) {
      firebase
        .database()
        .ref("users")
        .child(User.phone)
        .set({ name: this.state.name });
      User.name = this.state.name;
      Alert.alert("Success", "Name Changed Successfully");
    }
  };
  _logOut = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate("Auth");
  };
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={{ fontSize: 20 }}>{User.phone}</Text>
        <TextInput
          style={styles.input}
          value={this.state.name}
          onChangeText={this.handelChange("name")}
        />
        <TouchableOpacity onPress={this.changeName}>
          <Text style={styles.btntxt}>Change Name</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this._logOut}>
          <Text style={styles.btntxt}>Logout</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}
