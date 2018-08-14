import { CoreOptions, RequestAPI } from 'request'
import { RequestPromise } from 'request-promise-native'

import { FeatureToggleClient } from './featureToggleClient'

export class FeatureToggleClientFactory {

  create<T> (featureToggleUri: string,
    request: RequestAPI<RequestPromise, CoreOptions, CoreOptions>): FeatureToggleClient {
    return new FeatureToggleClient(featureToggleUri, request)
  }
}
