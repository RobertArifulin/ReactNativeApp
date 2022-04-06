import React, { useState, useRef, useEffect } from "react";
import {
    View,
    Animated,
    Image,
    Button,
    ScrollView,
    Text,
    StatusBar,
    StyleSheet,
    Dimensions,
    PanResponder,
} from "react-native";
import Kard from './Kard' 

let widgetWidth = 0;
let SCREEN_HEIGHT = Dimensions.get("window").height;
let SCREEN_WIDTH = Dimensions.get("window").width;

const Items = [
    {id : "1" , uri: <Kard name="Name One" customer="Winston Churchill"/>},
    {id : "2" , uri: <Kard name="Name Two" customer="Winston Churchill"/>},
    {id : "3" , uri: <Kard name="Name Three" customer="Winston Churchill"/>},
    {id : "4" , uri: <Kard name="Name Four" customer="Winston Churchill"/>},
    {id : "5" , uri: <Kard name="Name Five" customer="Winston Churchill"/>},
];
const Images = [
    { id: "1", uri: require("../assets/1.jpg") },
    { id: "2", uri: require("../assets/2.jpg") },
    { id: "3", uri: require("../assets/3.jpg") },
    { id: "4", uri: require("../assets/4.jpg") },
    { id: "5", uri: require("../assets/5.jpg") },
];

function Swiper(props) {
    const defaultY = 0
    const position = new Animated.ValueXY({x : 0, y : defaultY});
    const [state, setState] = useState({ currentIndex: 0 });
    const rotate = position.x.interpolate({
        inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
        outputRange: ["-10deg", "0deg", "10deg"],
        extrapolate: "clamp",
    });
    const likeRotate = position.x.interpolate({
        inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
        outputRange: ["10deg", "0deg", "-10deg"],
        extrapolate: "clamp",
    });
    const dislikeRotate = position.x.interpolate({
        inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
        outputRange: ["10deg", "0deg", "-10deg"],
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
    const rotateAndTranslateLike = {
        transform: [
            {
                rotate: likeRotate,
            },
            // ...position.getTranslateTransform(),
        ],
    };
    const rotateAndTranslateDislike = {
        transform: [
            {
                rotate: dislikeRotate,
            },
            // ...position.getTranslateTransform(),
        ],
    };
    const likeOpacity = position.x.interpolate({
        inputRange: [-SCREEN_WIDTH / 3, 0, SCREEN_WIDTH / 3],
        outputRange: [0, 0, 1],
        extrapolate: "clamp",  
    });
    const dislikeOpacity = position.x.interpolate({
        inputRange: [-SCREEN_WIDTH / 3, 0, SCREEN_WIDTH / 3],
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
            position.setValue({ x: getusreState.dx, y: defaultY + getusreState.dy });
        },
        onPanResponderRelease: (evt, getusreState) => {
            if (getusreState.dx>SCREEN_WIDTH / 3){
                Animated.timing(position, {
                    toValue:{x:SCREEN_WIDTH + 100, y: defaultY + getusreState.dy},
                    duration: 300,
                    useNativeDriver: true,
                }).start(() => {
                    setState(state.currentIndex + 1 <= 4 ? {currentIndex: state.currentIndex + 1} : {currentIndex: 0});
                    position.setValue({ x: 0, y: defaultY });
                })
            } else if (getusreState.dx<-SCREEN_WIDTH / 3){
                Animated.timing(position, {
                    toValue:{x:-SCREEN_WIDTH - 100, y:defaultY + getusreState.dy},
                    duration: 300,
                    useNativeDriver: true,
                }).start(() => {
                    setState(state.currentIndex + 1 <= 4 ? {currentIndex: state.currentIndex + 1} : {currentIndex: 0});
                    position.setValue({ x: 0, y: defaultY });
                })
            } else {
                Animated.spring(position, {
                    toValue:{x:0, y: defaultY},
                    friction: 5,
                    useNativeDriver: true
                }).start()
            }
        }
    });

    const renderImage = () => {
        return Items.map((item, i) => {
            if (i < state.currentIndex) {
                return null;
            } else if (i == state.currentIndex) {
                return (
                    <Animated.View
                        {...panResponder.panHandlers}
                        key={item.id}
                        style={[rotateAndTranslate, styles.topImageAnimation]}
                    >   
                    <Animated.View style={[rotateAndTranslateLike, styles.likeAnimation, {opacity: likeOpacity}]}>
                        <Text style={styles.likeText}>LIKE</Text>
                    </Animated.View>
                    <Animated.View style={[styles.dislikeAnimation, rotateAndTranslateDislike, {opacity: dislikeOpacity}]}>
                        <Text style={styles.dislikeText}>NOPE</Text>
                    </Animated.View>
                        {item.uri}

                    </Animated.View>
                );
            } else {
                return (

                    <Animated.View key={item.id} 
                                   style={[{opacity:nextCardOpacity, transform:[{scale:nextCardScale}]}, styles.lowerImageAnimation]}>
                        {/* <Image
                            style={styles.image}
                            source={item.uri}
                        /> */}
                        {item.uri}
                    </Animated.View>
                );
            }
        }).reverse();
    };
    return (
        <View style={{ flex: 5 }}>
            <View style={styles.header}/>
            <View style={styles.content} onLayout={(event) => {SCREEN_HEIGHT = event.nativeEvent.layout.h}} >
                {renderImage()}
            </View>
            {/* <View style={styles.footer}/> */}
        </View>
    );

}
const styles = StyleSheet.create({
    header: {
        height: StatusBar.currentHeight,
        backgroundColor: "#fff",
    },
    footer: {
        height: 20,
        backgroundColor: "#fff",
    },
    content: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: 'center',
        justifyContent: 'center'
    },
    topImageAnimation: {
        height: SCREEN_HEIGHT / 6 * 5 - 40,
        width: SCREEN_WIDTH,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center'
        
    },
    lowerImageAnimation: {
        height: SCREEN_HEIGHT / 6 * 5 - 40,
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
        backgroundColor: "#E0E0E0",
        color: "green",
        fontSize: 64,
        fontWeight: 'bold',
        padding: 10
    },
    dislikeText: {
        backgroundColor: "#E0E0E0",
        color: "red",
        fontSize: 64,
        fontWeight: 'bold',
        padding: 10
    },
    likeAnimation: {
        position: "absolute",
        zIndex: 2,
    },
    dislikeAnimation: {
        position: "absolute",
        zIndex: 2,
    }
});

export default Swiper;
