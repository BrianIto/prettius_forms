import {collections} from "../config/variables";

const RespostasDAO = {
    db: null,
    setDb(db) { this.db = db},
    insert(resposta) { this.db.collection(collections.respostas).insertOne(resposta) }
}

export default RespostasDAO;


