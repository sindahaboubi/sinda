export class Service {
    constructor(
        public image:string,
        public id?:number,
        public idArtiste?:number,
        public description?:string,
        public prix?:number,
        public titre?:string,
        public dateCrea?:Date,
        public etat?:string,
        public cat?:number,
        ){}
}
