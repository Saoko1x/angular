import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  isLoginView: boolean = true;
  loginForm: FormGroup;
  registerForm: FormGroup;

  router = inject(Router);
  fb = inject(FormBuilder);

  showPassword = false;

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onRegister() {
    if (this.registerForm.valid) {
      const isLocalData = localStorage.getItem('angular18Local');
      if (isLocalData !== null) {
        const localArray = JSON.parse(isLocalData);
        localArray.push(this.registerForm.value);
        localStorage.setItem('angular18Local', JSON.stringify(localArray));
      } else {
        const localArray = [];
        localArray.push(this.registerForm.value);
        localStorage.setItem('angular18Local', JSON.stringify(localArray));
      }
      alert('Usuario registrado correctamente');
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  onLogin() {
    if (this.loginForm.valid) {
      const isLocalData = localStorage.getItem('angular18Local');
      if (isLocalData !== null) {
        const users = JSON.parse(isLocalData);

        const isUserFound = users.find(
          (user: any) =>
            user.email === this.loginForm.value.email &&
            user.password === this.loginForm.value.password
        );
        if (isUserFound !== undefined) {
          // Marcar al usuario actual como conectado y a los demás como desconectados
          const updatedUsers = users.map((user: any) => {
            if (user.email === this.loginForm.value.email) {
              return { ...user, isLoggedIn: true };
            }
            return { ...user, isLoggedIn: false };
          });
          localStorage.setItem('angular18Local', JSON.stringify(updatedUsers));
          this.router.navigateByUrl('/home');
        } else {
          alert('Email o contraseña incorrectos');
        }
      }
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  getFormControl(form: FormGroup, controlName: string) {
    return form.get(controlName);
  }
}
