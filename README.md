# Slack Karma Bot

A lean no-database Slack bot app that allows a user to give karma points to other users.

The bot can process karma commands in any public or private channel that it's added to.

## How it works

All the karma scores for the users in the Slack workspace is stored in a Slack message.

It's recommended that you create a private channel in your Slack workspace to store the karma scores and only add the karma bot and admins of the karma bot to the channel.

## App Initialization

Create a node app that initializes the Slack Karma Bot app like such.

```js
import { App } from '@slack-karma-bot'

const app = new App({
   token: process.env.SLACK_BOT_TOKEN,
   signingSecret: process.env.SLACK_SIGNING_SECRET,
   scoreMapStoreChannelId: process.env.SCORE_MAP_STORE_CHANNEL_ID,
   scoreMapStoreMessageTs: process.env.SCORE_MAP_STORE_MESSAGE_TS
})
```

You need both the `token` and `signingSecret` before the bot can do anything.

What the environmental variables mean:

* `SLACK_BOT_TOKEN` is the bot token you can retrieve from the OAuth & Permissions tab [https://api.slack.com/apps/`{APP_ID}`/oauth](https://api.slack.com/apps/{APP_ID}/oauth)
* `SLACK_SIGNING_SECRET` is the signing secret that allows the Karma Bot App to verify that incoming requests are coming from Slack. You can retrieve from the App Credentials section of [https://api.slack.com/apps/`{APP_ID}`](https://api.slack.com/apps/{APP_ID})
* `SCORE_MAP_STORE_CHANNEL_ID` is the private channel where you are storing the karma scores. To get the channel id, right click the channel and select "View channel details".
* `SCORE_MAP_STORE_MESSAGE_TS` is the `ts` value of the message where the karma score map is stored. The `ts` value is essentially the ID of the message. To get the `ts` value, add the karma bot to the channel, then mention it with "init" message. The karma bot will initialize the empty score object in a new message, then provide the `ts` value of the first new message in a second new message.

## Datastore Initialization

After you have started the bot, you need to use the bot to initialize the datastore where you want the karma points to be kept. This is a one-time setup.

1. Invite the karma bot to the private channel.
2. Initialize the data store
   1. Option 1: initialize with empty data:

      ```text
      @<bot_name> init
      ```

   2. Option 2: initialize with existing data:

      ```text
      @<bot_name> init <existing_data>
      ```

   `existing_data` will be a stringified JSON object that contains the karma score map. The format of the JSON object is:

   ```json
   { "<user_id_1>": 1, "<user_id_2>": 1, "<user_id_3>": 10 }
   ```

3. Retrieve the `ts` value posted by the bot.
4. Add the `ts` value to the `SCORE_MAP_STORE_MESSAGE_TS` environment variable and restart your app.

### Karma Bot Commands

#### Give karma points to a user

```text
@<user_name> ++
```

You can add any text after the `++` to give context for why you are giving the karma point.

#### Initialize the store

```text
@<bot_name> init
```

```text
@<bot_name> init { "<user_id_1>": 1, "<user_id_2>": 1, "<user_id_3>": 10 }
```

## Develop

You can try out the Slack Karma Bot app in development mode by running the following command which spins up the node server in [example/index.ts](/example/index.ts)

Clone the repo, then install all the dependencies.

```bash
nvm use
yarn
```

```bash
yarn dev
```

HMR is supported but every time you make a change to the `.env` file, you will need to restart the server for the change to take effect.

The Slack app server start on localhost:3000. You can use [ngrok](https://ngrok.com/) to proxy your local server to the internet via a public URL.

```bash
brew install ngrok/ngrok/ngrok
ngrok http 3000
```

After running the command, the ngrok console will display the public URL that Slack can use to access your local server. Go to [https://api.slack.com/apps/`{APP_ID}`/event-subscriptions](https://api.slack.com/apps/{APP_ID}/event-subscriptions) and make the Request URL `{ngrok-url}/slack/events`

## Resources

* [conversations-api](https://api.slack.com/docs/conversations-api) for how to get the channel ID.
* [retrieving individual messages](https://api.slack.com/messaging/retrieving#individual_messages)
