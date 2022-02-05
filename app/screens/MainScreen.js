import React from 'react';
import {View, StyleSheet, Platform, StatusBar, Text, Animation, Dimensions} from 'react-native';
import Swiper from '../modules/Swiper';

const {screenWidth, screenHeight} = Dimensions.get("screen");

function MainScreen(props) {
    return (
        <View style={styles.background}>
            <View style={styles.upperBar}>
                <Swiper/>
            </View>
            <View style={styles.lowerBar}>
                <Text style={styles.text}>
                    <Text style={styles.headingText}>Проект: Tinder для проектов{"\n"}</Text>
                    <Text style={styles.innerText}>Заказчик: Гусев Антон{"\n"}</Text>
                    <Text style={styles.innerText}>Исполнитель: Арифулин Роберт</Text>
                </Text>
            </View>
        </View>
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
        fontSize: 32,
    },
    innerText: {
        fontSize: 24,
    },
    lowerBar: {
        width: "100%",
        backgroundColor: "tomato",
        flex: 1
    },
    upperBar: {
        width: "100%",
        backgroundColor: "gold",
        flex: 2
    }
})

export default MainScreen;