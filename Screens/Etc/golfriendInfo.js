import { useNavigation } from '@react-navigation/core';
import React, { Component, useState } from 'react';
import { Image, Modal,  StatusBar, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

const golfriend =({navigation})=>{
    
        return ( 
                <View style={styles.container}> 
                    <View style ={styles.safeAreaView}>
                        <TouchableOpacity onPress={()=>navigation.goBack()}>
                            <Icon name = "arrow-back-outline" size ={30} style={{marginLeft:20,marginTop:25}}/>
                        </TouchableOpacity>
                    </View>  
                    <View style={styles.informationContainer}>
                        <View style={styles.round}>
                        <Image source={require('../../assets/Golfriend.png')} style={{marginTop:-35,width:250, height:160,position:'relative'}} />
                        </View>
                        <View style={styles.textView}>
                            <Text style={styles.textstyle}>
                                안녕하세요. NoDoubt Company입니다.{'\n'}
                                골프를 접하는 연령대가 점점 낮아지고 있습니다. 하지만, 개인레슨을 시작하기에 부담감을 가지고 있는 골퍼들을 위해 이 앱을 개발하게 되었습니다.
                                {'\n'}Golfriend를 많이 사랑해주세요.

                            </Text>

                        </View>
                    </View>
                </View>
        );
};

export default golfriend;



const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'rgba(52, 52, 52, 0.0001)',
        alignItems:'center',
        
    },
    safeAreaView:{
        backgroundColor:"#FFF",
        width:"100%", 
        height:80,  
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
    informationContainer:{
        height:"80%",
        width:"90%",
        marginTop:50,
        backgroundColor:"#FFF",
        borderColor:"#ffd700",
        shadowColor:"#000",
        shadowOffset:{
           
            width:0,
            height:2,
        },
        shadowOpacity:0.25,
        shadowRadius:.84,
        elevation:5,
        alignItems:'center'
    },
    textView:{ 
        height:"70%",
        width:"90%",
        marginTop:10,
        backgroundColor:"#FFF",
        alignItems:'center'
    },
    textstyle:{
        fontSize:15,
        lineHeight:30,
        marginHorizontal:20,
        marginVertical:20
    },
    round:{
        width:100,
        height:100,
        borderRadius:100,
        backgroundColor:"#90ee90",
        alignContent:'center',
        position:'relative',
        marginTop:25,
        marginBottom:20,
        alignItems:'center',
        
    }
});