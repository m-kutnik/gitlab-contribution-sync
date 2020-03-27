/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
// eslint-disable-next-line import/extensions
import simpleGit from 'simple-git/promise.js'
import { getUserContributions } from '../api/gitlab.mjs'
import { readSyncFile, saveSyncFile, SYNC_FILE } from './fs.mjs'

const git = simpleGit()

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

    console.log(`Making commit with date: ${date}`)
    saveSyncFile(content)
    await git.checkoutLocalBranch('sync')
    await git.add([SYNC_FILE])
    await git.commit('Synchronizing commits from Gitlab')
  }
  // git()
}
