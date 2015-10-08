export function initialize(/* container, application */) {
  // application.inject('route', 'foo', 'service:foo');
}
import CustomAuthenticator from '../authenticators/custom';
import CustomAuthorizer from '../authorizers/custom';

export default {
  name:       'authentication',
  before:     'simple-auth',
  initialize: function(container, application) {
    application.register('simple-auth-authenticator:custom', CustomAuthenticator);
    application.register('simple-auth-authorizer:custom', CustomAuthorizer);
  }
};

//export default {
//  name: 'initializer-authentication',
//  initialize: initialize
//};
