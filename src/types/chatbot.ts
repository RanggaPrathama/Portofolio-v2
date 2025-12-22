export interface Messages {
    id?:string;
    role: 'system' | 'user' | 'assistant';
    content: string;
}