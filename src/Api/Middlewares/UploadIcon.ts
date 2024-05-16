import multer from "multer";
import { Request } from 'express';
import fs from 'fs';

const limitSize = 1024 * 1024; // 1MB

const storage = multer.diskStorage({ 
    // Can use multer memory storage and use 'sharp' to resize image before save to disk
    destination: function (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) {
        const uploadsDirectory = './uploads';
        const routePath: string = 'level-icons';
        const path: string = `${uploadsDirectory}/${routePath}`;

        if (!fs.existsSync(path)) {
            fs.mkdirSync(path, { recursive: true });
        }
        cb(null, path);
    },
    filename: function (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

// const fileFilter 

export const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: limitSize, 
    },
});
