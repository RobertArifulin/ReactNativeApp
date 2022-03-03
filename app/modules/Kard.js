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

let SCREEN_HEIGHT = Dimensions.get("window").height;
let SCREEN_WIDTH = Dimensions.get("window").width;

function Kard(props) {
    return (
        <View style={{ flex: 1, backgroundColor: 'red' }}>
            <View style={styles.header}/>
            <View style={styles.content}>{renderImage()}</View>
            <View style={styles.header}/>
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
});

export default Kard;
