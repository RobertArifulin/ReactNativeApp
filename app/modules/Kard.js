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
    Alert,
    Pressable,
    Modal,
} from "react-native";

const { Client } = require("@notionhq/client");

let SCREEN_HEIGHT = Dimensions.get("window").height;
let SCREEN_WIDTH = Dimensions.get("window").width;
const text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum";

function Kard(props) {
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <View style={styles.main}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <ScrollView contentContainerStyle={styles.popupScrollView}>
                        <Text style={[styles.contentText, {paddingBottom: 20}]}>{text}</Text>
                        <Pressable
                            style={styles.button}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.buttonText}>Скрыть</Text>
                        </Pressable>
                    </ScrollView>
                    <View></View>
                </View>
            </Modal>
            <View style={styles.mainHeader}>
                <Text style={styles.projectName}>{props.name}</Text>
                <Text style={styles.projectCustomer}>{props.customer}</Text>
            </View>
            <View style={styles.mainContent}>
                <View
                    style={{
                        marginHorizontal: 15,
                        marginVertical: 10,
                        flex: 1,
                    }}
                >
                    <View style={styles.innerContent}>
                        <Text
                            style={styles.contentText}
                            ellipsizeMode="tail"
                            numberOfLines={10}
                        >
                            {text}
                        </Text>
                    </View>
                    <View style={styles.innerFootter}>
                        <Pressable onPress={() => setModalVisible(true)} style={styles.popupButton}>
                            <Text style={styles.fotterText}>...</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: "#fff",
        borderRadius: 20,
        borderColor: "#878787",
        borderWidth: 2,
    },
    mainHeader: {
        flex: 1,
        backgroundColor: "#fff",
        borderBottomColor: "#878787",
        borderBottomWidth: 2,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    projectName: {
        fontFamily: "Roboto",
        textAlign: "center",
        color: "#000000",
        fontSize: 28,
    },
    projectCustomer: {
        fontFamily: "Roboto",
        textAlign: "center",
        color: "#777777",
        fontSize: 25,
    },
    mainContent: {
        flex: 5,
        backgroundColor: "#fff",
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    innerContent: {
        flex: 7,
        backgroundColor: "#E0E0E0",
        borderBottomColor: "#858585",
        borderBottomWidth: 2,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        alignItems: "center",
        // justifyContent: 'center',
    },
    innerFootter: {
        flex: 1,
        height: 60,
        backgroundColor: "#E0E0E0",
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        // alignItems: "center",
        justifyContent: "center",
    },
    fotterText: {
        fontFamily: "Roboto",
        textAlign: "center",
        color: "#000000",
        fontSize: 28,
    },
    contentText: {
        fontFamily: "Roboto",
        textAlign: "center",
        color: "#000000",
        fontSize: 25,
        padding: 10,
        lineHeight:
            ((((((SCREEN_HEIGHT / 6) * 5 - 40) / 6) * 5 - 20) / 8) * 7 - 40) /
            10,
        textAlign: "left",
    },
    button: {
        borderRadius: 20,
        backgroundColor: "#E5E5E5",
        padding: 10,
    },
    popupButton: {
        flex: 1,
        borderRadius: 20,
        backgroundColor: "#E0E0E0",
        padding: 10,
    },
    buttonText: {
        fontFamily: "Roboto",
        textAlign: "center",
        color: "#000000",
        fontSize: 24,
    },
    centeredView: {
        flex: 1,
        backgroundColor: "#E0E0E0",
        justifyContent: "center",
        alignItems: "center",
    },
    popupScrollView: {
        margin: 10,
        padding: 10,
        paddingBottom: 30,
        backgroundColor: "white",
        borderRadius: 20,
        borderColor: "#878787",
        borderWidth: 2,
    },
});

export default Kard;
