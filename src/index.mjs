import {
  getContributionDates,
  getLastSyncDate,
  makeCommitsForDates,
} from './helpers/contribution.mjs'

const init = async () => {
  const lastSyncDate = getLastSyncDate()
  const dates = await getContributionDates({ after: lastSyncDate })

  makeCommitsForDates(dates)

  return true
}

try {
  init()
} catch (err) {
  console.error('Aborting!')
  console.error(err)
}
