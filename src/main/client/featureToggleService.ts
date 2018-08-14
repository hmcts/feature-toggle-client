import { CoreOptions, RequestAPI } from 'request'
import { RequestPromise } from 'request-promise-native'

import { FeatureToggleClient } from './featureToggleClient'
import { FeatureToggleClientFactory } from './featureToggleClientFactory'

export class FeatureToggleService {

  constructor (private featureToggleApiUri: string,
               private request: RequestAPI<RequestPromise, CoreOptions, CoreOptions>) {
  }

  isFeatureEnabled (featureName: string, user?: string, permissions?: string): Promise<boolean> {
    const client: FeatureToggleClient = new FeatureToggleClientFactory().create(this.featureToggleApiUri, this.request)
    return client.isFeatureEnabled(featureName, user, permissions)
  }

}
