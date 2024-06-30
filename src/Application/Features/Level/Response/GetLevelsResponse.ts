import mongoose from 'mongoose';
import { BaseResponse } from '../../../Common/Model/Response/BaseResponse';

interface Level {
    _id: mongoose.Types.ObjectId,
    level: number,
    xp: number,
    description: string,
    iconPath: string
}

export class GetLevelsResponse {
    private message: string;
    private statusCode: number;
    private data: any;
    private error?: string;

    constructor(message: string, statusCode: number, data: Level[], error?: string){
        this.message = message;
        this.statusCode = statusCode;
        this.data = data;
        this.error = error;
    }
}