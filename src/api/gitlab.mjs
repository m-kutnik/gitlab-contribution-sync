import axios from 'axios'
import parse from 'parse-link-header'
import { getYMD } from '../helpers/date.mjs'

export const fetchContributions = ({ url, after }) => {
  const date = after ? getYMD(after) : null

  console.log(`Fetching ${url}`)

  return axios.get(url, {
    params: {
      per_page: 100,
      after: date,
    },
    headers: {
      Authorization: `Bearer ${process.env.GITLAB_TOKEN}`,
    },
  })
}

export const getUserContributions = async ({
  url = process.env.GITLAB_URL,
  after = null,
} = {}) => {
  const { data, headers } = await fetchContributions({ url, after })
  const link = parse(headers.link)

  if (link.next) {
    const nextData = await getUserContributions({
      url: link.next.url,
      after,
    })

    return [...data, ...nextData]
  }
  return data
}
