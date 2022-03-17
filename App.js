import React, { useState, useEffect } from "react";
import {
  Linking,
  StyleSheet,
  Text,
  View, 
} from "react-native";
import MainScreen from "./app/screens/MainScreen";
// import {NOTION_KEY, NOTION_DATABASE_ID} from "@env"


// const { Client } = require("@notionhq/client")

// const notion = new Client({ auth: NOTION_KEY });

export default function App() {
  return (
    <MainScreen/>
  );
}