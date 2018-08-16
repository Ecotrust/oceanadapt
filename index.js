import "babel-polyfill";

const pages = {
  'home': import('./pages/home'),
  'about': import('./pages/about'),
  'projections': import('./pages/projections')
};

async function renderPage(name) {
  // Lazily load the requested page.
  const page = await pages[name];
  return page.render();
}

renderPage('about');
