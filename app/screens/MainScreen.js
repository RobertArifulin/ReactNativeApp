import React, { useState, useEffect } from 'react';
import {View, StyleSheet, Platform, StatusBar, Text, Animation, Dimensions, Linking} from 'react-native';
import Swiper from '../modules/Swiper';
import base64 from 'react-native-base64';
import AnimTest from '../modules/AnimationTest';
import Kard from '../modules/Kard';
import {CLIENT_ID, CLIENT_SECRET} from "@env";
import {getToken, createClient} from "../modules/GetAccessToken"

// https://robertarifulin.github.io/ReactNativeApp/?code=83cb2972-de5b-428b-bf60-96e452d7878a&state=

const { Client } = require("@notionhq/client");

let notion = null;
const usedCode = [];
let code = "";
const redirect_uri = "https://robertarifulin.github.io/ReactNativeApp/";
const URL = 'https://api.notion.com/v1/oauth/authorize?owner=user&client_id=728d9ca7-3680-4bfd-a63f-adacfa7ca050&redirect_uri=' + redirect_uri + '&response_type=code';

const {screenWidth, screenHeight} = Dimensions.get("screen");

function MainScreen(props) {
    const [isLoading, setLoading] = useState(true);
    const [json, setJson] = useState(0);
     
    Linking.addEventListener('url', async function(url) {
        if (((url.url.match(new RegExp("/", "g")) || []).length > 2 || url.url[0] == 'r')) {
            initialUrl = url.url;
            code = initialUrl.slice(initialUrl.lastIndexOf("/") + 1);
            if (!usedCode.includes(code)) {
                usedCode.push(code);
                setJson(await getToken(code));
                notion = await createClient(json.access_token);
            }
        }
    });
// https://robertarifulin.github.io/ReactNativeApp/?code=93239bb3-6a3b-4a84-a8a4-288e7d6846ac&state=
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
                <Text style={[styles.innerText, {color:"blue"}]} onPress={() => {Linking.openURL(URL)}}>Ссылка на авторизацию{"\n"}</Text>
                <Text style={styles.innerText}>Токен: {json.access_token}</Text>
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