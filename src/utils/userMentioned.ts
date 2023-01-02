// Returns the user id preceding the ++
/*
Inp => out
<@1>++ => <@1>
<@1> <@2>++ => <@2>
<@1> <@2>++<@3> => <@2>
hi++ => null
*/
const USER_MENTIONED_REGEXP = /(<@[A-Z0-9]*>)\s*\+\+/

export const getUserMentioned = (messageText: string) => {
  const matched = messageText.match(USER_MENTIONED_REGEXP)
  if(!matched) return null
  return matched.pop()
}

// example input: <@U0D6G11ZIWH>
// TODO: add some validation for the input
export const getUserIdFromMention = (userMentioned: string) => userMentioned.slice(2, -1)
