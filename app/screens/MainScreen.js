import React, { useState, useEffect } from 'react';
import {View, StyleSheet, Platform, StatusBar, Text, Animation, Dimensions, Linking} from 'react-native';
import Swiper from '../modules/Swiper';
import AnimTest from '../modules/AnimationTest'
import Kard from '../modules/Kard';

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

let initialUrl = "123";
let code = "123";

Linking.addEventListener('url', function(url) {
    console.log(3);
    console.log(url.url);
    initialUrl = url.url;
    code = initialUrl.slice(initialUrl.lastIndexOf("/") + 1);
    console.log(code);
});


function MainScreen(props) {
    const { a: url, processing } = useInitialURL();
    try {
        initialUrl = url;
        code = initialUrl.slice(initialUrl.lastIndexOf("/") + 1);
    } catch {

    } finally {

    }
    
    console.log(initialUrl);

    const redirect_uri = "https://robertarifulin.github.io/ReactNativeApp/";
   
    const URL = 'https://api.notion.com/v1/oauth/authorize?owner=user&client_id=728d9ca7-3680-4bfd-a63f-adacfa7ca050&redirect_uri=' + redirect_uri + '&response_type=code';
    // https://robertarifulin.github.io/ReactNativeApp/?code=0bdfda5c-bd27-4991-9a02-e9e1343596d7&state=
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