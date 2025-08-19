import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router, RouterModule} from '@angular/router';
import {KickAuthService} from '../../services/auth/kick-auth.service';

@Component({
  selector: 'app-auth-callback',
  imports: [CommonModule, RouterModule],
  templateUrl: './auth-callback.component.html',
  styleUrl: './auth-callback.component.scss',
  standalone: true
})
export class AuthCallbackComponent implements OnInit{

  private authService = inject(KickAuthService);
  private router = inject(Router);

  loading = true;

  async ngOnInit(): Promise<void> {
    try {
      const callbackUrl = window.location.href;

      await this.authService.handleCallback(callbackUrl);

      this.router.navigate(['/']);
    } catch (e) {
      console.error('Auth callback error:', e);
    } finally {
      this.loading = false;
    }
  }

}
