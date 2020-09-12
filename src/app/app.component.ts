import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';

declare let gtag: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private matIconReg: MatIconRegistry, private domSanitizer: DomSanitizer, private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        gtag('config', 'UA-46205603-2',
          {
            'page_path': event.urlAfterRedirects
          }
        );
      }
    });
    this.matIconReg.addSvgIcon(
      'check',
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/portfolio/svg/check.svg")
    );
    this.matIconReg.addSvgIcon(
      'grin',
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/portfolio/svg/grin.svg")
    );
    this.matIconReg.addSvgIcon(
      'wink',
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/portfolio/svg/wink.svg")
    );
    this.matIconReg.addSvgIcon(
      'star',
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/portfolio/svg/star.svg")
    );
    this.matIconReg.addSvgIcon(
      'reply',
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/portfolio/svg/reply.svg")
    );
  }

  title = 'portfolio';
}
