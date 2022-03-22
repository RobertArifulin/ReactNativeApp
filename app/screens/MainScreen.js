import React, { useState, useEffect } from 'react';
import {View, StyleSheet, Platform, StatusBar, Text, Animation, Dimensions, Linking} from 'react-native';
import Swiper from '../modules/Swiper';
import AnimTest from '../modules/AnimationTest'
import Kard from '../modules/Kard';

const {screenWidth, screenHeight} = Dimensions.get("screen");

Linking.addEventListener('url', script => {
    console.log(script);
})

function MainScreen(props) {
    const useMount = func => useEffect(() => func(), []);
    const useInitialURL = () => {
        const [url, setUrl] = useState(null);
        const [processing, setProcessing] = useState(true);
    
        useMount(() => {
        const getUrlAsync = async () => {
            // Get the deep link used to open the app
            const initialUrl = await Linking.getInitialURL();
            console.log(initialUrl);
            // The setTimeout is just for testing purpose
            setTimeout(() => {
            setUrl(initialUrl);
            setProcessing(false);
            }, 1000);
        };
    
        getUrlAsync();
        });
    
        return { url, processing };
    };
// https://example.com/auth/notion/callback?code=bd7c16b0-68fb-4eff-a112-3362ae87b1dc&state=
// https://api.notion.com/v1/oauth/authorize?owner=user&client_id=728d9ca7-3680-4bfd-a63f-adacfa7ca050&redirect_uri=https://example.com/auth/notion/callback&response_type=code
// https://www.notion.so/install-integration?response_type=code&client_id=728d9ca7-3680-4bfd-a63f-adacfa7ca050&redirect_uri=https%3A%2F%2Fexample.com%2Fauth%2Fnotion%2Fcallback&owner=user
// https://example.com/auth/notion/callback?code=4b4303e5-a927-40a8-a651-7e6614f899e8&state=
// const { url: initialUrl, processing } = useInitialURL();
    // const redirect_uri = "htts%3A%2F%2www.exp.com%2192.168.154.186:19000";
    const redirect_uri = "https://example.com/auth/notion/callback";
    // const initialUrl = "https://api.notion.com/v1/oauth/authorize?owner=user&client_id=728d9ca7-3680-4bfd-a63f-adacfa7ca050&redirect_uri=https%3A%2F%2Fexample.com%2Fauth%2Fnotion%2Fcallback&response_type=code";
    const URL = 'https://api.notion.com/v1/oauth/authorize?owner=user&client_id=728d9ca7-3680-4bfd-a63f-adacfa7ca050&redirect_uri=' + redirect_uri + '&response_type=code';
    // console.log(URL);
    // https://www.notion.so/oauth2callback?state=eyJjYWxsYmFja1R5cGUiOiJyZWRpcmVjdCIsImVuY3J5cHRlZFRva2VuIjoiZjA4OGQ2YzFkMDg3ZDU5NmUwMGFkOWM2YjU2NTQyNzAyMDgwZDdjOWE0NWI0MmMwYjE3NDdhYWVjMTQ0MWI2NjhjOTgzNTA0YzQ5NjVlOTg1MWNkYWYzYTQwYTI5ZGI1YzgzN2NmZWQ5YjAwNGI2NjcwZDkwMTI2ODFiOTBmZjgyODNmNTI1NWE4MzgwMDMzZDgyYjRhMzU2ZjU4In0%3D&code=4%2F0AX4XfWienu9jDH9RSWJzZtCiAe-wKtkvwiNl5sIiNvUDBabUgvF5PA0FpN42xkHAFp09QA&scope=email%20profile%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile%20openid&authuser=0&prompt=none
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