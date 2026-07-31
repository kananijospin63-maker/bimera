export type ActivityType = 'AGRICULTURE' | 'ELEVAGE' | 'INFORMATIQUE' | 'TECHNIQUE' | 'GENERAL';

export type UserRole = 'ADMIN' | 'EDITOR' | 'MEMBER' | 'VISITOR';

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  avatarUrl?: string;
  twoFactorEnabled?: boolean;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  category: ActivityType;
  published: boolean;
  imageUrl?: string;
  author?: {
    fullName: string;
    avatarUrl?: string;
  };
  createdAt: string;
}

export interface EventItem {
  id: string;
  title: string;
  description: string;
  location: string;
  eventDate: string;
  category: ActivityType;
}

export interface MediaItem {
  id: string;
  filename: string;
  url: string;
  mimeType: string;
  size: number;
  category: ActivityType;
  createdAt: string;
}

export interface ContentBlock {
  id: string;
  type: 'heading' | 'paragraph' | 'image' | 'callout' | 'button';
  data: {
    text?: string;
    level?: number;
    url?: string;
    caption?: string;
    variant?: 'primary' | 'secondary';
  };
}

export interface PageData {
  id: string;
  slug: string;
  title: string;
  description?: string;
  published: boolean;
  blocks: ContentBlock[];
  updatedAt: string;
}
