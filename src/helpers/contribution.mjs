/* eslint-disable no-restricted-syntax */
import git from 'simple-git'
import { getUserContributions } from '../api/gitlab.mjs'
import { readSyncFile, saveSyncFile } from './fs.mjs'

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

export const makeCommitsForDates = async dates => {
  const sortedDates = dates.sort()

  for (const date of sortedDates) {
    const content = JSON.stringify({ lastDate: date }, null, 1)
    saveSyncFile(content)
  }
  // git()
}
