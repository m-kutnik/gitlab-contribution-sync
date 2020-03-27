/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
// eslint-disable-next-line import/extensions
import simpleGit from 'simple-git/promise.js'
import { saveSyncFile, SYNC_FILE } from './fs.mjs'

const git = simpleGit()

export const checkout = branch => git.checkoutLocalBranch(branch)
export const push = (remote, local) => git.push(remote, local)

export const makeCommitsForDates = async dates => {
  const sortedDates = dates.sort()

  for (const date of sortedDates) {
    const content = JSON.stringify({ lastDate: date }, null, 1)

    console.log(`Making commit with date: ${date}`)
    saveSyncFile(content)
    await git.add([SYNC_FILE])
    await git.commit('Synchronizing commits from Gitlab', { '--date': date })
  }

  return true
}
