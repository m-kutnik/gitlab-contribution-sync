/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
// eslint-disable-next-line import/extensions
import simpleGit from 'simple-git/promise.js'
import { saveSyncFile, SYNC_FILE } from './fs.mjs'

const REMOTE = `https://${process.env.GITHUB_USER}:${process.env.GITHUB_TOKEN}@${process.env.GITHUB_REPO}`

const git = simpleGit()

export const checkout = branch => git.checkout(branch)
export const push = branch => git.push(REMOTE, branch)

export const makeCommitsForDates = async dates => {
  const sortedDates = dates.sort()

  for (const date of sortedDates) {
    const content = JSON.stringify({ lastDate: date }, null, 1)

    console.log(`Making commit with date: ${date}`)
    saveSyncFile(content)
    await git.add([SYNC_FILE])
    await git.addConfig('user.name', process.env.GITHUB_NAME)
    await git.addConfig('user.email', process.env.GITHUB_EMAIL)
    await git.commit('Synchronizing contribution from Gitlab', {
      '--date': date,
    })
  }

  return true
}
