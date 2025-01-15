export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface InsuranceOption {
  type: string;
  description: string;
  benefits: string[];
}