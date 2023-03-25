export class Product {
    constructor(
        public sku:string,
        public name:string,
        public description:string,
        public unitPrice:number,
        public unitsInStock: number,
        public imageUrl:string,
        public active:boolean,
        public dateCreated:Date,
        public lastUpdated:Date
    ){

    }
}
