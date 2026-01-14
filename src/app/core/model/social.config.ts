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
    icon: 'fab fa-facebook',
  },
  {
    platform: 'instagram',
    url: 'https://instagram.com/yourProfile',
    icon: 'fab fa-instagram',
  },
  {
    platform: 'twitter',
    url: 'https://twitter.com/yourHandle',
    icon: 'fab fa-twitter',
  },
  // { platform: 'linkedin', url: 'https://linkedin.com/in/yourProfile' },
  {
    platform: 'youtube',
    url: 'https://youtube.com/yourChannel',
    icon: 'fab fa-youtube',
  },

];

export const phoneNumber: string= '962781126031' 