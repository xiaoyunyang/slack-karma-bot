# Slack Karma Bot

## Quick Start

Install all the dependencies

```bash
nvm use
yarn
```

### Create .env file

1. [Create a Slack app](https://slack.dev/bolt-js/tutorial/getting-started#create-an-app)
2. Rename `.env.starter` to `.env` and fill in the values:
   * `SLACK_BOT_TOKEN` is the bot token you can retrieve from the OAuth & Permissions tab [https://api.slack.com/apps/`{APP_ID}`/oauth](https://api.slack.com/apps/{APP_ID}/oauth)
   * `SLACK_SIGNING_SECRET` is the signing secret that allows the Karma Bot App to verify that incoming requests are coming from Slack. You can retrieve from the App Credentials section of [https://api.slack.com/apps/`{APP_ID}`](https://api.slack.com/apps/{APP_ID})
   * `SCORE_MAP_STORE_CHANNEL_ID` is the public or private channel where you are storing the karma scores for your team. See [conversations-api](https://api.slack.com/docs/conversations-api) for how to get the channel ID.
   * `SCORE_MAP_STORE_MESSAGE_TS` is the `ts` value of the message where the karma score map is stored. The `ts` value is essentially the ID of the message. See [retrieving individual messages](https://api.slack.com/messaging/retrieving#individual_messages) for how to get the `ts` value.

### Development Mode

```bash
yarn dev
```

HMR is supported.

The Slack app server start on localhost:3000. You can use [ngrok](https://ngrok.com/) to proxy your local server to the internet via a public URL.

```bash
brew install ngrok/ngrok/ngrok
ngrok http 3000
```

After running the command, the ngrok console will display the public URL that Slack can use to access your local server. Go to [https://api.slack.com/apps/`{APP_ID}`/event-subscriptions](https://api.slack.com/apps/{APP_ID}/event-subscriptions) and make the Request URL `{ngrok-url}/slack/events`
