import React from 'react';
import {View, StyleSheet, Platform, StatusBar, Text, Animation, Dimensions} from 'react-native';
import Swiper from '../modules/Swiper';
import AnimTest from '../modules/AnimationTest'

const {screenWidth, screenHeight} = Dimensions.get("screen");

function MainScreen(props) {
    let swiperHeight = 0;
    return (
        <>
        <Swiper/>
        <View style={styles.lowerBar}>
            <Text style={styles.text}>
                <Text style={styles.headingText}>Проект: Tinder для проектов{"\n"}</Text>
                <Text style={styles.innerText}>Заказчик: Гусев Антон{"\n"}</Text>
                <Text style={styles.innerText}>Исполнитель: Арифулин Роберт</Text>
            </Text>
        </View> 
        </>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: StatusBar.currentHeight,
    },
    text: {
        fontFamily: "Roboto",
        textAlign: "center",
        color: "#343835",
    },
    headingText: {
        fontWeight: "bold",
        fontSize: 20,
    },
    innerText: {
        fontSize: 16,
    },
    lowerBar: {
        width: "100%",
        backgroundColor: "tomato",
        flex: 1
    },
    upperBar: {
        width: "100%",
        backgroundColor: "#fff",
        flex: 5,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default MainScreen;