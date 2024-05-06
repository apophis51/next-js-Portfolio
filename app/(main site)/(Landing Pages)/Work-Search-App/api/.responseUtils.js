


/**
 * Object that allows Cross-Origin Resource Sharing (CORS).
 * @type {Object}
 * @property {number} status - The HTTP status code to be returned.
 * @property {Object} headers - The headers to be included in the response.
 * @property {string} headers.Access-Control-Allow-Methods - The allowed HTTP methods.
 * @property {string} headers.Access-Control-Allow-Headers - The allowed HTTP headers.
 * @property {string} headers.Access-Control-Allow-Origin - The allowed origin for CORS.
 * @property {string} headers.Content-Security-Policy - The content security policy.
 * @property {string} headers.Access-Control-Allow-Credentials - Indicates if credentials are allowed.
 */
export const allowCors = {
    status: 200,
    headers: {
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization',
      "Access-Control-Allow-Origin": "*",
      "Content-Security-Policy": "connect-src *;script-src 'unsafe-inline' *;",
      "Access-Control-Allow-Credentials": "true"
    },
  }