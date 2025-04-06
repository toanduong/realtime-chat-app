// login.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { StreamService } from '../services/stream.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  tenants = [
    { id: 'tenant1', name: 'Tenant 1' },
    { id: 'tenant2', name: 'Tenant 2' }
  ];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private streamService: StreamService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      tenantId: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { tenantId, username, password } = this.loginForm.value;
      console.log(tenantId);
      this.authService.login(tenantId, username, password).subscribe({
        next: async (res) => {
          localStorage.setItem('tenantId', tenantId);
          localStorage.setItem('authToken', res.access_token);
          localStorage.setItem('userid', this.authService.getUserId());
          localStorage.setItem('username', username);
      
          this.onGetToken();
        },
        error: (err) => {
          console.error('Login failed', err);
        }
      });
    }
  }

  onGetToken(): void {
      this.authService.getUserToken().subscribe({
      next: async (res) => {
        // await this.streamService.connectUser(this.authService.getUserId(), res.token);
        // await this.streamService.init('7fxyyfbvwwae');
        localStorage.setItem('chat-token', res.token);
        this.router.navigate(['/chat']);
      },
      error: (err) => {
        console.error('Login failed', err);
      }
    });
  }
}
