import {Component, inject} from '@angular/core';
import {KickAuthService} from '../../services/auth/kick-auth.service';
import {HttpClient} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true
})
export class HomeComponent {
  authService = inject(KickAuthService);
  http = inject(HttpClient);

  userData: any = null;

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
    this.userData = null;
  }

  async getUserInfo() {
    try {
      const token = await this.authService.getAccessToken();
      if (!token) {
        alert('Nie jesteś zalogowany lub token wygasł');
        return;
      }

      // Przykładowe wywołanie API Kick - zamień ścieżkę zgodnie z dokumentacją
      // this.http.get('/api/kick/data/user').subscribe(
      //   (data) => {
      //     this.userData = data;
      //   },
      //   (error) => {
      //     console.error('API error:', error);
      //     alert('Błąd podczas pobierania danych z API');
      //   }
      // );
    } catch (error) {
      console.error('Error:', error);
    }
  }
}
