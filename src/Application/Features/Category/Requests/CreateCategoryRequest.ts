export class CreateCategoryRequest {
    userId: string;
    stems: [{
        stem: {
            
        }
    }];
    
    constructor(userId: string, stems: any) {
        this.userId = userId;
        this.stems = stems;
    }
}