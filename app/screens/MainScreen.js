import React, { useState } from 'react';
import {View, StyleSheet, StatusBar, Text, Dimensions, Linking, Alert, Button} from 'react-native';
import Swiper from '../modules/Swiper';
import {getToken, clientResponse, getProjectsTable, usedCode} from "../modules/GetAccessToken"
import Kard from "../modules/Kard";
// https://robertarifulin.github.io/ReactNativeApp/?code=83cb2972-de5b-428b-bf60-96e452d7878a&state=

const { Client } = require("@notionhq/client");

let text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum";

const Items = [
    {id : "1" , uri: <Kard name="Name One" customer="Winston Churchill" description={text}/>},
    {id : "2" , uri: <Kard name="Name Two" customer="Winston Churchill" description={text}/>},
    {id : "3" , uri: <Kard name="Name Three" customer="Winston Churchill" description={text}/>},
    {id : "4" , uri: <Kard name="Name Four" customer="Winston Churchill" description={text}/>},
    {id : "5" , uri: <Kard name="Name Five" customer="Winston Churchill" description={text}/>},
];

let notion = null;
let code = "";
const redirect_uri = "https://robertarifulin.github.io/ReactNativeApp/";
const URL = 'https://api.notion.com/v1/oauth/authorize?owner=user&client_id=728d9ca7-3680-4bfd-a63f-adacfa7ca050&redirect_uri=' + redirect_uri + '&response_type=code';

const {screenWidth, screenHeight} = Dimensions.get("screen");

function MainScreen(props) {
    const [isLoading, setLoading] = useState(true);
    const [json, setJson] = useState(0);
    const [projects, setProjects] = useState([]);
     
    Linking.addEventListener('url', async function(url) {
        if (((url.url.match(new RegExp("/", "g")) || []).length > 2 || url.url[0] == 'r')) {
            initialUrl = url.url;
            code = initialUrl.slice(initialUrl.lastIndexOf("/") + 1);
            if (!usedCode.includes(code)) {
                usedCode.push(code);
                let values = await getToken(code);
                setJson(await values[0]);
                notion = await values[1];
                console.log("___________________Logged in Successfully___________________");
                // clientResponse(notion);
                setProjects(await getProjectsTable(notion));
                Alert.alert("Успех!", "Успешная авторизация",
                [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ]);
                if (projects.length > 0) {
                    Alert.alert("Успех!", "Успешная авторизация");
                }
            }
        }
    });
// https://robertarifulin.github.io/ReactNativeApp/?code=93239bb3-6a3b-4a84-a8a4-288e7d6846ac&state=
    return (
        <>
        <View style={{flex: 5}}>
            <Swiper projects={projects.length > 0 ? projects : Items}/>
        </View>
        <View style={styles.lowerBar}>
            <Text style={styles.text}>
                <Text style={styles.headingText}>Проект: Tinder для проектов{"\n"}</Text>
                <Text style={styles.innerText}>Заказчик: Гусев Антон{"\n"}</Text>
                <Text style={styles.innerText} >Исполнитель: Арифулин Роберт{"\n"}</Text>
                <Button style={[styles.innerText, {color:"blue", padding: 20}]} onPress={() => {Linking.openURL(URL)}} title="Авторизация"></Button>
                {/* <Text style={styles.innerText}>Токен: {json.access_token}</Text> */}
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
        marginHorizontal: 20,
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