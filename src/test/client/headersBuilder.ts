/* tslint:disable:no-unused-expression */

import * as chai from 'chai'
import { HeadersBuilder } from '../../main/client/headersBuilder'

const expect = chai.expect

describe('HeadersBuilder', () => {
  describe('#buildHeaders()', () => {

    context('when only the user parameter is provided', () => {
      const headers = HeadersBuilder.buildHeaders('user')
      it('should set the user header', () => {
        expect(headers['X-USER-ID']).to.be.equal('user')
      })
    })

    context('when both the user and the permission parameters are provided', () => {
      const headers = HeadersBuilder.buildHeaders('user', 'permission')
      it('should set the user header', () => {
        expect(headers['X-USER-ID']).to.be.equal('user')
      })
      it('should set the permissions header', () => {
        expect(headers['X-USER-PERMISSIONS']).to.be.equal('permission')
      })
    })

    context('when no parameters are provided', () => {
      const headers = HeadersBuilder.buildHeaders()
      it('should not set the user header', () => {
        expect(headers['X-USER-ID']).to.be.undefined
      })
      it('should not set the permissions header', () => {
        expect(headers['X-USER-PERMISSIONS']).to.be.undefined
      })
    })
  })
})
