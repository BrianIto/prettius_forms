import {collections} from "../config/variables";

export interface Pergunta {
    _id?: any,
    tipo: "mult_escolha" | "mult_escolha1" | "texto",
    titulo: string,
    pergunta: string,
    opcoes?: Array<any>,
    id_pesquisa: any,
    prox?: any,
    proxCerto?: any,
    proxErrado?: any,
}


const PerguntasDAO  = {
    db: null,
    setDb(db) {
        this.db = db;
    },
    insert(dados) {
        if (this.db) {
            return this.db.collection(collections.perguntas).insertOne(dados)
        }
        return null;
    },
    delete(pergunta_id) {
        if (this.db) {
            return this.db.collection(collections.perguntas)
                .deleteOne({_id: pergunta_id})
        }
        return null;
    },
    findById(perguntas, pergunta_id) {
        for (let pergunta of perguntas) {
            if (pergunta._id.toString() === pergunta_id) {
                return pergunta;
            }
        }
        return null;
    },
    edit(pergunta_id, dados) {
        if (this.db) {
            return this.db.collection(collections.perguntas).updateMany({_id: pergunta_id}, {$set: dados});
        }
        return null;
    },
    find(query) {
        if (this.db) {
            return this.db.collection(collections.perguntas).find(query);
        }
        return null;
    },
    findAll() {
        return this.find({});
    }
}

export default PerguntasDAO;