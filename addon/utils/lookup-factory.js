export default function(app, name) {
  if (app.resolveRegistration) {
    return app.resolveRegistration(name);
  }
  return app.container.lookupFactory(name);
}
