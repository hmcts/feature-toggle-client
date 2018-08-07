export class HeadersBuilder {

  static buildHeaders (user?: string, permissions?: string): object {
    let headers = {}

    if (user) {
      headers['X-USER-ID'] = user
    }

    if (permissions) {
      headers['X-USER-PERMISSIONS'] = permissions
    }

    return headers
  }
}
