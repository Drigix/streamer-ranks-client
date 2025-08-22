import {Component, inject, OnInit} from '@angular/core';
import {PRIMENG_MISC_COMPONENTS, PRIMENG_PANEL_COMPONENTS} from '../../shared/imports.cont';
import {Router} from '@angular/router';
import {Streamer} from '../../models/streamer-profile/streamer.model';
import {StreamerLink} from '../../models/streamer-profile/streamer-link.model';
import {StreamerProfile} from '../../models/streamer-profile/streamer-profile.model';
import {LinkTypeEnum} from '../../enums/link-type-enum.enum';
import {StreamerLinkListComponent} from '../../shared/components/streamer-link-list/streamer-link-list.component';
import {AdvertisementListComponent} from '../../shared/components/advertisement-list/advertisement-list.component';
import {Advertisement} from '../../models/streamer-profile/advertisement.model';
import {AppFullcalendarComponent} from '../../shared/components/fullcalendar/fullcalendar.component';

@Component({
  selector: 'app-streamer-profile',
  templateUrl: 'streamer-profile.component.html',
  styleUrls: ['streamer-profile.component.scss'],
  standalone: true,
  imports: [...PRIMENG_PANEL_COMPONENTS, ...PRIMENG_MISC_COMPONENTS, StreamerLinkListComponent, AdvertisementListComponent, AppFullcalendarComponent]
})
export class StreamerProfileComponent implements OnInit {

  private router = inject(Router);

  streamerProfile = new StreamerProfile();

  ngOnInit(): void {
    const streamer = new Streamer();
    streamer.id = 1;
    streamer.name = 'NEEXcsgp';
    streamer.avatar = 'https://files.kick.com/images/user/17714734/profile_image/conversion/07e74748-4b4b-4a7e-9fbd-63cca52eb0b5-fullsize.webp';
    this.streamerProfile.streamer = streamer;

    const streamerLinks: StreamerLink[] = [
      {
        id: 1,
        linkType: LinkTypeEnum.KICK,
        linkLabel: 'NEEXcsgp',
        url: 'https://kick.com/neexcsgo',
        mainColor: 'rgba(79,158,80,0.6)'
      },
      {
        id: 2,
        linkType: LinkTypeEnum.TWITCH,
        linkLabel: 'NEEXcsgp',
        url: 'https://twitch.com/neexcsgo',
        mainColor: 'rgba(114,59,197,0.6)'
      },
      {
        id: 3,
        linkType: LinkTypeEnum.YOUTUBE,
        linkLabel: 'NEEXcsgp',
        url: 'https://youtube.pl/neexcsgo',
        mainColor: 'rgba(182,44,44,0.6)'
      },
      {
        id: 4,
        linkType: LinkTypeEnum.INSTAGRAM,
        linkLabel: 'NEEXcsgp',
        url: 'https://instagram.com/neexcsgo',
        mainColor: 'rgba(143,67,181,0.6)'
      },
      {
        id: 4,
        linkType: LinkTypeEnum.X,
        linkLabel: 'NEEXcsgp',
        url: 'https://x.com/neexcsgo',
        mainColor: 'rgba(87,87,87,0.6)'
      }
    ];
    this.streamerProfile.streamerLinks = streamerLinks;

    const advertisements: Advertisement[] = [
      {
        id: 1,
        url: 'https://g4skins.com/ref/neex',
        img: 'https://files.kick.com/images/channel-links/2194333/image/conversion/07ba24f3-69a1-4bc2-ab0e-509ad695efeb-image.webp'
      },
      {
        id: 2,
        url: 'https://pirateswap.com/pl?ref=neex',
        img: 'https://files.kick.com/images/channel-links/2194335/image/conversion/88a5a6b4-27f5-443c-9411-e1721208922f-image.webp'
      },
      {
        id: 3,
        url: 'https://www.instagram.com/neex_skins',
        img: 'https://files.kick.com/images/channel-links/2194337/image/conversion/f01ae39f-fc8d-497d-8831-4228707e7a58-image.webp'
      }
    ];
    this.streamerProfile.advertisements = advertisements;
  }
}
