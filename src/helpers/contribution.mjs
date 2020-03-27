import { getUserContributions } from '../api/gitlab.mjs'
import { readSyncFile } from './fs.mjs'

export const getContributionDates = async ({ after = null } = {}) => {
  const contributions = await getUserContributions({ after })
  const contributionDates = contributions.map(item => item.created_at)

  return contributionDates
}

export const getLastSyncDate = () => {
  try {
    const { lastDate } = JSON.parse(readSyncFile())
    console.log(`Found last sync date: ${lastDate}`)

    return lastDate
  } catch (err) {
    console.warn("Couldn't parse sync file, returning null")

    return null
  }
}
