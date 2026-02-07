// js/language-switcher.js
let currentTranslations = {};

async function loadLanguage(langCode) {
  try {
    const response = await fetch(`locales/${langCode}.json`);
    currentTranslations = await response.json();
    applyTranslations();
    localStorage.setItem('preferredLanguage', langCode);
    updateButtonStyle(langCode);
  } catch (error) {
    console.error(`加载语言文件失败: ${langCode}`, error);
  }
}

function applyTranslations() {
  document.querySelectorAll('[data-key]').forEach(element => {
    const key = element.getAttribute('data-key');
    if (currentTranslations[key]) {
      element.textContent = currentTranslations[key];
    }
  });
}

function switchLanguage(langCode) {
  loadLanguage(langCode);
}

function updateButtonStyle(activeLangCode) {
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.style.fontWeight = 'normal';
    btn.style.color = '#666';
  });
  const activeButton = document.querySelector(`.lang-btn[onclick*="${activeLangCode}"]`);
  if (activeButton) {
    activeButton.style.fontWeight = 'bold';
    activeButton.style.color = '#333';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('preferredLanguage') || 'zh-CN';
  loadLanguage(savedLang);
});