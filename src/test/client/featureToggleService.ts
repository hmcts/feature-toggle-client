import { FeatureToggleService } from './../../main/client/featureToggleService'
import * as FeatureToggleApiMock from './../http-mocks/featureToggleApiMock'

/* tslint:disable:no-unused-expression */
import * as chai from 'chai'
import * as spies from 'sinon-chai'
import * as asPromised from 'chai-as-promised'
import * as requestPromise from 'request-promise-native'
import * as HttpStatus from 'http-status-codes'
import * as mock from 'nock'

chai.use(spies)
chai.use(asPromised)
const expect = chai.expect
const request = requestPromise
  .defaults({
    json: true,
    timeout: 10000
  })

describe('FeatureToggleService', () => {

  const featureToggleService: FeatureToggleService = new FeatureToggleService(FeatureToggleApiMock.serviceBaseURL, request)

  beforeEach(() => {
    mock.cleanAll()
  })

  describe('isAdmissionsAllowed', () => {

    describe('when handling error responses', () => {
      it('should reject promise with HTTP error', async () => {
        FeatureToggleApiMock.rejectFeatureEnabledCheck()
        try {
          await featureToggleService.isAdmissionsAllowed('user', 'permission')
        } catch (err) {
          expect(err.name).to.equal('StatusCodeError')
          expect(err.statusCode).to.equal(HttpStatus.INTERNAL_SERVER_ERROR)
        }
      })
    })

    describe('when handling successful responses', () => {
      describe('and the feature toggle is enabled', () => {
        it('should resolve promise returning true', async () => {
          FeatureToggleApiMock.resolveFeatureEnabledCheck('true', 'user', 'permission')
          const featureToggleEnabled: boolean = await featureToggleService.isAdmissionsAllowed('user', 'permission')
          expect(featureToggleEnabled).to.be.true
        })
      })

      describe('and the feature toggle is disabled', () => {
        it('should resolve promise returning false', async () => {
          FeatureToggleApiMock.resolveFeatureEnabledCheck('false', 'user', 'permission')
          const featureToggleEnabled: boolean = await featureToggleService.isAdmissionsAllowed('user', 'permission')
          expect(featureToggleEnabled).to.be.false
        })
      })
    })
  })

  const tests = [
    { name: 'isCitizenFrontendMaintenanceUnplannedEnabled', method: featureToggleService.isCitizenFrontendMaintenanceUnplannedEnabled },
    { name: 'isCitizenFrontendMaintenancePlannedEnabled', method: featureToggleService.isCitizenFrontendMaintenancePlannedEnabled },
    { name: 'isLegalFrontendMaintenanceUnplannedEnabled', method: featureToggleService.isLegalFrontendMaintenanceUnplannedEnabled },
    { name: 'isLegalFrontendMaintenancePlannedEnabled', method: featureToggleService.isLegalFrontendMaintenancePlannedEnabled }
  ]

  tests.forEach( (test) => {
    describe(test.name, () => {

      describe('when handling error responses', () => {
        it('should reject promise with HTTP error', async () => {
          FeatureToggleApiMock.rejectFeatureEnabledCheck()
          try {
            await test.method.call(featureToggleService)
          } catch (err) {
            expect(err.name).to.equal('StatusCodeError')
            expect(err.statusCode).to.equal(HttpStatus.INTERNAL_SERVER_ERROR)
          }
        })
      })

      describe('when handling successful responses', () => {
        describe('and the feature toggle is enabled', () => {
          it('should resolve promise returning true', async () => {
            FeatureToggleApiMock.resolveFeatureEnabledCheck('true')
            const featureToggleEnabled: boolean = await test.method.call(featureToggleService)
            expect(featureToggleEnabled).to.be.true
          })
        })

        describe('and the feature toggle is disabled', () => {
          it('should resolve promise returning false', async () => {
            FeatureToggleApiMock.resolveFeatureEnabledCheck('false')
            const featureToggleEnabled: boolean = await test.method.call(featureToggleService)
            expect(featureToggleEnabled).to.be.false
          })
        })
      })
    })
  })
})
