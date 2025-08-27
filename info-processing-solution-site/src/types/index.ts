export interface Question {
    id: number;
    text: string;
    solution: string;
}

export type QuestionList = Question[];