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

  async isAdmissionsAllowed (user: string, permissions: string): Promise<boolean> {

    const client: FeatureToggleClient
      = await new FeatureToggleClientFactory().create(this.featureToggleUri, this.request)

    return client.isAdmissionsAllowed(user, permissions)
  }

  async isCitizenFrontendMaintenanceUnplannedEnabled (): Promise<boolean> {

    const client: FeatureToggleClient
      = await new FeatureToggleClientFactory().create(this.featureToggleUri, this.request)

    return client.isCitizenFrontendMaintenanceUnplannedEnabled()
  }

  async isCitizenFrontendMaintenancePlannedEnabled (): Promise<boolean> {

    const client: FeatureToggleClient
      = await new FeatureToggleClientFactory().create(this.featureToggleUri, this.request)

    return client.isCitizenFrontendMaintenancePlannedEnabled()
  }

  async isLegalFrontendMaintenanceUnplannedEnabled (): Promise<boolean> {

    const client: FeatureToggleClient
      = await new FeatureToggleClientFactory().create(this.featureToggleUri, this.request)

    return client.isLegalFrontendMaintenanceUnplannedEnabled()
  }

  async isLegalFrontendMaintenancePlannedEnabled (): Promise<boolean> {

    const client: FeatureToggleClient
      = await new FeatureToggleClientFactory().create(this.featureToggleUri, this.request)

    return client.isLegalFrontendMaintenancePlannedEnabled()
  }

}
