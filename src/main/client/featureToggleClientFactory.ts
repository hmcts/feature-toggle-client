import { CoreOptions, RequestAPI } from 'request'
import { RequestPromise } from 'request-promise-native'

import { FeatureToggleClient } from './FeatureToggleClient'

export class FeatureToggleClientFactory {

  constructor () {
  }

  async create<T> (featureToggleUri: string,
                   request: RequestAPI<RequestPromise, CoreOptions, CoreOptions>): Promise<FeatureToggleClient> {
    return new FeatureToggleClient(featureToggleUri, request)
  }
}
