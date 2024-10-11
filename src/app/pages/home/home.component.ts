import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, PLATFORM_ID, Inject } from '@angular/core';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { AvatarModule } from 'ngx-avatars';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, AvatarModule],
})
export class HomeComponent implements OnInit {
  isLoggedIn: boolean = false;
  userEmail: string = '';
  carouselImages: string[] = [
    'https://www.digitality.es/img-articulos/ampliadas/que-es-nextjs-y-para-que-sirve-1-1697560678.jpg',
    'https://media.licdn.com/dms/image/C4E12AQFdVr18zUa17Q/article-cover_image-shrink_720_1280/0/1624637761724?e=2147483647&v=beta&t=txL8oZw9vpsEAev7vCuRj8GQpDmbmG9FMUnRDtRzXaY',
    'https://repository-images.githubusercontent.com/307489284/3c9cb558-3cc6-408a-bb6e-c154bde00930',
  ];
  currentImageIndex: number = 0;
  cards: any[] = [
    {
      image:
        'https://ms314006.github.io/static/b7a8f321b0bbc07ca9b9d22a7a505ed5/97b31/React.jpg',
      title: 'React js',
      description:
        'React js is a javascript library for building user interfaces. It is used to build single-page applications.',
    },
    {
      image:
        'https://miro.medium.com/v2/resize:fit:1000/1*htbUdWgFQ3a94PMEvBr_hQ.png',
      title: 'Next js',
      description:
        'Next js is a javascript framework for building user interfaces. It is used to build single-page applications.',
    },
    {
      image: 'https://madewithreact.com/content/images/2020/07/react-remix.png',
      title: 'Remix js',
      description:
        'Remix js is a javascript framework for building user interfaces. It is used to build single-page applications.',
    },
  ];
  modalImage: string | null = null;
  selectedGif: any = null;

  router = inject(Router);
  route = inject(ActivatedRoute);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.checkLoginStatus();
    }
    this.route.fragment.subscribe((fragment) => {
      if (fragment === 'selected-gif') {
        this.scrollToBottom();
      }
    });
    this.route.queryParams.subscribe((params) => {
      if (params['gif']) {
        this.selectedGif = JSON.parse(params['gif']);
        this.scrollToBottom();
      }
    });
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

  prevImage(): void {
    this.currentImageIndex =
      (this.currentImageIndex - 1 + this.carouselImages.length) %
      this.carouselImages.length;
  }

  nextImage(): void {
    this.currentImageIndex =
      (this.currentImageIndex + 1) % this.carouselImages.length;
  }

  openModal(image: string): void {
    this.modalImage = image;
  }

  closeModal(): void {
    this.modalImage = null;
  }

  onLogout(): void {
    if (isPlatformBrowser(this.platformId)) {
      const isLocalData = localStorage.getItem('angular18Local');
      if (isLocalData !== null) {
        const users = JSON.parse(isLocalData);
        const updatedUsers = users.map((user: any) => {
          if (user.email === this.userEmail) {
            return { ...user, isLoggedIn: false };
          }
          return user;
        });
        localStorage.setItem('angular18Local', JSON.stringify(updatedUsers));
      }
    }
    this.isLoggedIn = false;
    this.userEmail = '';
    this.router.navigateByUrl('/login');
  }

  onList(): void {
    this.router.navigateByUrl('/list');
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, 100);
  }
}
