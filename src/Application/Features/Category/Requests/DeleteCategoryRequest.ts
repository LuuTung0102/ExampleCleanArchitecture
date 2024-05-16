export class DeleteCategoryRequest {
    categoryId: string;
    stems: [{
        stemId: string;
        name: string;
        price: number;
    }];
    
    constructor(categoryId: string, stems: any) {
        this.categoryId = categoryId;
        this.stems = stems;
    }
}