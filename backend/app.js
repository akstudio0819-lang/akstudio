// cPanel Phusion Passenger Entrypoint
async function loadApp() {
  await import('./src/server.js');
}
loadApp();
