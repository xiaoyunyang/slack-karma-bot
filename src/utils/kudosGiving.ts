
export const KUDOS = [
  "is pretty rad!",
  "leveled up!",
  "gained a level!",
  "doing it right!"
]

export const getRandomKudos = (kudos: string[]) => {
  const idx = Math.floor(Math.random() * (kudos.length))
  return kudos[idx]
}

export const getScoreMap = async ({ token, client, storeChannelId, storeTs }: { token?: string, client: any, storeChannelId: string;  storeTs: number}) => {
  const result = await client.conversations.history({
    token,
    channel: storeChannelId,
    latest: storeTs,
    inclusive: true,
    limit: 1
  })

  const conversationHistory = result.messages

  // This is an error case, this can happen when the message being referenced
  // does not exist (e.g., all the scores are kept is lost, wrong message is
  // referenced), or there's a network issue with making an api call
  // TODO: backup the scoreMap somewhere to avoid accidental deletion or data loss
  // due to app crashes, invalid operations, etc
  if(!conversationHistory.length) return null

  const scoreMap = JSON.parse(conversationHistory[0].text)
  if(typeof scoreMap !== "object") return {}
  return scoreMap
}

// Gets the current scoreMap, increment score for userMentioned
// (if record does not exist, create a new entry), then return the
// new scoreMap as a JS Object
export const getUpdatedScoreMap = ({ scoreMap, userId }: { scoreMap: Record<string, number>, userId: string}) => {
  if(!scoreMap) return null

  scoreMap[userId] = (scoreMap[userId] || 0) + 1
  return scoreMap
}
