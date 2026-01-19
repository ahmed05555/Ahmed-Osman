
export interface NavItem {
  label: string;
  href: string;
  active?: boolean;
}

export interface ArtistData {
  name: string;
  workTitle: string;
  biography: string[];
  highlight: string;
  portraitUrl: string;
  sculptureUrl: string;
}
