import { StatusBar } from 'expo-status-bar';
import React, { Component, useState } from 'react';
import { 
    Animated, 
    Button, 
    StyleSheet, 
    Text, 
    View,
    TouchableOpacity
} from 'react-native';
import { Transition, TransitioningView } from 'react-native-reanimated';

import FontAwesome from 'react-native-vector-icons/FontAwesome';


export default class ImproveButton extends Component {


    constructor (){
        super();
        this.state={
            animationValue :  new Animated.Value(100),
            viewState : true
        }
    }
    
    toggleAnimation =() =>{
        
        if(this.state.viewState ==  true ){
            Animated.timing(this.state.animationValue,{
                toValue: 300,
                timing: 300,
                useNativeDriver:false
            }).start(()=>{
                this.setState({viewState : false })
            });
        }
        else{
            Animated.timing(this.state.animationValue, {
              toValue : 100,
              timing : 300,
              useNativeDriver: false,
            }).start(this.setState({viewState: true})
            );
          }
    }



    render(){

        const animatedStyle ={
            height :  this.state.animationValue,
        }

        const { viewState } = this.state;
        
        let button = (
            <TouchableOpacity
            onPress={this.toggleAnimation}>
            <FontAwesome name ={'chevron-right'} size ={16} style={styles.IconStyle} color ={'#90ee90'}/>
            </TouchableOpacity>
        );

        if(!viewState){
            button =(
                <TouchableOpacity
                onPress={this.toggleAnimation}>
                <FontAwesome name ={'chevron-down'} size ={30} style={styles.IconStyle} color ={'#90ee90'} />   
                </TouchableOpacity>
            );
        }

        return (
            <View style = {styles.container}>
               
                    
                    <Animated.View style ={[styles.Awardsbox, animatedStyle]}>
        
                        <View style={styles.Imagebox}>
                                
                        </View>
                        <Text style ={styles.Text}> 
                            Down Swing
                        </Text>

                        <Text>
                            
                        </Text>

                        { button }
                        {/* <TouchableOpacity onPress ={this.toggleAnimation}>
                            <FontAwesome name= 'right' size={50} style={styles.IconStyle} />
                        </TouchableOpacity>   */}
                                   
                    </Animated.View>
                       
                   
           </View>
        );
    }
}




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
        marginLeft:10,
        marginTop:10,
        shadowColor:"#000",
        shadowOffset:{
            width:0,
            height:2,
        },
        shadowOpacity:0.15,
        shadowRadius:.84,
        elevation:2,
       
  
    },
    Text:{
        fontSize:20,
        fontWeight:"bold",
        marginVertical:10,
        marginHorizontal:100,
        position:"absolute"
    },
    IconStyle:{
        marginHorizontal:10,
        marginVertical:10
    }
});