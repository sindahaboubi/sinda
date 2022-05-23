export class Commande {
    constructor(public id: number,
        public idArtiste:number,
        public idClient?:number,
        public idService?:number,
        public description?:string,
        public dateCommande?:Date,
        ){}
}
