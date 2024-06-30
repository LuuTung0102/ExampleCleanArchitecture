import mongoose from 'mongoose';

export class GetLevelByIdResponse {
    private message: string;
    private statusCode: number;
    private data: any;
    private error?: string;

    constructor(message: string, statusCode: number, data: any, error?: string){
        this.message = message;
        this.statusCode = statusCode;
        this.data = data;
        this.error = error;
    }
}