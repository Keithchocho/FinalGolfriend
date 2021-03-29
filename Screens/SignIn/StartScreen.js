import React from 'react';
import{
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    // Button,
} from 'react-native';
// import { color } from 'react-native-reanimated';
import Swiper from 'react-native-swiper';

const StartScreen = ({ navigation }) => {
    return (
      <View style={styles.container}>
        
        <View style={styles.header} />
        <Image 
          source={require('../../assets/GolfriendFlag.png')} 
          style={{width:67, height:83, marginLeft:24, marginTop:45}}
          
          />
        
        <View style={styles.title} />

        <View style={styles.content}>
         
          <Swiper 
            dotColor={'#d3d3d3'} 
            autoplay={true} 
            activeDotColor={'#808080'} 
            paginationStyle={{right:270}}//닷 위치 변경 
          >     
            <View style={{justifyContent:'center'}}>
              <Text style ={{fontSize:50, textAlign:'left', marginLeft:32}}>
                당신의 {"\n"}개인코치
              </Text>
              <Text style={styles.logoText}>안녕하세요. 노답 컴퍼니 입니다.{"\n"} 
              저희 노답 컴퍼니는 AI기술을 통해 여러분들의 골프 자세를 교정해주는 앱을 제공합니다.
              </Text>
            </View>
            
            <View style={styles.slide}>
                  <Text style={styles.text}>스윙 자세 진단</Text>
                  <Text style={styles.logoText}>쩌는 AI기술을 통한 스윙자세 무려 100가지의 자세 분석이 가능합니다.</Text>
            </View>
            <View style={styles.slide}>
                  <Text style={styles.text}>당신의 골프기록</Text>
                  <Text style={styles.logoText}>골프 스윙을 기록하여 나날이 발전하는 나의 모습을 지켜보세요</Text>
            </View>
            <View style={styles.slide}>
                  <Text style={styles.text}>기록 공유</Text>
                  <Text style={styles.logoText}>나의 멋진 스윙을 주변 친구들에게 공유해보세요!</Text>
            </View>
          </Swiper>
        </View>

        <View style={{flexDirection:'row', marginBottom:54, width: "100%", height:50 }}>
          <View style={styles.footer}>
          {/* <CustomButton
            buttonColor={'#FFF'}
            title={'로그인'} */}
            {/* // onPress={() =>{ */}
            {/* // console.log('onPress') */}
            {/* // navigation.navigate('LoginPageScreen') */}
            {/* // }} */}
          {/* /> */}
            <TouchableOpacity
              style={[ styles.button, { backgroundColor: '#FFF' }]}
              onPress={() => navigation.navigate('LogIn')}
            >
              <Text style={{ fontSize: 14 }}>로그인</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.footer}>   
            {/* <CustomButton
              buttonColor={'#73E681'}
              title={'회원가입'}
            //   onPress={() => {navigation.navigate('SigninScreen')}}
            /> */}
            <TouchableOpacity
                style={[styles.button, { backgroundColor: '#73E681' }]}
                onPress={() => navigation.navigate('SignUp')}
            >
                <Text style={{ fontSize: 14 }}>회원가입</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
}

export default StartScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  header: {
    width:'100%',
    height:'5%',
    //backgroundColor: '#ff9a9a',
  },
  title: {
    width:'100%',
    height:'18%',
    justifyContent: 'center',
    //backgroundColor: '#9aa9ff',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingBottom:30,
    //backgroundColor: '#d6ca1a',
  },
  footer: {
    width:171,
    height:61,
    shadowColor:"#000",
    shadowOffset:{
      width:1,
      height:3,
      },
    shadowOpacity:0.35,
    shadowRadius:.84,
    marginLeft:10
    },
  text: {
    fontSize: 32,
    fontWeight: 'bold',
    color:'black',
    textAlign:'left',
    marginLeft:32
  },
  LogoBox:{
    alignItems:'center',
  },
  logoText:{
    fontSize:16,
    fontWeight:"100",
    color:'black',
    justifyContent:"center",
    marginLeft:32,
    marginTop:45,
    lineHeight:25
    
  },
  slide:{
    flex: 1,
    justifyContent: 'center',
    // backgroundColor: '#9DD6EB'
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft:16,
    borderRadius:10,
    shadowColor:"#000",
    shadowOffset:{
        width:0,
        height:2,
    },
    shadowOpacity:0.25,
    shadowRadius:.84,
    elevation:5,
  },
});