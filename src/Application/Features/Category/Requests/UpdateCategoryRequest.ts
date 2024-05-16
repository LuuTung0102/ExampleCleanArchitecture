export class UpdateCategoryRequest {
    categoryId: string
    userId: string;
    stems: [{
        stemId: string;
        name: string;
        price: number;
    }];
    
    constructor(categoryId: string, userId: string, stems: any) {
        this.categoryId = categoryId;
        this.userId = userId;
        this.stems = stems;
    }
}