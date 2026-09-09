// Root Entry Point for cPanel Phusion Passenger
async function loadApp() {
  await import('./backend/src/server.js');
}
loadApp();
