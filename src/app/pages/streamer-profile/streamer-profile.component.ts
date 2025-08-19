import {Component, inject, OnInit} from '@angular/core';
import {COMMON_IMPORTS, PRIMENG_PANEL_COMPONENTS} from '../../shared/imports.cont';
import {Router} from '@angular/router';

@Component({
  selector: 'app-streamer-profile',
  templateUrl: 'streamer-profile.component.html',
  styleUrls: ['streamer-profile.component.scss'],
  standalone: true,
  imports: [...COMMON_IMPORTS, ...PRIMENG_PANEL_COMPONENTS]
})
export class StreamerProfileComponent implements OnInit {

  private router = inject(Router);

  ngOnInit(): void {

  }
}
