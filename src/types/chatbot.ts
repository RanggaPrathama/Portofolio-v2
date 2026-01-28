export interface Messages {
    id?:string;
    role: 'system' | 'user' | 'assistant';
    content: string;
}


export interface ModelUse {
    model: string;
    stream: boolean;
    max_completion_tokens: number;
    temperature: number;
    top_p: number;
}

