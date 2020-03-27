import { readFileSync, writeFileSync } from 'fs'
import { join, resolve } from 'path'

export const SYNC_FILE = './sync.json'

export const readSyncFile = () => readFileSync(SYNC_FILE, 'utf8')

export const saveSyncFile = content =>
  writeFileSync(join(resolve(), SYNC_FILE), content)
