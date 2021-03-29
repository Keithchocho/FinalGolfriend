import React, { useState } from 'react';
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
  Alert
} from 'react-native';

import { HeaderBackButton } from '@react-navigation/stack';

const EmailSignUpScreen = ({ navigation }) => {
    const [disabled, setDisabled] = useState(true);
    const [email, setEmail] = useState('');

    return (
        <>
            <StatusBar />
            <View style={styles.container}>
            
                <HeaderBackButton
                    pressColorAndroid="#FFF"
                    title= "back" 
                    onPress ={ () => navigation.goBack()} />
                    
                <View style ={{ }}>
                    <Text style={styles.TextType}>
                        회원가입
                    </Text>
                    <Text style={styles.TextType2}>
                        당신의 스윙자세를 진단해보세요.
                    </Text>

                    <View style={{ position:'relative', alignItems:"center"}}> 

                        <TextInput 
                            style={{ borderBottomWidth: 1, height: 45, marginHorizontal: 40, width: "80%", marginTop: 30 }}
                            onChangeText={input => setEmail(input)}
                            autoCompleteType = 'email'
                            placeholder ="Enter your Email "
                            maxLength= {30}
                        />        

                        {/* <View style ={[disabled ? styles.button : styles.buttonEnabled]}> */}
                            <TouchableOpacity
                                style={[disabled ? styles.button : styles.buttonEnabled]}
                                onPress={()=> {
                                    navigation.navigate('EmailSignUpForm', {
                                        email: email,
                                    })}
                                }
                            > 
                                <Text style ={[disabled ? styles.DisabledText : styles.EnabledText]}>
                                    Next
                                </Text> 
                            </TouchableOpacity> 
                        {/* </View> */}
                    </View>
                
                    <View style ={{with:"100", height:450,justifyContent:'flex-end'}}>
                        <Text style ={styles.TextType3}>
                            회원가입시 Golfriend의 서비스 이용 약관과 {'\n'}개인정보 보호정책에 동의하게 됩니다.
                        </Text>
                    </View>
                
                </View>
            </View>
        </>
    );
};

export default EmailSignUpScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#FFF'
    },
    TextType:{
        fontSize: 22,
        marginLeft:31,
        marginVertical:30,   
    },
    TextType2:{
        marginHorizontal:20,
        fontSize:16,
        fontWeight:"100",
        marginLeft:31
    },
    TextType3:{
        fontSize:12,
        color:"#6F6F6F",
        marginLeft:-10,
        lineHeight:20,
        textAlign:'center', 
    },
    button:{
        backgroundColor:"black",
        alignItems:"center",
        justifyContent:"center",
        width: "85%",
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
    
    },
    buttonEnabled:{
        backgroundColor:'#90ee90',
        alignItems:"center",
        justifyContent:"center",
        width: "85%",
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
    },
    DisabledText:{
        color:"#FFF"
    },
    EnabledText:{
        color:"black"
    },
});