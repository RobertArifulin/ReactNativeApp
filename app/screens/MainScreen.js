import React, { useState, useEffect } from 'react';
import {View, StyleSheet, Platform, StatusBar, Text, Animation, Dimensions, Linking} from 'react-native';
import Swiper from '../modules/Swiper';
import base64 from 'react-native-base64';
import AnimTest from '../modules/AnimationTest';
import Kard from '../modules/Kard';
import {CLIENT_ID, CLIENT_SECRET} from "@env";

// https://robertarifulin.github.io/ReactNativeApp/?code=140b65cd-4d71-4708-86af-2ec4ccd8cb43&state=

const { Client } = require("@notionhq/client");

let notion = '';

const client_id = CLIENT_ID;
const client_secret = CLIENT_SECRET;
const redirect_uri = "https://robertarifulin.github.io/ReactNativeApp/";
let initialUrl = "";
let usedCode = [];
let code = "";

const authorization = "Basic " + base64.encode(client_id + ":" + client_secret) + "=";

const {screenWidth, screenHeight} = Dimensions.get("screen");

const useMount = func => useEffect(() => func(), []);
const useInitialURL = () => {
    const [url, setUrl] = useState(null);
    const [processing, setProcessing] = useState(true);

    useMount(() => {
    const getUrlAsync = async () => {
        const initialUrl = await Linking.getInitialURL();
        setTimeout(() => {
        setUrl(initialUrl);
        setProcessing(false);
        }, 1000);
    };

    getUrlAsync();
    });

    return { url, processing };
};


function MainScreen(props) {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const getToken = async () => {
        try {
            if (!usedCode.includes(code)) {
                const response = await fetch('https://api.notion.com/v1/oauth/token', {
                    method: 'POST',
                    headers: {
                        Authorization: authorization,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        grant_type: "authorization_code",
                        code: code,
                        redirect_uri: redirect_uri
                    })
                });
                const json = await response.json();
                console.log(123);
                console.log(json.access_token);

                if (json.access_token === undefined) {
                    console.log("!UNDEFINED!");
                } else {
                    setData(json);
                    console.log(2.1);
                    console.log(data.access_token);
                    notion = new Client({
                        auth: data.access_token,
                        });
                    usedCode.push(code);
                    ;(async () => {
                        const listUsersResponse = await notion.users.list({});
                        console.log(2);
                        console.log(listUsersResponse);
                    })();
                    console.log(3);
                    console.log(json);
                }
            }
        } catch (error) {
            console.log(4);
            console.error(error);
        } finally {
            setLoading(false);
        }
     }

     
    Linking.addEventListener('url', function(url) {
        if ((url.url.match(new RegExp("/", "g")) || []).length > 2 || url.url[0] == 'r') {
            initialUrl = url.url;
            code = initialUrl.slice(initialUrl.lastIndexOf("/") + 1);
            console.log(5);
            console.log(code);
            getToken();
        }
    });

    const { a: url, processing } = useInitialURL();
    try {
        if ((url.match(new RegExp("/", "g")) || []).length > 2 || url[0] == 'r') {
            initialUrl = url;
            code = initialUrl.slice(initialUrl.lastIndexOf("/") + 1);
            getToken();
        }
    } catch {
    } finally {
    }
    
   
    const URL = 'https://api.notion.com/v1/oauth/authorize?owner=user&client_id=728d9ca7-3680-4bfd-a63f-adacfa7ca050&redirect_uri=' + redirect_uri + '&response_type=code';
    function hyperLink(){
        Linking.openURL(URL);
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
                <Text style={[styles.innerText, {color:"blue"}]} onPress={hyperLink}>Ссылка на авторизацию{"\n"}</Text>
                <Text style={styles.innerText}>Токен: {data.access_token}</Text>
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