import React, { useState, useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, Animated } from 'react-native';
// import {   } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

// export default class CameraButton extends React.Component {

//     constructor(props) {
//         super(props)
//         this.buttonsize = new Animated.Value(1)
//     }


//     ButtonAnimation = () => {
//             Animated.timing(this.buttonsize, {
//                 toValue:0,
//                 duration:200,
//                 useNativeDriver:false
//             }).start();
        
//     };

//         render(){

//             const { navigation } = this.props;
           
//             const sizeStyle =    this.buttonSize;
             
            

//         return(
            
//             <View style={{ position:'absolute', alignItems:"center" }} >
                
//                 <Animated.View style ={[styles.button, { transform: }]}>
//                     <TouchableOpacity onPress={this.ButtonAnimation}>
//                         <Animated.View> 
//                             <Icon name ='camera' size={65} color='#FFF'/>
//                         </Animated.View>   
//                     </TouchableOpacity>
//                 </Animated.View>
//             </View>
//         );
//     }
// }

const CameraButton = ({ focused }) => {
    if (focused) {
        return <View />
    }

        return (
            // <View style={{ position:'absolute', alignItems:"center" }}>
                <View style ={[styles.button,]}>
                    {/* <TouchableOpacity onPress={}> */}
                        <View> 
                            <Icon name ='camera' size={60} color='#FFF'/>
                        </View>   
                    {/* </TouchableOpacity> */}
                </View>
            // </View>                       
        )
}

export default CameraButton;

const styles = StyleSheet.create({
    button:{
        backgroundColor:"#73E681",
        alignItems:"center",
        justifyContent:"center",
        width: 80,
        height: 80,
        borderRadius: 40,
        position:'absolute',
        bottom: 5,
        // shadowColor:"#4169e1",
        shadowColor: 'blue',
        // borderColor:"#FFF",
        // borderWidth:1.5,
        elevation: 7,
        // backgroundColor: 'black',
        // marginLeft:100
    }
});