import React from 'react';
import {View, StyleSheet, Platform, StatusBar, Text, Animation, Dimensions, Linking} from 'react-native';
import Swiper from '../modules/Swiper';
import AnimTest from '../modules/AnimationTest'
import Kard from '../modules/Kard';

const {screenWidth, screenHeight} = Dimensions.get("screen");

function MainScreen(props) {
    let swiperHeight = 0;
    function hyperLink(){
        Linking.openURL('https://api.notion.com/v1/oauth/authorize?owner=user&client_id=463558a3-725e-4f37-b6d3-0889894f68de&redirect_uri=https%3A%2F%2Fexample.com%2Fauth%2Fnotion%2Fcallback&response_type=code');
    }

    return (
        <>
        <View style={{flex: 5}}>
            <Swiper/>
        </View>
        <View style={styles.lowerBar}>
            <Text style={styles.text}>
                <Text style={styles.headingText}>Проект: Tinder для проектов{"\n"}</Text>
                <Text style={styles.innerText}>Заказчик: Гусев Антон{"\n"}</Text>
                <Text style={styles.innerText} >Исполнитель: Арифулин Роберт{"\n"}</Text>
                <Text style={styles.innerText} onPress={hyperLink}>Ссылка на авторизацию</Text>
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