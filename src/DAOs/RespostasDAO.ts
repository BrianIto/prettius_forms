import {collections} from "../config/variables";

const RespostasDAO = {
    db: null,
    setDb(db) { this.db = db},
    insert(resposta) {
        if (this.db) {
           return this.db.collection(collections.respostas).insertOne(resposta)
        }
    },
    find(query) {
        if (this.db) {
           return this.db.collection(collections.respostas).find(query);
        }
    },
    findAll() {
        return this.find({});
    }
}

export default RespostasDAO;


