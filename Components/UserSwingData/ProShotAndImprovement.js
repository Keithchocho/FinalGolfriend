import { StatusBar } from 'expo-status-bar';
import React, { Component, useState, useContext } from 'react';
import { 
    Animated, 
    Button, 
    StyleSheet, 
    Text, 
    View,
    Image,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { color, Transition, TransitioningView } from 'react-native-reanimated';

import {Ionicons, MaterialIcons, FontAwesome} from 'react-native-vector-icons';

import PerfectButton from './PerfectButton';

const POSE_NAME = ["address", "take away", "back swing", "top", "down swing", "impact", "release", "follow through"];

const Improvement = (props) => {
    
    const [textData , setTextData] = useState(3);


    const { viewState } = props;

    const { data } = props;
    const { index } = props;
    const { imagePath } = props;
    console.log('imagePath의 타입:', typeof imagePath)
    const { token } = props;
    
    const responseBoxSize = () =>{
        if(textData == 3){
            setTextData(textData + 8) // textData + 들어오는 데이터 갯수
            console.log('박스 사이즈 확대')
        } else {
            setTextData(3);
            console.log('기본사이즈로 돌아갑니다.') //버튼 다시 누르면 원래 사이즈로 돌아갑니다.
        }
    }

        return (
            <View style={{
                width:"92%",
                height:35 * textData,
                borderRadius:20,
                backgroundColor:"#FFF",
                position:'relative',
                marginLeft:20,
                marginTop:30,
                shadowColor:"#000",
                elevation:5,
                flexDirection:"row"
                }}>
               
                        {/* 버튼 누르기 전 row 로 정렬된 View */}
                            <View 
                                style={{ 
                                    flex: 1, 
                                    flexDirection: 'row', 
                        
                                    // backgroundColor: 'blue',
                                }}
                            >
                                <View style={{  
                                    // backgroundColor: 'blue'
                                    marginLeft:10,
                                    marginTop:10,
                                    width:63,
                                    maxHeight:70,
                        
                                    }}>
                                    <Image
                                        style={
                                            styles.Imagebox
                                        }
                                        source={{
                                            uri: `http://121.138.83.4:80/get-image/${String(imagePath)}_${String(index)}`,
                                            headers: {
                                                'Authorization': `Bearer ${token}`,
                                            },
                                        }}
                                    />
                                </View>

                            {/* </View> */}
                                        <View style ={{flexDirection:'column'}}>

                                            <Text style ={
                                                styles.Text
                                                // fontWeight:"bold",
                                                // marginVertical:10,
                                                // marginHorizontal:100,
                                                // position:"absolute"
                                            }> 
                                                {POSE_NAME[index].charAt(0).toUpperCase() + POSE_NAME[index].slice(1)}
                                            </Text>
                                            <Text style ={{marginLeft:10, opacity: textData ==3 ? 1 : 0}}>
                                                간단한 설명요약이 들어가는 자리입니다.
                                            </Text>
                                        </View>
                                    
                               

                                {/*확장버튼 입니다.*/}
                                <TouchableOpacity onPress={()=>{responseBoxSize()}}>
                                        <FontAwesome name ={ textData == 3 ? 'chevron-right' : 'chevron-down' } size ={16} style={styles.IconStyle} color ={'#90ee90'}/>
                                </TouchableOpacity>
 
                            </View>
                            {!viewState && (
                                <View style={{ width:"95%", height: 25 * textData , marginTop:100, marginLeft:-350, marginRight:10}}>
                                    <Text style={{opacity: textData == 3 ?  0 : 1, lineHeight:20, marginHorizontal:10}}>
                                        피드백 정보가 들어 갑니다.
                                    </Text>
                                </View>
                            )}
                    
               
                       
                   
           </View>
        );
    
}

const ProShotAndImprovement = ({ data, token }) => {
    const imagePath = data["filePath"];
    
    const poseAverage = Object.keys(data)
        .filter((item, idex) => {
            return !isNaN(Number(item));
        })
        .map((item, index) => {
            // console.log('map 시작');
            // console.log('item: ', item, typeof item);
            const poseFeedbackLength = Object.keys(data[item]).length;
            let posePointTotal = 0;
            if (poseFeedbackLength !== 0) {
                posePointTotal = Object.keys(data[item]).reduce((acc, cur) => {
                    // console.log('item: ', Object.keys(item))
                    // console.log('acc: ', acc, typeof acc, 'cur: ', cur, typeof cur);
                    return acc + data[item][cur]["0"]
                }, 0);
            }
            // console.log('item: ', item);
            // console.log(typeof item);
            // console.log('길이는: ', poseFeedbackLength);
            // console.log('토탈: ', posePointTotal);
            if (isNaN(posePointTotal / poseFeedbackLength)) {
                return 0;
            }
            return posePointTotal / poseFeedbackLength;
        });

    // console.log(poseAverage);

    const proShot = poseAverage
                        .map((item, index) => {
                            if (item >= 1.5) {
                                return String(index);
                            } else {
                                return;
                            }
                        })
                        .filter(item => (
                            item
                        ));
    // console.log('proShot', proShot);

    const badShot = poseAverage
                        .map((item, index) => {
                            if (item < 1.5) {
                                return String(index);
                            }
                        })
                        .filter(item => (
                            item
                        ))
    // console.log('badShot', badShot);        

    return (
        <View
            style={{
                flex: 1,
                marginVertical: 20,
            }}
        >
            <View style={{ height: 3, marginVertical: 8, backgroundColor: 'lightgreen'}}/>
            <Text
                style={{
                    fontSize: 15,
                    fontWeight:'bold',
                    marginHorizontal:31,
                    marginTop: 0,
                    textAlign:"right"
                }}
            >{data.date}</Text>
            <View style={{ flexDirection: 'row', marginLeft: 20, alignItems: 'center' }}>
                <MaterialIcons name="mood" size={20} color="black" />
                <Text style ={ styles.Text}>
                        당신의 프로샷
                </Text>
            </View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator ={false}
                style={styles.horizontalSCroll2}
            >
                {proShot && proShot.map((item, index) => (
                    <PerfectButton key={item} data={item} />
                ))}
            </ScrollView>
            <View style={{ flexDirection: 'row', marginLeft: 20, alignItems: 'center' }}>
                <MaterialIcons name="mood-bad" size={20} color="black" />
                <Text style ={ styles.Text}>
                        개선사항
                </Text>
            </View>
            {badShot && badShot.map((item, index) => (
                <Improvement key={index} data={data} index={item} imagePath={imagePath} token={token} />
            ))}                
        </View>
    )
};

export default ProShotAndImprovement;


const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        flexDirection:"row"

    },

    Awardsbox:{
        width:"92%",
        height:87,
        borderRadius:20,
        backgroundColor:"#FFF",
        position:'relative',
        marginLeft:8,
        marginTop:30,
        shadowColor:"#000",
        shadowOffset:{
            width:0,
            height:2,
        },
        shadowOpacity:0.25,
        shadowRadius:.84,
        elevation:5,
        flexDirection:"row",
        justifyContent:'space-between',
        
    },
    Imagebox:{
        width:63,
        maxHeight:70,
        borderRadius:20,
        backgroundColor:"#FFF",
        position:'relative',
        shadowColor:"#000",
        elevation:2,
        resizeMode: 'cover',
      
    },
    Text :{
        fontSize:25,
        fontWeight:'bold',
        marginHorizontal: 10,
        // marginTop:30,
        // textAlignVertical: 'center'
    }, 
    IconStyle:{
        marginHorizontal:10,
        marginVertical:10
    },
    horizontalSCroll2:{
        height:175,
        width:"100%",
        marginHorizontal:20,
        marginTop:30,
    },
    ProShotHeaderText :{
        fontSize:22,
        fontWeight:'bold',
        marginHorizontal:32,
    }, 
    Text:{
        fontSize:20,
        fontWeight:"bold",
        marginVertical:10,
        marginHorizontal:100,
        marginLeft:30
    },
});
