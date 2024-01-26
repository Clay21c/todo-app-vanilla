import html from './app.html?raw';

export const App = (element) => {
  (() => {
    const app = document.createElement('div');
    app.innerHTML = html;
    document.querySelector(element).append(app);
  })();
};
