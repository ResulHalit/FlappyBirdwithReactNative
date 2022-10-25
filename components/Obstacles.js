import React from "react";
import {View} from 'react-native';

const Obstacles =({
    color,
    ObstaclesWidth,
    ObstaclesHeight,
    randomBottom,
    gap,
    ObstaclesLeft
}) => {
    return(
        <>
            <View style={{
                position:'absolute',
                backgroundColor: color,
                width: ObstaclesWidth,
                height: 500,
                left: ObstaclesLeft,
                bottom: randomBottom + ObstaclesHeight + gap
            }}></View>
            <View style={{
                position:'absolute',
                backgroundColor: color,
                width: ObstaclesWidth,
                height: 500,
                left: ObstaclesLeft,
                bottom: randomBottom + ObstaclesHeight + gap
            }}></View>
        
        </>
    )
};

export default Obstacles