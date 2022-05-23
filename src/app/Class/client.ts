export class Client {
    constructor(public id:number,
        public email:string,
        public password:string,
        public nom:string,
        public prenom:string,
        public dateNaissance:Date,
        public genre:string,
        public etat:boolean,
        public image:string){}
}
