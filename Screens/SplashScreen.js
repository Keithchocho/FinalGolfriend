import React, {Component} from 'react';
import { 
    StyleSheet,
    View,
    Image,
    Animated,
} 
from 'react-native';

import * as Animatable from 'react-native-animatable';

const Logo = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', position: 'relative' }}>
            <Animatable.View
                animation = 'tada'
            >
                <Image 
                    style={{ width:280, height:175 }}
                    source={require('../assets/Golfriend.png')}
                />
            </Animatable.View>
        </View>
    )
}

export default class SplashScreen extends Component {
    
    state = {
        animated:new Animated.Value(0),
    }
    
    componentDidMount(){
        const {animated} = this.state;

        Animated.timing(animated,{
            toValue:10,
            duration:1000,
            useNativeDriver: true,
        }).start()
    }

    render() {
        const { animated } = this.state;

        return(
            <View style ={styles.container}>
                
                <Animated.View
                    style={{         
                    justifyContent : 'center',
                    width:100,
                    height:100,
                    borderRadius:50,
                    position:'absolute',
                    backgroundColor : '#90ee90',
                    transform:[
                        {
                            scale:animated
                        }
                    ]
                    }}
                />
                <Logo />    
                
            </View>
        );
    }
}

const styles = StyleSheet.create({

    container: {
        flex :1,
        justifyContent : "center",
        alignItems: "center",
    },

});