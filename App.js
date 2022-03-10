import React, { useState } from "react";
import {
  View,
  Animated,
  Image,
  Button,
  ScrollView,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";
import MainScreen from "./app/screens/MainScreen";
import {NOTION_KEY, NOTION_DATABASE_ID} from "@env"
// import 'dotenv/config';


const { Client } = require("@notionhq/client")

const notion = new Client({ auth: NOTION_KEY });

console.log(NOTION_DATABASE_ID);

async function addItem(text) {
  try {
    const response = await notion.pages.create({
      parent: { database_id: NOTION_DATABASE_ID },
      properties: {
        title: { 
          title:[
            {
              "text": {
                "content": text
              }
            }
          ]
        }
      },
    })
    console.log(response)
    console.log("Success! Entry added.")
  } catch (error) {
    console.error(error.body)
  }
}

addItem("Yurts in Big Sur, California")

export default function App() {
  return (
    <MainScreen/>
  );
}
