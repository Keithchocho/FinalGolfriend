
import React, { Component, useContext, useEffect, useState } from 'react';
import { Modal, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import AuthContext from '../../Context/AuthContext';
import axios from 'axios';


const SERVER_IP = "121.138.83.4";

const ProfileScreen =({navigation}) =>{

        const { signOut } = useContext(AuthContext);
        // const { getJWT } = useContext(AuthContext);
        // const [data, setData] = useState(null);
    
        // // 데이터 가져오는 useEffect
        // useEffect(() => {
            
        //     (async () => {
        //         const userToken = await getJWT();
        //         await axios.get(`http://${SERVER_IP}:80/latest-swing`, {
        //             headers: {
        //                 Authorization: `Bearer ${userToken}`
        //             }
        //         })
        //         .then(res => {
        //             console.log(res.data);
        //             setData(res.data);
        //         });
        //     })();
            
        //     console.log("최근 분석 useEffect 실행");
        // });
        const [token, setToken] = useState(null);

        useEffect(() => {
            (async () => {
                const userToken = await getJWT();
                setToken(userToken);
            })();
        }, []);
    
        const [userInfo, setUserInfo] = useState(null);
        useEffect(() => {
            (async () => {
                console.log('badges 가져오기')
                await axios.get(`http://${SERVER_IP}:80/get-my-badges`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then(res => {
                    console.log('badges 가져오기 성공!')
                    setUserInfo(res.data);
                    // console.log(badges);
                })
                .catch(error => {
                    if (error.response) {
                        // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                      }
                      else if (error.request) {
                        // 요청이 이루어 졌으나 응답을 받지 못했습니다.
                        // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
                        // Node.js의 http.ClientRequest 인스턴스입니다.
                        console.log(error.request);
                      }
                      else {
                        // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
                        console.log('Error', error.message);
                      }
                      console.log(error.config);
                });
            })();
        }, [token])
    
        const [data, setData] = useState([]);
        // 몽고디비 배열 데이터에서 몇 번째 스윙 데이터를 가져오는지 정하는 index
        const [index, setIndex] = useState(0);
        // 데이터 가져오는 useEffect
        useEffect(() => {
            
            (async () => {
                const userToken = await getJWT();
                setToken(userToken);
                // await axios.get(`http://${SERVER_IP}:80/past-swing`, {
                //     headers: {
                //         Authorization: `Bearer ${userToken}`
                //     }
                // })
                await axios.get(`http://${SERVER_IP}:80/get-past-swing?index=${String(index)}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then(res => {
                    // console.log(res);
                    // console.log(res.data);
                    // console.log(res);
                    console.log('--------------------------');
                    if (res.data === "no more data") {
                        Alert.alert('데이터가 없습니다.');
                        return;
                    } 
                    setData(data.concat([res.data]));
                    // console.log(data);
                })
                // 토큰 유효기간이 지나 401 에러뜨면 자동 로그 아웃
                .catch(async error => {
                    console.log(error);
                    if (error.response.status === 401) {
                        await signOut();
                    }
                    console.log(error);
                });
            })();
            console.log("최근 분석 useEffect 실행");
    
            // 데이터를 가져왔으면 index를 1씩 증가시켜줌
        }, [index, token]);
    
        // // 서버에서 가져온 데이터 확인용 Effect
        // useEffect(() => {
        //     if (data) {
        //         console.log(typeof data.swingData);
        //     }
        // }, [data]);

        return ( 
                <View style={styles.container}> 
                        <View style={styles.loginView}>
                        <Text 
                            style={{
                                fontSize:25,
                                fontWeight:'bold',
                                // marginHorizontal:31,
                                // marginTop:30,
                                textAlign: "center",
                                marginLeft:20
                            }}
                        >
                            {userInfo ? userInfo.userName : "Test"}
                        </Text>
                        <Text style={styles.loginText}> 님 환영합니다!</Text>
                        <TouchableOpacity onPress={()=>navigation.goBack()}>
                                <Icon name = "arrow-back-outline" size ={30} style={{marginLeft:150}}/>
                        </TouchableOpacity>
                    </View>
                   

                    {/* <View style ={styles.smallView}>
                        필요하면 주석 풀어서 사용하세요.
                    </View> */}
                    
                    <View style ={styles.smallView}>
                        <Icon name="settings-outline" size={30}style={styles.iconStyle}/>
                        <Text style={styles.informationText}>개인정보 수정</Text>
                        <TouchableOpacity>
                            <Icon name="chevron-forward-outline" size={30}style={styles.settingArrowIcon}/>
                        </TouchableOpacity>

                    </View>

                    <View style ={styles.smallView}>
                        <Icon name="information-circle-outline" size={30}style={styles.iconStyle}/>
                        <Text style={styles.informationText}>Golfriend 소개</Text>
                        <TouchableOpacity onPress={()=>{navigation.navigate('NoDoubt')}}>
                            <Icon name="chevron-forward-outline" size={30}style={styles.arrowIcon}/>
                        </TouchableOpacity>
                    </View>

                    <View style ={styles.smallView}>
                        <Icon name="log-out-outline" size={30}style={styles.iconStyle}/>
                        <Text style={styles.informationText}>로그아웃 </Text>
                        <TouchableOpacity onPress ={ signOut }>
                            <Icon name="chevron-forward-outline" size={30}style={styles.arrowLogoutIcon}/>
                        </TouchableOpacity>

                    </View>
                    
              
                </View>
        );
    
};

export default ProfileScreen;



const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'rgba(52, 52, 52, 0.0001)'
    },
    safeAreaView:{
        backgroundColor:"#FFF",
        width:"100%", 
        height:60,  
        alignItems:'flex-start', 
        shadowColor:"#000",
        shadowOffset:{
           
            width:0,
            height:2,
        },
        shadowOpacity:0.25,
        shadowRadius:.84,
        elevation:5,
        justifyContent:'center'
    },
    loginView:{
        width:"100%",
        height:150,
        backgroundColor:"#FFF",
        justifyContent:'flex-start',
        flexDirection:'row',
        alignItems:'center',
        
    },
    loginText:{
        fontSize:21,
        fontWeight:'600',
        textAlign:'center',
    },
    informationText:{
        fontSize:18,
        fontWeight:'600',
        textAlign:'center',
        marginLeft:10
    },
    iconStyle:{
        marginLeft:20
    },
    arrowIcon:{
        marginLeft:20,
        color:'#a9a9a9',
        marginLeft:180
    },
    settingArrowIcon:{
        marginLeft:20,
        color:'#a9a9a9',
        marginLeft:190
    },
    arrowLogoutIcon:{
        marginLeft:20,
        color:'#a9a9a9',
        marginLeft:225
    },
    smallView:{
        width:"100%",
        height:60,
        backgroundColor:"#FFF",
        marginTop:8,
        flexDirection:'row',
        alignContent:'center',
        alignItems: 'center'
    }
});