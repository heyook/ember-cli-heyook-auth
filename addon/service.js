import Ember from "ember";
const Parent = Ember.Service || Ember.Object;

// @public
export default Parent.extend(Ember.Evented, {

  // @public
  requestHeaders: null,

  // @public
  serverTokenEndpoint: null

});
