import React, { useState, useRef, useEffect } from "react";
import {
    View,
    Animated,
    Image,
    Button,
    ScrollView,
    Text,
    StyleSheet,
    Dimensions,
    PanResponder,
} from "react-native";
import { transform } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
import { Component } from "react/cjs/react.production.min";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

const Images = [
    { id: "1", uri: require("../assets/1.jpg") },
    { id: "2", uri: require("../assets/2.jpg") },
    { id: "3", uri: require("../assets/3.jpg") },
    { id: "4", uri: require("../assets/4.jpg") },
    { id: "5", uri: require("../assets/5.jpg") },
];

function Swiper(props) {
    const position = new Animated.ValueXY();
    const [state, setState] = useState({ currentIndex: 0 });
    const rotate = position.x.interpolate({
        inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
        outputRange: ["-10deg", "0deg", "10deg"],
        extrapolate: "clamp",
    });
    const rotateAndTranslate = {
        transform: [
            {
                rotate: rotate,
            },
            ...position.getTranslateTransform(),
        ],
    };
    const likeOpacity = position.x.interpolate({
        inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
        outputRange: [0, 0, 1],
        extrapolate: "clamp",  
    });
    const dislikeOpacity = position.x.interpolate({
        inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
        outputRange: [1, 0, 0],
        extrapolate: "clamp",  
    });
    const nextCardOpacity = position.x.interpolate({
        inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
        outputRange: [1, 0, 1],
        extrapolate: "clamp",  
    });
    const nextCardScale = position.x.interpolate({
        inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
        outputRange: [1, 0.8, 1],
        extrapolate: "clamp",  
    })


    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (evt, getusreState) => true,
        onPanResponderMove: (evt, getusreState) => {
            position.setValue({ x: getusreState.dx, y: getusreState.dy });
        },
        onPanResponderRelease: (evt, getusreState) => {
            if (getusreState.dx>120){
                Animated.spring(position, {
                    toValue:{x:SCREEN_WIDTH + 100, y:getusreState.dy},
                    useNativeDriver: true,
                }).start(() => {
                    setState(state.currentIndex + 1 <= 4 ? {currentIndex: state.currentIndex + 1} : {currentIndex: 0});
                    position.setValue({ x: 0, y: 0 });
                })
            } else if (getusreState.dx<-120){
                Animated.spring(position, {
                    toValue:{x:-SCREEN_WIDTH - 100, y:getusreState.dy},
                    useNativeDriver: true,
                }).start(() => {
                    setState(state.currentIndex + 1 <= 4 ? {currentIndex: state.currentIndex + 1} : {currentIndex: 0});
                    position.setValue({ x: 0, y: 0 });
                })
            } else {
                Animated.spring(position, {
                    toValue:{x:0, y:0},
                    friction: 4,
                    useNativeDriver: true
                }).start()
            }
        }
    });

    const renderImage = () => {
        return Images.map((item, i) => {
            if (i < state.currentIndex) {
                return null;
            } else if (i == state.currentIndex) {
                return (
                    <Animated.View
                        {...panResponder.panHandlers}
                        key={item.id}
                        style={[rotateAndTranslate, styles.imageAnimation]}
                    >
                        <Animated.View style={[styles.likeAnimation, {opacity: likeOpacity}]}>
                            <Text style={styles.likeText}>LIKE</Text>
                        </Animated.View>
                        <Animated.View style={[styles.dislikeAnimation, {opacity: dislikeOpacity}]}>
                            <Text style={styles.dislikeText}>NOPE</Text>
                        </Animated.View>
                        <Image
                            style={styles.image}
                            source={item.uri}
                        />
                    </Animated.View>
                );
            } else {
                return (
                    <Animated.View key={item.id} style={[{opacity:nextCardOpacity, transform:[{scale:nextCardScale}]}, styles.imageAnimation]}>
                        <Image
                            style={styles.image}
                            source={item.uri}
                        />
                    </Animated.View>
                );
            }
        }).reverse();
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.header}></View>
            <View style={styles.content}>{renderImage()}</View>
            <View style={styles.header}></View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        height: 60,
    },
    footter: {
        height: 60,
    },
    content: {
        flex: 1,
        backgroundColor: "#fff",
    },
    imageAnimation: {
        height: SCREEN_HEIGHT - 120,
        width: SCREEN_WIDTH,
        padding: 10,
        position: "absolute",
    },
    image: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: "cover",
        borderRadius: 20,
    },
    likeText: {
        borderWidth: 1,
        backgroundColor: "#fff",
        borderColor: 'green',
        color: "green",
        fontSize: 32,
        fontWeight: 'bold',
        padding: 10
    },
    dislikeText: {
        borderWidth: 1,
        backgroundColor: "#fff",
        borderColor: 'red',
        color: "red",
        fontSize: 32,
        fontWeight: 'bold',
        padding: 10
    },
    likeAnimation: {
        transform:[{rotate: "-10deg"}],
        position: "absolute",
        top: 50,
        left: 40,
        zIndex: 1000
    },
    dislikeAnimation: {
        transform:[{rotate: "10deg"}],
        position: "absolute",
        top: 50,
        right: 40,
        zIndex: 1000
    }
});

export default Swiper;
