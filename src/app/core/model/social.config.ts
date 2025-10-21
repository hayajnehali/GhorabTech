export type SocialPlatform =
  | 'facebook'
  | 'instagram'
  | 'twitter'
  | 'linkedin'
  | 'youtube'
  | 'tiktok'
  | 'whatsapp';

export interface SocialLink {
  platform: SocialPlatform;
  url: string;
  icon: string;
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    platform: 'facebook',
    url: 'https://facebook.com/yourPage',
    icon: 'fa fa-facebook',
  },
  {
    platform: 'instagram',
    url: 'https://instagram.com/yourProfile',
    icon: 'fa fa-instagram',
  },
  {
    platform: 'twitter',
    url: 'https://twitter.com/yourHandle',
    icon: 'fa fa-twitter',
  },
  // { platform: 'linkedin', url: 'https://linkedin.com/in/yourProfile' },
  {
    platform: 'youtube',
    url: 'https://youtube.com/yourChannel',
    icon: 'fa fa-youtube',
  },

];

export const phoneNumber: string= '96781126031' 