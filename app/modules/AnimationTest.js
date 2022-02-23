import React, { useState, useRef } from 'react';
import {View, Animated, TouchableOpacity, Text, PanResponder} from "react-native"

const AnimTest = () => {

    return (
        <View>
            <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                <Animated.View style={[
                    {
                    width: 100,
                    height: 100,
                   opacity: opacity,
                    borderRadius: 100 / 2,
                    backgroundColor: "red",
                    }
                ]}>
                </Animated.View>
                <TouchableOpacity onPress={fadeinBall}>
                    <Text>Fade in!</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={fadeoutBall}>
                    <Text>Fade out!</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}


export default AnimTest;