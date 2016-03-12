import User from './model'
import decl from 'rethink-decl'
import { screenDeep } from 'palisade'
import changeStream from 'rethinkdb-change-stream'

export const tailable = true
export const isAuthorized = ({ user }) =>
  User.authorized('list', user)

export const process = ({ options, tail }) => {
  const query = decl(User, options)
  return tail
    ? changeStream(query.changes({ includeInitial: true }))
    : query.run()
}

export const format = ({ user }, data) =>
  screenDeep(user, data)
