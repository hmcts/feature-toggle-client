import { FeatureToggleService } from './../../main/client/featureToggleService'
import * as featureToggleApiMock from './../http-mocks/featureToggleApiMock'

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

  const featureToggleService: FeatureToggleService = new FeatureToggleService(featureToggleApiMock.serviceBaseURL, request)

  beforeEach(() => {
    mock.cleanAll()
  })

  describe('with user/permissions', () => {

    describe('when handling error responses', () => {
      it('should reject promise with HTTP error', async () => {
        featureToggleApiMock.rejectFeatureEnabledCheck()
        try {
          await featureToggleService.isFeatureEnabled('feature-name', 'user', 'permission')
        } catch (err) {
          expect(err.name).to.equal('StatusCodeError')
          expect(err.statusCode).to.equal(HttpStatus.INTERNAL_SERVER_ERROR)
        }
      })
    })

    describe('when handling successful responses', () => {
      describe('and the feature toggle is enabled', () => {
        it('should resolve promise returning true', async () => {
          featureToggleApiMock.resolveFeatureEnabledCheck('true', 'user', 'permission')
          const featureToggleEnabled: boolean = await featureToggleService.isFeatureEnabled('feature-name', 'user', 'permission')
          expect(featureToggleEnabled).to.be.true
        })
      })

      describe('and the feature toggle is disabled', () => {
        it('should resolve promise returning false', async () => {
          featureToggleApiMock.resolveFeatureEnabledCheck('false', 'user', 'permission')
          const featureToggleEnabled: boolean = await featureToggleService.isFeatureEnabled('feature-name', 'user', 'permission')
          expect(featureToggleEnabled).to.be.false
        })
      })
    })
  })

  describe('without user/permissions', () => {
    describe('when handling error responses', () => {
      it('should reject promise with HTTP error', async () => {
        featureToggleApiMock.rejectFeatureEnabledCheck()
        try {
          await featureToggleService.isFeatureEnabled('feature-name')
        } catch (err) {
          expect(err.name).to.equal('StatusCodeError')
          expect(err.statusCode).to.equal(HttpStatus.INTERNAL_SERVER_ERROR)
        }
      })
    })

    describe('when handling successful responses', () => {
      describe('and the feature toggle is enabled', () => {
        it('should resolve promise returning true', async () => {
          featureToggleApiMock.resolveFeatureEnabledCheck('true')
          const featureToggleEnabled: boolean = await featureToggleService.isFeatureEnabled('feature-name')
          expect(featureToggleEnabled).to.be.true
        })
      })

      describe('and the feature toggle is disabled', () => {
        it('should resolve promise returning false', async () => {
          featureToggleApiMock.resolveFeatureEnabledCheck('false')
          const featureToggleEnabled: boolean = await featureToggleService.isFeatureEnabled('feature-name')
          expect(featureToggleEnabled).to.be.false
        })
      })
    })
  })
})
