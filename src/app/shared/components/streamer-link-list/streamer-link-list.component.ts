import {Component, Input} from '@angular/core';
import {COMMON_IMPORTS, PRIMENG_MISC_COMPONENTS} from '../../imports.cont';
import {StreamerLink} from '../../../models/streamer-profile/streamer-link.model';
import {LinkTypeEnum} from '../../../enums/link-type-enum.enum';

@Component({
  selector: 'app-streamer-link-list',
  templateUrl: 'streamer-link-list.component.html',
  styleUrls: ['streamer-link-list.component.scss'],
  standalone: true,
  imports: [COMMON_IMPORTS, ...PRIMENG_MISC_COMPONENTS]
})
export class StreamerLinkListComponent {

  @Input() streamerLinks?: StreamerLink[] = [];

  getLinkIcon(linkType?: LinkTypeEnum) {
    let icon = '';
    switch (linkType) {
      case LinkTypeEnum.TWITCH:
        icon = 'pi pi-twitch';
        break;
      case LinkTypeEnum.YOUTUBE:
        icon = 'pi pi-youtube';
        break;
      case LinkTypeEnum.INSTAGRAM:
        icon = 'pi pi-instagram';
        break;
      case LinkTypeEnum.X:
        icon = 'pi pi-twitter';
        break;
    }
    return icon;
  }


  getContrastColor(hex?: string): string {
    if (!hex) {
      return '#000000';
    }
    hex = hex.replace('#', '');

    // konwersja na RGB
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    const brightness = (r * 299 + g * 587 + b * 114) / 1000;

    return brightness > 128 ? '#000000' : '#FFFFFF';
  }

  openLink(url?: string) {
    window.open(url, "_blank");
  }
}
