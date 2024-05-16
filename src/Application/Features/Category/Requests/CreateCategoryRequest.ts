export class CreateCategoryRequest {
    userId: string;
    stems: [{
        stemId: string;
        name: string;
        price: number;
    }];
    
    constructor(userId: string, stems: any) {
        this.userId = userId;
        this.stems = stems;
    }
}