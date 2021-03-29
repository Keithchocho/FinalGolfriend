import { useNavigation } from '@react-navigation/native';
import React, { Component } from 'react';
import { 
    StyleSheet, 
    Text, 
    View,
    TouchableOpacity, 
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default class EmailButton extends Component{
    static defaultProps = {
        title: 'untitled',
        buttonColor: 'black',
        titleColor: 'black',
        onPress: () => null,
      }
    
    constructor(props){
        super(props);
    }
    
    render(){
        return (
            <View style={{flexDirection:'row', width:"85%",height:60, marginTop:30,marginLeft:31}}>
            
                <TouchableOpacity style={[
                        styles.button,
                        { backgroundColor: this.props.buttonColor },
                    ]}
                    onPress={this.props.onPress}>
                    <FontAwesome name ={'envelope'} size={25} style={{marginLeft:-85}} />
                    <Text style={[
                    styles.title,
                    {color: this.props.titleColor}
                    ]}>{this.props.title}</Text>
                </TouchableOpacity>
            </View> 
        )
    }
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:10,
    shadowColor:"#000",
    shadowOffset:{     
        width:0,
        height:2,
    },
    shadowOpacity:0.25,
    shadowRadius:.84,
    elevation:5,
    flexDirection:'row',
  },
  title: {
    fontSize: 15,
    marginLeft:50,
    fontWeight:'normal'
  },
});