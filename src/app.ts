import "./utils/env";

import { App, LogLevel } from "@slack/bolt";

import { getRandomKudos, getScoreMap, getUpdatedScoreMap, KUDOS } from"./utils/kudosGiving"
import { getUserIdFromMention,getUserMentioned } from "./utils/userMentioned"

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  logLevel: LogLevel.DEBUG,
})

app.event("app_home_opened", async ({ event, client, context }) => {
  try {
    console.log("app_home_opened event", event)
    /* view.publish is the method that your app uses to push a view to the Home tab */
    const result = await client.views.publish({

      /* the user that opened your app's app home */
      user_id: event.user,

      /* the view object that appears in the app home*/
      view: {
        type: "home",
        callback_id: "home_view",

        /* body of the view */
        blocks: [
          {
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": "*Welcome to your _App's Home_* :tada:"
            }
          },
          {
            "type": "divider"
          },
          {
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": "This button won't do much for now but you can set up a listener for it using the `actions()` method and passing its unique `action_id`. See an example in the `examples` folder within your Bolt app."
            }
          },
          {
            "type": "actions",
            "elements": [
              {
                "type": "button",
                "text": {
                  "type": "plain_text",
                  "text": "Click me!"
                }
              }
            ]
          }
        ]
      }
    });
  }
  catch (error) {
    console.error(JSON.stringify(error, null, 2));
  }
});

app.message(/<@[A-Z0-9]*>\s*\+\+/, async ({ event, client, context, message, say }: {
  event: any, client: any, context: any, message: any, say: any
}) => {
  try {
    const userMentioned = getUserMentioned(message.text)

    if(!userMentioned) return

    const userId = getUserIdFromMention(userMentioned)

    const scoreMap = await getScoreMap({
      client,
      storeChannelId: String(process.env.SCORE_MAP_STORE_CHANNEL_ID),
      storeTs: Number(process.env.SCORE_MAP_STORE_MESSAGE_TS)
    })

    const updatedScoreMap = getUpdatedScoreMap({ scoreMap, userId })

    if(!updatedScoreMap) return


    await client.chat.update({
      token: process.env.SLACK_BOT_TOKEN,
      channel: process.env.SCORE_MAP_STORE_CHANNEL_ID,
      ts: process.env.SCORE_MAP_STORE_MESSAGE_TS,
      text: `${JSON.stringify(updatedScoreMap)}`
    })

    const kudos = getRandomKudos(KUDOS)
    const text = `${userMentioned} ${kudos} (Karma: ${updatedScoreMap[userId]})`

    if(message.thread_ts) {
      say({ text, thread_ts: message.ts })
    } else {
      say({ text })
    }
  }
  catch (error) {
    console.error(JSON.stringify(error, null, 2));
  }
});

(async () => {
  // Start your app

  const port = Number(process.env.PORT) || 3000
  console.log(`Starting app on port ${ port}`)

  await app.start(port);

  console.log("⚡️ Bolt app is running!");
})();
