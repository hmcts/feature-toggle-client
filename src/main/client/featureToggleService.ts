import { CoreOptions, RequestAPI } from 'request'
import { RequestPromise } from 'request-promise-native'

import { FeatureToggleClient } from './featureToggleClient'
import { FeatureToggleClientFactory } from './featureToggleClientFactory'

export class FeatureToggleService {
  private featureToggleUri: string
  private request: RequestAPI<RequestPromise, CoreOptions, CoreOptions>

  constructor (featureToggleApiUri: string,
               request: RequestAPI<RequestPromise, CoreOptions, CoreOptions>) {
    this.featureToggleUri = featureToggleApiUri
    this.request = request
  }

  async isFeatureEnabled (featureName: string, user?: string, permissions?: string): Promise<boolean> {

    const client: FeatureToggleClient
      = await new FeatureToggleClientFactory().create(this.featureToggleUri, this.request)

    return client.isFeatureEnabled(featureName, user, permissions)
  }

}
