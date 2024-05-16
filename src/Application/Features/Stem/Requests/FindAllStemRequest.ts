export class FindAllStemRequest {
    perPage: number
    page: number

    constructor(perPage: number, page: number) {
        this.perPage = perPage;
        this.page = page;
    }
}