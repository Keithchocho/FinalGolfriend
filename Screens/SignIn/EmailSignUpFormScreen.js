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
    Alert
} from 'react-native';

import AuthContext from '../../Context/AuthContext';
import { HeaderBackButton } from '@react-navigation/stack';

const EmailSignUpFormScreen = ({ navigation, route }) => {
    const { email } = route.params;
    const [lastname, setLastname] = useState('');
    const [firstname, setFirstname] = useState('');
    const [password, setPassword] = useState('');

    const { signUp } = useContext(AuthContext);

    const onSignUp = async () => {
        const result = await signUp({ email, lastname, firstname, password });
        if (result) {
            navigation.navigate('LogIn')
        } else {
            Alert.alert('가입 실패')
        }
    }

    return (
        <View style={styles.container}>

            <HeaderBackButton 
                pressColorAndroid="#FFF"
                title= "back" 
                onPress ={ () => navigation.goBack()}
            />
          
            <View style ={{ }}>
                <Text style={styles.TextType}>
                    환영합니다!
                </Text>
                <Text style={styles.TextType2}>
                    스윙자세 진단을 위해 Golfriend@gmail.com 으로 {"\n"}
                    새로운 계정을 만듭니다.
                </Text>

                <View style={{ position:'relative', alignItems:"center"}}> 

                    <TextInput 
                        style={{borderBottomWidth:1, height:45, marginHorizontal:40, width: "80%",marginTop:30}}
                        onChangeText={input =>setLastname(input) }
                        autoCompleteType = 'name'
                        placeholder ="성을 입력해주세요"
                        maxLength= {30}
                    />

                    <TextInput 
                        style={{borderBottomWidth:1, height:45, marginHorizontal:40, width: "80%",marginTop:30}}
                        onChangeText={input =>setFirstname(input) }
                        autoCompleteType = 'name'
                        placeholder ="이름을 입력해주세요 "
                        maxLength= {30}
                    />

                    <TextInput 
                        style={{borderBottomWidth:1, height:45, marginHorizontal:40, width: "80%",marginTop:30}}
                        onChangeText={input => setPassword(input) }
                        secureTextEntry
                        autoCompleteType = 'password'
                        placeholder ="비밀번호을 입력 해주세요 "
                        maxLength= {30}
                    />          

                    <TouchableOpacity
                        style={styles.buttonEnabled}
                        onPress={onSignUp}
                    >
                        <Text style ={styles.EnabledText}>
                            회원 가입
                        </Text> 
                    </TouchableOpacity> 
                </View>
            </View>
            <View style ={{with:"100", height:450, justifyContent:"center"}}>
                <Text style ={styles.TextType3}>
                    회원가입시 Golfriend의 서비스 이용 약관과 {'\n'}개인정보 보호정책에 동의하게 됩니다.
                </Text>
            </View>
        </View>
    );
};

export default EmailSignUpFormScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#FFF'
    },
    TextType:{
       fontSize: 30,
       marginHorizontal:20,
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