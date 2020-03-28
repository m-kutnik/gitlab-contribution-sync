# Gitlab Contribution Sync

### Sync you Gitlab contributions with Github!

[![forthebadge](https://forthebadge.com/images/badges/compatibility-club-penguin.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/for-you.svg)](https://forthebadge.com)

---

## Required secrets

| Secret | Description | Example |
|--------|-------------|---------|
|**GITLAB_URL** | A link to API's event endpoint (public or self-hosted) | `https://gitlab.com/api/v4/events` or `https://gitlab.company.com/api/v4/events`
| **GITLAB_TOKEN** | Your Gitlab access token with *read_user* scope. [Read more]() | `[YOUR TOKEN]`
| **GITHUB_NAME** | Your `git config --get user.name` | `Keanu Reeves`
| **GITHUB_EMAIL** | Your `git config --get user.email`. This one is very important! | `your.email@domain.com`
| **GITHUB_USER** | Your Github username, used for authentication | `m-kutnik`
| **GITHUB_SECRET_TOKEN** | Your Github access token with *repo* scope. [Read more]() | `[YOUR TOKEN]`
| **GITHUB_REPO** | Your repo for syncing contributions | `github.com/m-kutnik/gitlab-contribution-sync`

#### More info soon
