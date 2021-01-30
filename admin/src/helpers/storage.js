export default {
  getDarkMode: localStorage.getItem('darkMode'),
  setDarkMode: (mode) => localStorage.setItem('darkMode', mode),
};
