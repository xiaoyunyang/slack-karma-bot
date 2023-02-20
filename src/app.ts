import "../example/env"

import { App as SlackBoltApp, LogLevel } from "@slack/bolt"

import { getInitMap } from "./utils/initMap"
import { getRandomKudos, getScoreMap, getUpdatedScoreMap, KUDOS } from"./utils/kudosGiving"
import { getUserIdFromMention,getUserMentioned } from "./utils/userMentioned"

export interface AppConfig {
  token?: string;
  signingSecret?: string;
  scoreMapStoreChannelId?: string;
  scoreMapStoreMessageTs?: string;
}

export default class App {
  private app: SlackBoltApp
  private token?: string

  private scoreMapStoreChannelId?: string
  private scoreMapStoreMessageTs?: string

  public constructor(config: AppConfig) {
    this.app = new SlackBoltApp(
      {
        token: config.token,
        signingSecret: config.signingSecret,
        logLevel: LogLevel.DEBUG,
      }
    )

    this.token = config.token

    this.scoreMapStoreChannelId = config.scoreMapStoreChannelId
    this.scoreMapStoreMessageTs = config.scoreMapStoreMessageTs

    this.app.event("app_home_opened", async ({ event, client, context }) => {
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
        })
      }
      catch (error) {
        console.error(JSON.stringify(error, null, 2))
      }
    })

    this.app.event("app_mention", async ({ event, context, client, say }) => {
      try {
        if (!event.text.includes("init")) return
        const [, command] = event.text.split(" ")
        if (command !== "init") return

        const map = getInitMap(event.text)
        const result = await say(map)
        await say(`^ ts = ${result.ts}`)
      }
      catch (error) {
      console.error(error)
      }
    })

    this.app.message(/<@[A-Z0-9]*>\s*\+\+/, async ({ event, client, context, message, say }: {
      event: any, client: any, context: any, message: any, say: any
    }) => {
      try {
        const userMentioned = getUserMentioned(message.text)

        if(!userMentioned) return

        const userId = getUserIdFromMention(userMentioned)

        const scoreMap = await getScoreMap({
          token: this.token,
          client,
          storeChannelId: String(this.scoreMapStoreChannelId),
          storeTs: Number(this.scoreMapStoreMessageTs)
        })

        const updatedScoreMap = getUpdatedScoreMap({ scoreMap, userId })

        if(!updatedScoreMap) return


        await client.chat.update({
          token: this.token,
          channel: this.scoreMapStoreChannelId,
          ts: this.scoreMapStoreMessageTs,
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
        console.error(JSON.stringify(error, null, 2))
      }
    })

  }
  public start(port: number) {
    return this.app.start(port)
  }
}
