import {CLIENT_ID, CLIENT_SECRET, NOTION_DATABASE_ID} from "@env";
import base64 from 'react-native-base64';
import Kard from "./Kard";

const client_id = CLIENT_ID;
const client_secret = CLIENT_SECRET;
export const usedCode = [];
const database_id = NOTION_DATABASE_ID;
const redirect_uri = "https://robertarifulin.github.io/ReactNativeApp/"
const authorization = "Basic " + base64.encode(client_id + ":" + client_secret) + "=";

const { Client } = require("@notionhq/client");

export async function getProjectsTable(notion){
    let projectsTable = await notion.databases.query({
        database_id: database_id,
        sorts : [
            {
                "property": "Заказчик",
                "direction": "ascending"
            }
        ]
    })
    console.log("___________________projectsTable___________________");
    const res = projectsTable.results;
    projectsTable = [];
    for (var i = 0; i < res.length; i++){
        var tmp = {id: i + 1};
        for (var key in res[i]["properties"]){
            if (key == "Tags") {
                if (res[i]["properties"][key]["multi_select"].length) {
                    tmp["tag"] = res[i]["properties"][key]["multi_select"][0]["name"];
                } else {
                    tmp["tag"] = "No tag";
                }
            }
            else if (key == "Заказчик") {
                tmp["customer"] = res[i]["properties"][key]["rich_text"][0]["plain_text"];
            }
            else if (key == "Название") {
                tmp["name"] = res[i]["properties"][key]["title"][0]["plain_text"];
            }
            else if (key == "Описание краткое") {
                if (res[i]["properties"][key]["rich_text"].length) {
                    tmp["description"] = res[i]["properties"][key]["rich_text"][0]["plain_text"];
                } else {
                    tmp["description"] = "Описание отсутствует";
                }
            }
        }
        projectsTable.push({id: tmp.id, uri: <Kard tag={tmp["tag"]} name={tmp["name"]} customer={tmp["customer"]} description={tmp["description"]}/>});
    }
    // console.log(projectsTable);
    console.log("___________________________________________________");
    return projectsTable;
}

export async function clientResponse(notion){
    const listUsersResponse = await notion.users.list({});
    console.log("___________________listUsersResponse___________________");
    console.log(listUsersResponse);
    console.log("________________________________________________________");
}

export async function createClient(access_token) {
    console.log("___________________Creating client___________________");
    // console.log(access_token);
    const notion = new Client({
        auth: access_token,
    });
    return notion;
}

export async function getToken(code) {
    try {
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
        // console.log(123);
        // console.log(json);

        if (json.access_token === undefined) {
            console.log("___________________!UNDEFINED!___________________");
            return;
        } else {
            return [json, await createClient(json.access_token)];
            // notion = await createClient(json.access_token)
            // https://robertarifulin.github.io/ReactNativeApp/?code=2fca5d90-9a8f-4012-bea7-55ccb0c8ef6b&state=
        }
    } catch (error) {
        console.error(error);
    } finally {
        // throw new Error
    }
}
