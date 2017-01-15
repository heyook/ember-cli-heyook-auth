import lookupFactory from '../utils/lookup-factory';

export function initialize(instance) {

  let config = lookupFactory(instance, 'config:environment');
  let heyookAuthConfig = config.HeyookAuth || {};
  let requestHeaders = heyookAuthConfig.requestHeaders;
  let serverTokenEndpoint = heyookAuthConfig.serverTokenEndpoint;
  let resourceName = heyookAuthConfig.resourceName;

  // Set HeyookAuth service object using environment config.
  let heyookAuthService = instance.lookup('service:heyookAuth');
  if(requestHeaders) {
    heyookAuthService.set('requestHeaders', requestHeaders);
  }
  if(serverTokenEndpoint){
    heyookAuthService.set('serverTokenEndpoint', serverTokenEndpoint);
  }
  if(resourceName) {
    heyookAuthService.set('resourceName', resourceName);
  }
}

export default {
  name: 'ember-heyook-auth',
  initialize: initialize
};
