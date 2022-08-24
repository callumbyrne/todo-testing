export interface User {
    _id: string;
    email: string;
    name: string;
    todos: Todo[];
    createdAt: Date;
    updatedAt: Date;
    __v: number;
    session: string;
    iat: number;
    exp: number;
}

export interface ITodo {
    completed: boolean;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
    _id: string;
}
