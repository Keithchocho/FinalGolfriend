import React, { Component } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import * as Animatable from 'react-native-animatable';


class Logo extends Component {
    render() {
        return (
         <View style={styles.container}>
             <Animatable.View
                animation = 'tada'
                >
                 <Image 
                    style={{width:280,
                    height:175,
                   }}
                    source={require('../assets/Golfriend.png')} />
             </Animatable.View>
         </View>
        );
    }
}


export default Logo;

const styles = StyleSheet.create({
    
    
    container:{
       flex:1,
       justifyContent:'center',
       position:'relative',
        
    }
});