import {CLIENT_ID, CLIENT_SECRET} from "@env";
import base64 from 'react-native-base64';


const client_id = CLIENT_ID;
const client_secret = CLIENT_SECRET;
const redirect_uri = "https://robertarifulin.github.io/ReactNativeApp/"
const authorization = "Basic " + base64.encode(client_id + ":" + client_secret) + "=";

const { Client } = require("@notionhq/client");

export async function createClient(access_token) {
    console.log("___________________Creating client___________________");
    console.log(access_token);
    const notion = new Client({
        auth: access_token,
    });
    ;(async () => {
        const listUsersResponse = await notion.users.list({});
        console.log("___________________listUsersResponse___________________");
        console.log(listUsersResponse);
        console.log("________________________________________________________");
    })();
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
        console.log(123);
        console.log(json);

        if (json.access_token === undefined) {
            console.log("___________________!UNDEFINED!___________________");
            return;
        } else {
            return json;
            // notion = await createClient(json.access_token)
            // https://robertarifulin.github.io/ReactNativeApp/?code=2fca5d90-9a8f-4012-bea7-55ccb0c8ef6b&state=
        }
    } catch (error) {
        console.error(error);
    } finally {
        // throw new Error
    }
}
