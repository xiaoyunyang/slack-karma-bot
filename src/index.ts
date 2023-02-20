import { App } from "./app";

(async () => {
  const port = Number(process.env.PORT) || 3000
  console.log(`Starting app on port ${port}`)

  const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    scoreMapStoreChannelId: process.env.SCORE_MAP_STORE_CHANNEL_ID,
    scoreMapStoreMessageTs: process.env.SCORE_MAP_STORE_MESSAGE_TS
  })

  await app.start(port)

  console.log("⚡️ Bolt app is running!")
})()
