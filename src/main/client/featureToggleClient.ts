import { CoreOptions, RequestAPI } from 'request'
import { RequestPromise } from 'request-promise-native'

import { HeadersBuilder } from './headersBuilder'

export class FeatureToggleClient {
  private endpointURI: string
  private request: RequestAPI<RequestPromise, CoreOptions, CoreOptions>

  constructor (endpointURI: string,
               request: RequestAPI<RequestPromise, CoreOptions, CoreOptions>) {
    this.endpointURI = endpointURI
    this.request = request
  }

  isAdmissionsAllowed (user: string, permissions: string): Promise<boolean> {
    return this.isFeatureEnabled ('cmc_admissions', user, permissions)
  }

  isCitizenFrontendMaintenanceUnplannedEnabled (): Promise<boolean> {
    return this.isFeatureEnabled ('cmc_citizen_frontend_maintenance_unplanned')
  }

  isCitizenFrontendMaintenancePlannedEnabled (): Promise<boolean> {
    return this.isFeatureEnabled ('cmc_citizen_frontend_maintenance_planned')
  }

  isLegalFrontendMaintenanceUnplannedEnabled (): Promise<boolean> {
    return this.isFeatureEnabled ('cmc_legal_frontend_maintenance_unplanned')
  }

  isLegalFrontendMaintenancePlannedEnabled (): Promise<boolean> {
    return this.isFeatureEnabled ('cmc_legal_frontend_maintenance_planned')
  }

  private isFeatureEnabled (featureName: String, user?: string, permissions?: string): Promise<boolean> {

    const url: string = `${this.endpointURI}/${featureName}`

    return this.request.get(
      url, 
      {headers: HeadersBuilder.buildHeaders(user, permissions)}
    )
  }
}
