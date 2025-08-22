import {Component, Input} from '@angular/core';
import {Advertisement} from '../../../models/streamer-profile/advertisement.model';
import {COMMON_IMPORTS} from '../../imports.cont';

@Component({
  selector: 'app-advertisement-list',
  templateUrl: 'advertisement-list.component.html',
  styleUrls: ['advertisement-list.component.scss'],
  standalone: true,
  imports: [...COMMON_IMPORTS]
})
export class AdvertisementListComponent {

  @Input() advertisements?: Advertisement[] = [];

  openLink(url?: string) {
    window.open(url, "_blank");
  }
}
