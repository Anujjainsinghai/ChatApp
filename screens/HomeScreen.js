import React from 'react';
import {SafeAreaView ,View, Text, AsyncStorage, Image,FlatList, TouchableOpacity} from 'react-native';
import User from '../User';
import styles from "../constants/style";
import firebase from 'firebase';
export default class HomeScreen extends React.Component{
    static navigationOptions = ({navigation})=>{
        return{
        title:'Chats',
        headerRight:(
            <TouchableOpacity onPress={()=>navigation.navigate('Profile')}>
                <Image source={require('../image/girl.png')} style={{width:32,height:32, marginRight:8}} />
            </TouchableOpacity>
        )
    }
    }
    state={
        users:[]
    }
    componentWillMount(){
        let dbRef=firebase.database().ref('users');
        dbRef.on('child_added', (val)=>{
            let person = val.val();
            person.phone=val.key;
            if(person.phone===User.phone){
                User.name= person.name
            }else{
            this.setState((prevState)=>{
                return{
                    users:[...prevState.users, person]
                }
            })
            }
        })
    }
   
    renderNow=({item})=>{
        return(
            <TouchableOpacity 
            onPress={()=>this.props.navigation.navigate('Chat', item)}
            style={{padding:15,borderBottomColor:'#ccc', borderBottomWidth:2}}>
                <Text style={{fontSize:20}}>{item.name}</Text>
            </TouchableOpacity>
        )
    }
    render(){
        return(
     <SafeAreaView>
   <FlatList
       data={this.state.users}
       renderItem={this.renderNow}
       keyExtractor={(item)=>item.phone}
   />
     </SafeAreaView>
        )
    }
}