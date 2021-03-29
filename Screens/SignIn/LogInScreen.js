import React, { useState, useContext } from 'react';
import {    
  View, 
  Text, 
  Button, 
  TouchableOpacity, 
  Dimensions,
  TextInput,
  Platform,
  StyleSheet,
  ScrollView,
  StatusBar,
  Alert,
  SafeAreaView
 } from 'react-native';

 import { HeaderBackButton } from '@react-navigation/stack';
 import AuthContext from '../../Context/AuthContext';

 const LogInScreen = ({ navigation }) => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const { signIn } = useContext(AuthContext);

    return (
        <View style={styles.container}>
              <SafeAreaView style ={{flexDirection:"row", justifyContent:"space-between" }}>
                  <Text style={styles.Text}>Golfriend</Text>
                  <HeaderBackButton 
                      pressColorAndroid="#FFF"
                      title= "back" 
                      onPress ={ () => navigation.goBack()}
                      style={{marginTop:40}}
                      />
              </SafeAreaView>         
             
             <View style ={{ }}>
                 <Text style={styles.TextType}>
                     로그인
                  </Text>
  
              <TextInput 
                style={{borderBottomWidth:1, height:45, marginHorizontal:40, width: "80%",marginTop:30}}
                onChangeText={input =>setEmail(input)}
                autoCompleteType = 'name'
                placeholder ="이메일을 입력해주세요"
                maxLength= {30}/>
  
                <TextInput 
                style={{borderBottomWidth:1, height:45, marginHorizontal:40, width: "80%",marginTop:30}}
                secureTextEntry
                onChangeText={input => setPassword(input)}
                autoCompleteType = 'password'
                placeholder ="비밀번호를 입력해주세요 "
                maxLength= {30}/>
             </View>
  
              <TouchableOpacity 
                  style={styles.button}
                  onPress={() => signIn({ email, password })}
              >
                  <Text style ={styles.DisabledText}>
                      로그인
                  </Text> 
              </TouchableOpacity> 
  
  
             <View style ={{with:"100", height:450, justifyContent:"center"}}>
                  <Text style ={styles.TextType3}>
                      반갑습니다. 오늘도 Golfreind와 함께하세요.
                  </Text>
              </View>
        </View>
    );
 }

export default LogInScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#FFF'
    },
    TextType:{
       fontSize: 30,
       marginHorizontal:31,
       marginVertical:30, 
    },
    TextType2:{
       marginHorizontal:20,
       fontSize:16,
       fontWeight:"100",
    },
    TextType3:{
        fontSize:12,
        color:"#6F6F6F",
        marginLeft:-10,
        lineHeight:20,
        textAlign:'center'
    },
    DisabledText:{
        color:"#FFF"
    },
    button:{
        backgroundColor:"black",
        alignItems:"center",
        justifyContent:"center",
        width: "80%",
        height: 50,
        marginTop:50,
        borderRadius:12,
        shadowColor:"#000",
        shadowOffset:{
        
            width:0,
            height:2,
        },
        shadowOpacity:0.25,
        shadowRadius:.84,
        elevation:5,
        marginHorizontal:40
    },
    Text :{
        fontSize:25,
        fontWeight:'bold',
        marginHorizontal:31,
        marginTop:30,
        textAlign:"left"
    }, 
});