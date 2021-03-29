import React, { useState, useContext, useEffect } from 'react';
import {
    View,
    ScrollView,
} from "react-native";

import ProShotAndImprovement from './ProShotAndImprovement';

const PastFeedback = ({ data, token }) => {
    return (
        <View>           
            {/* 데이터를 받으면 개선 사항 뿌려줌 */}
            {data.map((item, index) => (
                <ProShotAndImprovement key={index} data={item} token={token} />   
            ))}
        </View>
    );
};

export default PastFeedback;