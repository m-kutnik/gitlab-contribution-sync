import {
  getContributionDates,
  getLastSyncDate,
} from './helpers/contribution.mjs'
import { makeCommitsForDates, checkout, push } from './helpers/git.mjs'

const init = async () => {
  const lastSyncDate = getLastSyncDate()
  const dates = await getContributionDates({ after: lastSyncDate })

  await checkout('sync')
  await makeCommitsForDates(dates)
  await push('sync', 'sync')

  return true
}

try {
  init()
} catch (err) {
  console.error('Aborting!')
  console.error(err)
}
