const toggleBtn = document.getElementById('toggle-theme-btn');
const htmlElement = document.documentElement;

const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'dark') {
  htmlElement.classList.add('dark');
}

toggleBtn.addEventListener('click', () => {
  htmlElement.classList.toggle('dark');

  if (htmlElement.classList.contains('dark')) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }
});
