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

  isAdmissionsAllowed (user: string, permissions: string): RequestPromise<boolean> {
    return this.isFeatureEnabled ('cmc_admissions', user, permissions)
  }

  isCitizenFrontendMaintenanceUnplannedEnabled (): RequestPromise<boolean> {
    return this.isFeatureEnabled ('cmc_citizen_frontend_maintenance_unplanned')
  }

  isCitizenFrontendMaintenancePlannedEnabled (): RequestPromise<boolean> {
    return this.isFeatureEnabled ('cmc_citizen_frontend_maintenance_planned')
  }

  isLegalFrontendMaintenanceUnplannedEnabled (): RequestPromise<boolean> {
    return this.isFeatureEnabled ('cmc_legal_frontend_maintenance_unplanned')
  }

  isLegalFrontendMaintenancePlannedEnabled (): RequestPromise<boolean> {
    return this.isFeatureEnabled ('cmc_legal_frontend_maintenance_planned')
  }

  private isFeatureEnabled (featureName: String, user?: string, permissions?: string): RequestPromise<boolean> {

    const url: string = `${this.endpointURI}/api/ff4j/check/${featureName}`

    return this.request.get(
      url, 
      {headers: HeadersBuilder.buildHeaders(user, permissions)}
    )
  }
}
