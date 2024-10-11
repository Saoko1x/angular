import { Component, PLATFORM_ID, Inject, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { AvatarModule } from 'ngx-avatars';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    RouterModule,
    RouterOutlet,
    AvatarModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  userName: string | null = null;
  isLoggedIn: boolean = false;
  userEmail: string = '';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.userName = localStorage.getItem('userName');
      this.checkLoginStatus();
    }
  }

  checkLoginStatus(): void {
    if (isPlatformBrowser(this.platformId)) {
      const isLocalData = localStorage.getItem('angular18Local');
      if (isLocalData !== null) {
        const users = JSON.parse(isLocalData);
        const loggedInUser = users.find(
          (user: any) => user.isLoggedIn === true
        );
        if (loggedInUser) {
          this.isLoggedIn = true;
          this.userEmail = loggedInUser.username;
        } else {
          this.isLoggedIn = false;
          this.userEmail = '';
        }
      } else {
        this.isLoggedIn = false;
        this.userEmail = '';
      }
    }
  }
}
