import { CoreOptions, RequestAPI } from 'request'
import { RequestPromise } from 'request-promise-native'

import { FeatureToggleClient } from './featureToggleClient'

export class FeatureToggleClientFactory {

  async create<T> (featureToggleUri: string,
                   request: RequestAPI<RequestPromise, CoreOptions, CoreOptions>): Promise<FeatureToggleClient> {
    return new FeatureToggleClient(featureToggleUri, request)
  }
}
