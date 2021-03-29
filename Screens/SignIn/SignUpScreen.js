import { useNavigation } from '@react-navigation/core';
import { HeaderBackButton } from '@react-navigation/stack';
import React from 'react';

import { 
  Alert, 
  Button, 
  SafeAreaView,
  StyleSheet, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  View 
} from 'react-native';

import EmailButton from '../../Components/Buttons/EmailButton';
import FaceBookButton from '../../Components/Buttons/FaceBookButton';
import GoogleButton from '../../Components/Buttons/GoogleButton';

const SignUpScreen = ({ navigation }) => {

    return (
        <View style={styles.container}>
            <SafeAreaView style ={{flexDirection:"row", justifyContent:"space-between" }}>
                <Text style={styles.Text}></Text>
                <HeaderBackButton 
                    pressColorAndroid="#FFF"
                    title= "back" 
                    onPress ={() => navigation.goBack()}
                    style={{marginTop:40}}
                />
            </SafeAreaView>    
            <View style ={{ marginTop:-25,flexDirection:"row"}}>
                <Text style={styles.TextStyle}>
                  회원가입
                </Text>
            </View> 
                <View style ={{ marginBottom:35}}>
                    <Text style={{textAlign:"left", fontSize: 20, color:'#000', marginLeft:31, lineHeight:30}}>    
                  기존에 사용하시는 계정으로 {'\n'}간단하게 회원가입하세요.              
                    </Text>                    
                </View>                       
             {/* <KakaoButton 
               buttonColor={'#FFE812'}
               title={'카카오톡으로 가입'}                                        
               onPress={() => {Alert.alert('카카오톡페이지 이동')}}/>                                                   */}
              {/* <FaceBookButton 
               buttonColor={'#1977F2'}                         
                title={'페이스북으로 가입'}                        
                onPress={() => {Alert.alert('페이스북 페이지 이동')}}/>                                    */}
               {/* <NaverButton             
                buttonColor={'#02C75A'}
                title={'네이버로 가입'}                                   
                onPress={() => {Alert.alert('네이버 페이지 이동')}}/>       */}
            <View  style={styles.line} />
            <View style={{width:"100%", flex:0.3}}>
              
            <EmailButton
              buttonColor={'#FFF'}
              title={'메일로 가입하기'}
              onPress={() => navigation.navigate('EmailSignUp')} 
            />
            <View style={styles.container3}>
                <Text style={styles.Textoption}>
                        이미 계정이 있으세요?     
                </Text>      
                <TouchableOpacity  onPress ={() =>navigation.navigate('LoginPageScreen')}>
                <Text style ={ styles.Textoption2}>
                    로그인 하기
                </Text>                            
              </TouchableOpacity>                     
            </View>      
          </View>          
        </View>
    );   
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    width:"100%",
    height:"100%",
  },
 container2:{
   backgroundColor:'#FFF',
   width:"100%",
   height:150,
   
 },
 container3:{
   width:"100%",
   marginTop:30,
   textAlign:'center',
   flexDirection:'row',
 },

  Textoption:{
    fontSize:15,
    color:'#6F6F6F',
    marginLeft:90
    
  },
  Textoption2:{
    fontSize:15,
    textDecorationLine:'underline',
    marginLeft:5,
    color:'#6F6F6F'
  },
  line:{
    borderWidth:1,
    width:"85%",
    borderColor:"#E2E2E2",
    marginTop:30,
    marginLeft:31
  },
  container3:{
    alignItems:'center',
    flexDirection:'row',
    width:"95%",
    height:"70%",      
    
  },
  TextStyle:{
      fontSize:30,
      marginLeft:31,
      fontWeight:'bold',
      marginBottom:26,
      marginTop:50,
      textAlign:'left'
  },
  TextStyle2:{
      fontSize:20,
      fontWeight:'200',
      textAlign:'right',
      marginRight:18,
      width:30,
      height:30
  },
  Text :{
    fontSize:25,
    fontWeight:'bold',
    marginHorizontal:31,
    marginTop:30,
    textAlign:"left"
}, 
});