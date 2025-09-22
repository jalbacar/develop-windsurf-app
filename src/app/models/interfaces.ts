export interface Commit {
  id: string;
  author: string;
  message: string;
  date: Date;
  files: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar?: string;
}

export interface CodeReview {
  id: string;
  title: string;
  author: string;
  status: 'pending' | 'approved' | 'rejected';
  comments: Comment[];
  reviewDate?: Date;
}

export interface Comment {
  id: string;
  author: string;
  content: string;
  line?: number;
  file?: string;
}

export interface DevOpsData {
  commits: Commit[];
  teamMembers: TeamMember[];
  codeReviews: CodeReview[];
}