// allow empty string
const REGEXP = /{([^}]*)}/
const DEFAULT_INIT_MAP = "{}"

export const getInitMap = (eventText: string): string => {
  const stringifiedInitMap = eventText.match(REGEXP)?.[0]
  if (!stringifiedInitMap) return DEFAULT_INIT_MAP

  try {
    const initMap = JSON.parse(stringifiedInitMap)
    return (typeof initMap === "object" && initMap !== null) ? stringifiedInitMap : DEFAULT_INIT_MAP
  } catch (error) {
    return DEFAULT_INIT_MAP
  }
}
