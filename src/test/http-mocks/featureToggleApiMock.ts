import * as mock from 'nock'
import * as HttpStatus from 'http-status-codes'

export const serviceBaseURL = 'http://localhost:8800'

export function resolveFeatureEnabledCheck (enabled: string, user?: string, permission?: string): mock.Scope {

  const requestHeaders = {}

  if (user) {
    requestHeaders['x-user-id'] = user
  }

  if (permission) {
    requestHeaders['x-user-permissions'] = permission
  }

  return mock(serviceBaseURL, 
    {
      reqheaders: requestHeaders
    })
    .get(new RegExp('/api/ff4j/check.*'))
    .reply(HttpStatus.OK, enabled)
}

export function rejectFeatureEnabledCheck (reason: string = 'HTTP error'): mock.Scope {
  return mock(serviceBaseURL)
    .get(new RegExp('/api/ff4j/check.*'))
    .reply(HttpStatus.INTERNAL_SERVER_ERROR, reason)
}
