export interface Resource {
  id: string;
  title: string;
  creator: string;
  type: 'PDF' | 'Video' | 'Link' | 'Doc' | 'Audio';
  date: string;
  time: string;
  url: string;
  tag: 'new' | 'saved' | '';
  avatar: string;
  avatarColor: string;
}

export interface Creator {
  username: string;
  avatar: string;
  avatarColor: string;
  resourcesCount: number;
  lastReceivedDate: string;
}

export interface Stats {
  total: number;
  thisWeek: number;
  saved: number;
}
