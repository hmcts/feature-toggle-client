import { CoreOptions, RequestAPI } from 'request'
import { RequestPromise } from 'request-promise-native'

import { HeadersBuilder } from './headersBuilder'

export class FeatureToggleClient {

  constructor (private endpointURI: string,
               private request: RequestAPI<RequestPromise, CoreOptions, CoreOptions>) {
    this.endpointURI = endpointURI
    this.request = request
  }

  public isFeatureEnabled (featureName: string, user?: string, permissions?: string): RequestPromise<boolean> {

    const url: string = `${this.endpointURI}/api/ff4j/check/${featureName}`

    return this.request.get(
      url, 
      {headers: HeadersBuilder.buildHeaders(user, permissions)}
    )
  }
}
