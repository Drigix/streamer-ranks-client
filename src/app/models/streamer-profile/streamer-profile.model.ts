import {Streamer} from './streamer.model';
import {StreamerLink} from './streamer-link.model';
import {Advertisement} from './advertisement.model';

export class StreamerProfile {
  streamer?: Streamer;
  streamerLinks?: StreamerLink[];
  advertisements?: Advertisement[];
}
