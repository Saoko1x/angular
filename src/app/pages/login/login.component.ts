import { Component, inject } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface LoginForm {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  isLoginView: boolean = true;

  userRegisterObj: any = {
    username: '',
    email: '',
    password: '',
  };

  router = inject(Router);

  showPassword = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onRegister() {
    debugger;
    const isLocalData = localStorage.getItem('angular18Local');
    if (isLocalData !== null) {
      const localArray = JSON.parse(isLocalData);
      localArray.push(this.userRegisterObj);
      localStorage.setItem('angular18Local', JSON.stringify(localArray));
    } else {
      const localArray = [];
      localArray.push(this.userRegisterObj);
      localStorage.setItem('angular18Local', JSON.stringify(localArray));
    }
    alert('Usuario registrado correctamente');
  }

  onLogin() {
    const isLocalData = localStorage.getItem('angular18Local');
    if (isLocalData !== null) {
      const users = JSON.parse(isLocalData);

      const isUserFound = users.find(
        (user: any) =>
          user.email === this.userRegisterObj.email &&
          user.password === this.userRegisterObj.password
      );
      if (isUserFound !== undefined) {
        // Marcar al usuario como conectado
        const updatedUsers = users.map((user: any) => {
          if (user.email === this.userRegisterObj.email) {
            return { ...user, isLoggedIn: true };
          }
          return user;
        });
        localStorage.setItem('angular18Local', JSON.stringify(updatedUsers));
        this.router.navigateByUrl('/home');
      } else {
        alert('Email o contraseña incorrectos');
      }
    } else {
      alert('No se encontraron usuarios registrados');
    }
  }
}
