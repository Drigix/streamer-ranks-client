import {LinkTypeEnum} from '../../enums/link-type-enum.enum';

export class StreamerLink {
  id?: number;
  linkType?: LinkTypeEnum;
  linkLabel?: string;
  url?: string;
  mainColor?: string;
}
