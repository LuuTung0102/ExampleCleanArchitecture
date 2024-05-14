export class UpdateStemRequest {
    steamId: string

    constructor(steamId: string, name: string, type: string, description: string, stemCode: string, qrCode: string, producer: string, manufacture: string, price: number, imagePath: string, youtubeUrl: string, xp: string, buyDate: Date) {
        this.steamId = steamId;
        this.name = name;
        this.type = type;
        this.description = description;
        this.stemCode = stemCode;
        this.qrCode = qrCode;
        this.producer = producer;
        this.manufacture = manufacture;
        this.price = price;
        this.imagePath = imagePath;
        this.youtubeUrl = youtubeUrl;
        this.xp = xp;
        this.buyDate = buyDate;
    }

    name: string;
    type: string;
    description: string;
    stemCode: string;
    qrCode: string;
    producer: string;
    manufacture: string;
    price: number;
    imagePath: string;
    youtubeUrl: string;
    xp: string;
    buyDate: Date;
}