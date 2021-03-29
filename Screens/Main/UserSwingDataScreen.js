import React, { Component } from 'react';
import { 
    NativeAppEventEmitter, 
    Share,
    StatusBar, 
    TouchableOpacity, 
    Dimensions, 
    SafeAreaView,
    StyleSheet, 
    View, 
    Text,
    KeyboardAvoidingView,  
    Keyboard,
    TextInput,
    FlatList
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Video, AVPlaybackStatus } from 'expo-av';
import { useState,  useEffect } from "react";
import { set } from "react-native-reanimated";

const DATA = [{ 'user1' : 'Keith' }, {'user2': '35king'}, { 'user3': '감자국SB' },{ 'uesr4': '김니꾸' },{ 'user5': '뚱이' }];


const UserSwingDataScreen = ({navigation}) =>{
    const video = React.useRef(null);
    const [ status, setStatus ] = React.useState({});
    const [likeColor, setLikeColor ] = useState(false);
    let [ like, setLike ] = useState(0);


    const [commenting, setCommenting ] = useState(false);
  
    const [comment, setComment ] = useState(null);
    const [ inputText , setInputText ] = useState('');
    const [data, setData] = useState([]);
    useEffect(() => {
        setData(DATA);
    }, [])

    const onChange  =  e => setInputText(e);
    const commentList = data.map((item, index)=> <Text key={item} >{item.name}  {item.Text}</Text>);
                                            
    {/* 댓글 입력 기능*/}
    const onClick =()=>{
        setData([
            ...data,
            {
                'name': '김민제',
                'Text': inputText
            },
           
        ]);
        setInputText('');
    };
    


  

    return(
        <View style={styles.maincontainer}> 
        <StatusBar backgroundColor ={"#FFF"} barStyle={"dark-content"}></StatusBar>
        <View style ={{flexDirection:"row",marginTop:20}}>
            <Text style={styles.Text}>Golfriend</Text>
            <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <Icon style={{marginLeft:200, marginTop:43}} name = 'arrow-back' size ={25} color ={'#000'} />
            </TouchableOpacity>
        </View>         
        
       <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.InstaContainer}> 
                <View style ={styles.userIconBox}>
                    <View style={styles.userIcon} />
                    <Text style={styles.instaHeadText}>  {DATA.map((item, index) => (item['user2']))}  님의 스윙영상</Text>
                </View>
                <View style={styles.instaVideoContainer}>
                    <Video
                            ref={video}
                            style={styles.video}
                            source={{
                            uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
                            }}
                            useNativeControls
                            resizeMode="contain"
                            isMuted
                            isLooping
                            onPlaybackStatusUpdate={status => setStatus(() => status)}
                        />
                </View>
                <View style ={styles.iconContainer}> 
                    <TouchableOpacity onPress={()=>{setLikeColor(true), setLike(like + 1)}}>
                        <Icon name ={ likeColor? "heart" : "heart-outline" }size={30} color={likeColor ? "#ff0000" : "#000"} style={{marginLeft:10,marginTop:5}}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress ={()=> {navigation.navigate('CommentScreen')}}>
                        <Icon name ="chatbubbles-outline" size={30}style={{marginLeft:10,marginTop:5}}/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Icon name ="ios-share-social" size ={30}style={{marginLeft:280,marginTop:5}}/>
                    </TouchableOpacity>
                </View>
                <Text style={{marginLeft:10}}> { like } Likes</Text>

                <ScrollView
                style={styles.ScrollViewBox}
                showsVerticalScrollIndicator={false}>
                <KeyboardAvoidingView>
                    <View style ={styles.CommentContainer}>
                        {/* <View style ={{flex:1}}>
                            <TouchableOpacity onPress={Keyboard.dismiss} style={{height:"100%"}} />
                        </View> */}
                             {commentList}
                            <View style ={styles.EditorContainer}>
                                <TextInput onChangeText={onChange} value={inputText} style={{flex: 1}} multiline placeholder={"댓글 달기.."}></TextInput> 
                                <TouchableOpacity style={{width: 50}} onPress={onClick}>
                                    <Text style={{color:"#00bfff" }}>게시</Text>
                                </TouchableOpacity>
                               
                            </View>
                            
                   
                    </View>

                </KeyboardAvoidingView>    
              </ScrollView>
            
                
                    
                
            </View>

        </ScrollView>
    </View>  
    );
}


export default UserSwingDataScreen;



const styles = StyleSheet.create({
    maincontainer:{
        flex:1,
        backgroundColor:"white",
        flexDirection:"column",

    },
    container:{
        flex:1,
        backgroundColor:'#FFF',
        marginTop:30
    },
    Text :{
        fontSize:25,
        fontWeight:'bold',
        marginHorizontal:31,
        marginTop:30,
        marginLeft:-10
    }, 
    firstScrollContainer:{
        height:100,
        width:"100%"
    },
    video: {
    alignSelf: 'center',
    width: "100%",
    height: "100%",
  },
  InstaContainer:{
      width:"100%",
      height:650,
      marginTop:15,
      borderBottomWidth:1,
      marginBottom:30
  },
  instaHeadText:{
      fontSize:15,
      marginLeft:10,
      marginTop:10
  },
  instaVideoContainer:{
      width:"100%",
      height:380,
      marginTop:10,
      backgroundColor:"rgba(56, 56, 56, 0.13)"
  },
  iconContainer:{
      flexDirection:"row",
      marginTop:15
  },
  userIconBox:{
      flexDirection:"row",
      marginBottom:10
  },
  userIcon:{
      height:50,
      width:50,
      borderRadius:100,
      borderWidth:1,
      marginLeft:20
  },
  maincontainer:{
    flex:1,
    backgroundColor:"#FFF",
    justifyContent:'center',
    alignItems:'center'
},
ScrollViewBox:{
    width:"90%",
    marginTop:10
},

EditorContainer:{
    padding:5,
    minHeight:65,
    borderTopColor:"#a9a9a9",
    borderTopWidth:0.25,
    flexDirection:'row',
    alignItems:'center',
    backgroundColor:"#FFF"
},
AvatarImage:{
    height:30,
    width:30,
    borderRadius:15,
    marginTop:10,
    marginLeft:10,
    padding:10,
    borderWidth:1

},
commentContainer:{
    flex:1
}
});