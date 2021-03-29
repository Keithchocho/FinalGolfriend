import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    ScrollView,
    Image,
    Text,
    Dimensions,
    View,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

const SERVER_IP = "121.138.83.4";
const { width, height } = Dimensions.get('window');

const Awards = ({ token, badges }) => {
    // const [data, setData] = useState(null); 

    // useEffect(() => {
    //     (async () => {
            
    //         await axios.get(`http://${SERVER_IP}:80/get-my-badges`, {
    //             headers: {
    //                 'Authorization': `Bearer ${token}`
    //             }
    //         })
    //             .then(res => {
    //                 console.log('badges: ', res.data);
    //                 setData(res.data.badges);
    //                 console.log('setData', res.data.badges);
    //             })
    //             .catch(e => console.log(e));
    //     })();
    // }, []);

    return (
        <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={{ flex: 1 }}
        >
            {badges.map((item, index) => {
                console.log(item)
                return (
                    <View
                        key={index}
                        style={{ margin: 0, padding: 0, flexDirection: 'column',  justifyContent: 'center', alignItems: 'center' }}
                    >
                        <Image
                            style={styles.image}
                            // key={index}
                            source={{
                                uri: `http://${SERVER_IP}:80/get-badge-image/${item}`,
                                headers: {
                                    'Authorization': `Bearer ${token}`
                                },
                                // cache: 'reload'
                            }}
                        />
                        <Text style={{ fontSize: 10, fontWeight: 'bold' }}>{item.replace('_', ' ').toUpperCase()}</Text>
                    </View>  
                );
            })
            }
            
        </ScrollView>
    )
}

export default Awards;

const styles = StyleSheet.create({
    image: {
        width: width / 5,
        height: width / 5 / 73 * 106,
        paddingHorizontal: 0,
        marginHorizontal: width / 5 / 2 / 9,
        resizeMode: 'contain',
    }
})
