import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private theme_link = document.querySelector('#theme');

  constructor() {
    const url = localStorage.getItem('theme') || `./assets/css/colors/default-dark.css`;
    this.theme_link.setAttribute('href', url);
  }

  changeTheme(theme: string) {
    const url = `./assets/css/colors/${theme}.css`;
    
    this.theme_link.setAttribute('href', url);
    localStorage.setItem('theme', url);

    this.checkCurrentTheme();
  }

  checkCurrentTheme() {

    const links = document.querySelectorAll('.selector');

    links.forEach( element => {
      element.classList.remove('working');
      const btnTheme = element.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;
      const currentTheme = this.theme_link.getAttribute('href');

      if(btnThemeUrl === currentTheme) {
        element.classList.add('working');
      }
    });
  }
}
