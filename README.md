# Slack Karma Bot

## Quick Start

Install all the dependencies

```bash
nvm use
yarn
```

### Initialize Data Store

All the karma scores for the users in the Slack workspace is stored in a Slack message.

It's recommended that you create a private channel in your workspace to store the karma scores and only add the karma bot and admins of the karma bot to the channel.

### Create .env file

1. [Create a Slack app](https://slack.dev/bolt-js/tutorial/getting-started#create-an-app). Make sure to give your apps proper scopes [https://api.slack.com/scopes](https://api.slack.com/scopes)
2. Rename `.env.starter` to `.env` and fill in the values:
   * `SLACK_BOT_TOKEN` is the bot token you can retrieve from the OAuth & Permissions tab [https://api.slack.com/apps/`{APP_ID}`/oauth](https://api.slack.com/apps/{APP_ID}/oauth)
   * `SLACK_SIGNING_SECRET` is the signing secret that allows the Karma Bot App to verify that incoming requests are coming from Slack. You can retrieve from the App Credentials section of [https://api.slack.com/apps/`{APP_ID}`](https://api.slack.com/apps/{APP_ID})
   * `SCORE_MAP_STORE_CHANNEL_ID` is the private channel where you are storing the karma scores. To get the channel id, right click the channel and select "View channel details".
   * `SCORE_MAP_STORE_MESSAGE_TS` is the `ts` value of the message where the karma score map is stored. The `ts` value is essentially the ID of the message. To get the `ts` value, add the karma bot to the channel, then mention it with "init" message. The karma bot will initialize the empty score object in a new message, then provide the `ts` value of the first new message in a second new message.

### Development Mode

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
