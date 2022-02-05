import React, { useState } from 'react';
import {View, Animated, Button, ScrollView, Text, StyleSheet, Dimensions} from 'react-native';

function Swiper(props) {

    const value = useState(new Animated.ValueXY({x: 0, y: 0}))[0]
    function moveBall(){
        Animated.timing(value, {
            toValue: { x: 50, y: 0},
            duration: 1000,
            useNativeDriver: false,
        }).start()
    }

    return (
        <>
            {/* <Animated.View style={value.getLayout()}>
                <View style = {{
                    width: 100,
                    height: 100,
                    borderRadius: 50,
                    backgroundColor: "red",
                }}/>
            </Animated.View>
            <Button onPress={moveBall} title='Click'/> */}
            <ScrollView horizontal={true} snapToInterval={400} decelerationRate={"fast"} disableIntervalMomentum={true}>
                <View style={styles.childeView1}></View>
                <View style={styles.childeView2}></View>
                <View style={styles.childeView1}></View>
                <View style={styles.childeView2}></View>
                <View style={styles.childeView1}></View>
                <View style={styles.childeView2}></View>
                <View style={styles.childeView1}></View>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    childeView1: {
        width: 400,
        flex: 1,
        backgroundColor: "red",
        borderColor: "black",
    }, 
    childeView2: {
        width: 400,
        flex: 1,
        backgroundColor: "blue",
        borderColor: "black",
    }
})

export default Swiper;