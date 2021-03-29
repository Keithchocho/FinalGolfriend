import React, { useState, useEffect, useContext, useRef } from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    TouchableOpacity, 
    StatusBar,
    Dimensions,
    Button,
    Alert,
    Modal,
    ActivityIndicator,
} from 'react-native';
import { Camera } from 'expo-camera';
import { Audio, Video } from 'expo-av';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import AuthContext from '../../Context/AuthContext';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Animated from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import * as MediaLibrary from 'expo-media-library';

const SERVER_IP = "121.138.83.4";
const POSE_NAME = ["address", "take away", "back swing", "top", "down swing", "impact", "release", "follow through"];

const RecordScreen = ({ navigation }) => {

    const WIDTH = Dimensions.get('window').width; 

    const [cameraPermission, setcameraPermission] = useState(null);
    const [audioPermission, setHasAudioPermission ] = useState(null);
    const [mediaPermission, setMediaPermission] = useState(null);
    
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [cameraReady , setCameraReady] = useState(false);
    const [status, setStatus] = useState({});
    // const [modalVisible, setModalVisible] = useState(false);

    const [videoUri, setVideoUri] = useState(null);
    const [recording, setRecording] = useState(false);
    const [modalup, setModalup] = useState(false);
    const [videoExplain, setVideoExplain] = useState(false);
    const [ loading, setLoading ] = useState(false);

    const { getJWT } = useContext(AuthContext);

    const camera = useRef();
    const video = useRef();

    // 동영상&오디오&카메라저장 권한 승인
    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setcameraPermission(status === 'granted');
        })();
    }, []);
  
    useEffect(()=>{
        (async()=>{
            const { status } = await Audio.requestPermissionsAsync();
            setHasAudioPermission(status === 'granted');
        })();
    }, []);

    // 갤러리 권한
    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            setMediaPermission(status === 'granted');
        })();
    }, []); 
 
    const record = async () => {
        const options ={
            maxDuration: 8,
            quality:'4:3',
        }

        if(cameraReady) {
            setRecording(true);
            console.log('Start Recording Video')
            const result = await camera.current.recordAsync(options);
            console.log(result.uri)
            setVideoUri(result.uri);
            // navigation.navigate('Video', {
            //     uri: result.uri,
            // })
        }
    };

    const stopRecord = async () =>{
        setRecording(false);
        await camera.current.stopRecording();
        // setModalVisible(true);
    };

    // const pickVideo = () => {
    //     let result = await ImagePicker.launchImageLibraryAsync({
    //         mediaTypes: ImagePicker.MediaTypeOptions.Videos,
    //     });

    //     console.log(result.uri);
    //     if (!result.cancelled) {
    //         setVideoUri(result.uri);
    //         navigation.navigate('Video', {
    //             uri: result.uri,
    //         })
    //     }
    // }

    const pickVideo = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Videos,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.cancelled) {
          setVideoUri(result.uri);
        //   navigation.navigate('Video', {
        //       uri: result.uri,
        //   });
        }
    };

    const sendVideo = async () => {
        const userToken = await getJWT();
        const formData = new FormData();
        formData.append('video',{
            name: "video_upload",
            type: 'video/mp4',
            uri: videoUri,
        })
        // console.log(uri);
        let result = await fetch(`http://${SERVER_IP}:80/uploads`, {
            method : 'POST',
            headers : {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${userToken}`, 
            },
            body: formData,
        })
        .then(res => res.json())
        .catch(e => console.log(e));

        console.log(result);        
        console.log('uploading to server')

        // let imageNumber = Object.keys(result);
        // Array.splice => imageNumber 는 "image_path" 제외된 숫자로 된 Array
    
        // const imagePath = result[imageNumber.splice(-1, 1)];
        // console.log(imagePath);
        const imagePath = result['filePath'];
        console.log('이미지 이름: ', imagePath);

        await FileSystem.makeDirectoryAsync(
            FileSystem.documentDirectory + imagePath
        );
        
        // indexes = [0, 1, 2, 3, 4, 5, 6, 7]
        const indexes = [...Array(8).keys()]; 
        let images = indexes.map(index => (
            FileSystem.downloadAsync(
                `http://${SERVER_IP}:80/images/${imagePath}/${index}`,
                FileSystem.documentDirectory + imagePath + `/${index}.png`
            )
        ));
        images = await Promise.all(images);

        const data = indexes
                        .map(key => ({
                            key: POSE_NAME[key],
                            feedback: result[key],
                            image: images[key].uri,
                        }));
        
        console.log(images);
        console.log('Feedback 페이지로 이동');

        navigation.navigate('Feedback', {
            data: data,
        })
    }

    if (cameraPermission === null) {
      return <View />;
    }
    if (cameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
  
    if(audioPermission === null){
      return <View />;
    } 
    if (audioPermission === false){
      return <Text>No access to Audio</Text>;
    }

    if (mediaPermission === null){
        return <View />;
    } 
    if (mediaPermission === false){
        return <Text>No access to Media</Text>;
    }

    return(    
    <View style={styles.container}>
    <StatusBar 
        hidden
        // backgroundColor="transparent"
        // style="light"
    />       
         {/* 상단 버튼 감싸는 View 시작 */}
         <View   style={styles.headerContainer}>    
            {/* 정면 뷰, 측면 뷰 버튼 */}
            <View style={{ flexDirection: 'row', height:40, alignItems:'center', justifyContent:'space-around' }}>
                <TouchableOpacity onPress={{}}>
                        <MaterialCommunityIcons name='face' size={30} color="black" style={{marginRight:33}} />
                        <Text style={styles.buttonText}>
                            정면 샷
                        </Text>
                </TouchableOpacity>
            
                <TouchableOpacity onPress={{}}>
                        <MaterialCommunityIcons name='face-profile' size={30} color="black"  style={{marginRight:33}}/>
                        <Text style={styles.buttonText}>
                            측면 샷
                        </Text>
                </TouchableOpacity>
          
                {/* 갤러리 선택 버튼 */}
                <TouchableOpacity onPress={pickVideo}>
                    <FontAwesome5 name ='photo-video' size ={30} color ={'black'}  style={{marginRight:33}}/>
                    <Text style={styles.buttonText} >
                         갤러리
                    </Text>
                </TouchableOpacity>
                {/* 도움  버튼 */}
                <TouchableOpacity onPress={()=>{setVideoExplain(true);}}>
                    <FontAwesome5 name ='question-circle' size ={30} color ={'black'} style={{marginRight:33}}/>
                    <Text style={styles.buttonText} />
                </TouchableOpacity> 
                
            {/* 뒤로가기 */}
            <TouchableOpacity 
             onPress={() => navigation.navigate('UserLatestSwing')}>
                <Icon name="close-outline" size={55} color="black"  />
                <Text style={styles.buttonText} />
            </TouchableOpacity>
            </View>
        </View>
            {/* 영상촬영 설명 모달창 시작*/}
        <Modal
            animationType="slide"
            transparent={true}
            visible={videoExplain}
            onRequestClose={()=> {setVideoExplain(!videoExplain);}}>
            <View style={styles.modalView}>
            <Text style={{color:"#FFF",fontStyle:"italic", marginVertical:10,textAlign:"center",fontSize:15}}>1. 동영상을 촬영해 분석할 수 있어요!.</Text>
                                
            <Text style={{color:"#FFF",fontStyle:"italic",marginVertical:10,lineHeight:20,fontSize:15}}>2. 이미 스윙 영상이 있으신가요?! {'\n'} 영상을 바로 업로드해보세요!</Text>
            <Text style={{color:"#FFF",fontStyle:"italic",marginVertical:10,lineHeight:20,fontSize:15}}>
                <Icon name ="alert-outline" size ={20}/> 시작전 꼭! 어레이 자세에서 포징 후 시작해야 정확한 분석이 됩니다.</Text> 
            <TouchableOpacity onPress ={()=> setVideoExplain(false)}>
                <Text style={{color:"#FFF",marginVertical:10,lineHeight:20,textDecorationLine:"underline",fontSize:18}}>닫기</Text>
            </TouchableOpacity>
            </View>
        </Modal>
        {/* 영상촬영 모달 페이지 종료 */} 
       {/* 카메라 동여상 촬영 종료시 작동되는 모달 페이지 시작점*/}
       {/* <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={()=> {setModalVisible(!modalVisible);}}>
        <View style={styles.modalView}>
            <View style={{width:"100%", flexDirection:'row' ,justifyContent:'flex-end',flex:1}}>
              <TouchableOpacity  onPress={()=> setModalVisible(!modalVisible)}>
                <Icon name = 'arrow-back-outline' size ={30} color="#FFF"  />
              </TouchableOpacity>
            </View>
            <View style={{flex:1.5}}>
              <View style ={styles.ModalheaderButton} >
                      <Icon name ='analytics-outline' size ={30} color ={'#73E681'} />
                      <TouchableOpacity onPress={()=>{
                        uploadingVideo(); 
                        setModalVisible(!modalVisible);
                      }
                      }>
                          <Text style={styles.ModalbuttonText}>
                              분석
                          </Text>
                      </TouchableOpacity>
                </View>
                <View style ={styles.ModalheaderButton} >
                    <Icon name ='refresh-outline' size ={30} color ={'#73E681'} />
                      <TouchableOpacity onPress={()=> setModalVisible(!modalVisible)}>
                          <Text style={styles.ModalbuttonText}>
                              재촬영
                          </Text>
                      </TouchableOpacity>
                </View>
              </View>
        </View>
      </Modal> */}
       {/* 카메라 동여상 촬영 종료시 작동되는 모달 페이지 종료*/}  

        <View
            style={{
                flex: 6,
                // backgroundColor: 'red',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
        {!videoUri ? (
            <Camera 
                style={{
                    // width: "96%",
                    // height:"92%",
                    // flex: 3,
                    // position: 'absolute',
                    // top: 50,
                    // bottom: 20,
                    width: WIDTH,
                    height: WIDTH * 4 / 3,
                    // marginBottom:9,
                    justifyContent:'flex-end',
                }} 
                ratio='4:3'
                type= { type }
                ref={camera}
                onCameraReady={() => setCameraReady(true)}
            />

        ) : (
            <Video
                        ref={video}
                        style={{
                            // flex: 1,
                            width: WIDTH,
                            height: WIDTH * 4 / 3,
                        }}
                        source={{
                            uri: videoUri,
                        }}
                        useNativeControls
                        isLooping
                        resizeMode='cover'
                        onPlaybackStatusUpdate={status => setStatus(() => status)}
                    />
        )}

        
        </View>

        {/* 하단 버튼 박스 */}
        <View 
            style={{
                flex: 2,
                flexDirection:'row',
                // color:"#FFF",
                // width:"100%",
                // height:150,
                justifyContent:'center',
                alignItems: 'center',                
                // backgroundColor: 'black'
            }}
        >

            {/* 카메라 토클 버튼 */}
            <TouchableOpacity
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                onPress={() => {
                setType(
                    type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );}}>
                <Icon name = 'ios-camera-reverse-outline' size={30} style={{color:"black"}} />
                <Text style={{ fontSize: 10, }}>카메라 전환</Text>
            </TouchableOpacity>
        
            {/* 녹화 버튼 */}
            {/* <View  
                style={{
                    // flex: 1,
                    justifyContent: 'center',
                    alignItems:"center",
                    width: WIDTH * 0.4,
                    height: WIDTH * 0.4,
                    // backgroundColor: 'black',
                    borderRadius: WIDTH * 0.4 * 0.5,
                    borderColor: '#90ee90',
                    borderWidth: 5,
                    // backgroundColor: 'blue'
                }}
            > */}
                   <TouchableOpacity
                        style={{
                    // flex: 1,
                    justifyContent: 'center',
                    alignItems:"center",
                    width: WIDTH * 0.3,
                    height: WIDTH * 0.3,
                    // backgroundColor: 'black',
                    borderRadius: WIDTH * 0.4 * 0.5,
                    borderColor: '#73E681',
                    borderWidth: 5,
                    // backgroundColor: 'blue'
                }}
                        onPress={(!loading) ? (!videoUri) ? (!recording ? record : stopRecord) : (sendVideo) : (progessBar) } >
                    
                        {   !loading  ?
                            !videoUri ? 
                            // <Animated.View style ={ recording ? styles.startRecordingButton : styles.stopRecordingButton }>
                            //     {/* <Text>녹화</Text> */}
                            // </Animated.View>
                            !recording ? (
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <FontAwesome5 name="video" size={50} color="#73E681" />
                                    {/* <Text>촬영</Text> */}
                                </View>   
                            ) : (
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <FontAwesome5 name="video-slash" size={50} color="#73E681" />
                                    {/* <Text>정지</Text> */}
                                </View>  
                        ) : (
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <FontAwesome name="cloud-upload" size={50} color="#73E681" />
                                <Text>분석</Text>
                            </View>
                        ) : (
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                               <ActivityIndicator  color ="#73E681" size ="large" />
                            </View>
                        )}
                        
                    </TouchableOpacity>
            {/* </View> */}
            
            {/* 다시 찍기 */}
            <TouchableOpacity
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                onPress={() => setVideoUri(null)}>
                <MaterialIcons name = 'replay' size={30} style={{color:"black"}} />
                <Text style={{ fontSize: 10, }}>다시 찍기</Text>
            </TouchableOpacity>
        </View>

    </View>
    );
};

export default RecordScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center',
    },

    text: {
      fontSize: 18,
      color: 'white',
    },
    buttonText:{
        textAlign:'center',
        // color:"#73E681"
        color: 'black',
        marginRight:33
    },
    startRecordingButton:{
        backgroundColor:"#FF0000",
        alignItems:"center",
        justifyContent:"center",
        width: 40,
        height: 40,
        borderRadius: 8,
        shadowColor:"#4169e1",
        shadowOffset:{ height:10 },
        shadowOpacity: 0.3,
        borderColor:"#FFF",
        shadowRadius:10,
    },
    stopRecordingButton:{
        // backgroundColor:"#FF0000",
        alignItems:"center",
        justifyContent:"center",
        width: 40,
        height: 40,
        borderRadius: 50,
        shadowColor:"#4169e1",
        shadowOffset:{ height:10 },
        shadowOpacity: 0.3,
        borderColor:"#FFF",
        shadowRadius:10,
    },
    
    modalView: {
      flex:1,
      backgroundColor: "rgba(0,0,0,0.7)",
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      flexDirection:'column',
      justifyContent:'center'
    },

    ModalheaderButton:{
      width:150,
      height:60,
      borderWidth:1.2,
      backgroundColor:"#FFFFFF",
      marginTop:10,
      marginBottom:7,
      marginLeft:12,
      borderRadius:50,
      justifyContent:'center',
      borderColor:"#73E681",
      flexDirection:'row',
      alignItems:'center',
  },

  ModalbuttonText:{
    textAlign:'center',
    color:"#73E681",
    fontSize:25,
    fontWeight:'normal',
  },
  headerContainer:{
    flexDirection:'row', 
    height:80,
    alignItems:'center' 
  },
});