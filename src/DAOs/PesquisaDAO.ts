import {collections} from "../config/variables";

export interface Pesquisa {
    _id?: any,
    nome: string,
}

const PesquisaDAO  = {
    db: null,
    setDb(db) {
        this.db = db;
    },
    insert(dados : Pesquisa) {
        if (this.db) {
            return this.db.collection(collections.pesquisas).insertOne(dados)
        }
        return null;
    },
    delete(pesquisa_id) {
        if (this.db) {
            return this.db.collection(collections.pesquisas).deleteOne({_id: pesquisa_id})
        }
        return null;
    },
    findById(pesquisas, pesquisa_id) {
        for (let pesquisa of pesquisas) {
            if (pesquisa._id.toString() === pesquisa_id) {
                return pesquisa;
            }
        }
        return null;
    },
    edit(pesquisa_id, dados) {
        if (this.db) {
            return this.db.collection(collections.pesquisas).updateMany({_id: pesquisa_id}, {$set: dados});
        }
        return null;
    },
    find(query) {
        if (this.db) {
            return this.db.collection(collections.pesquisas).find(query);
        }
        return null;
    },
    findAll() {
        return this.find({});
    }
}

export default PesquisaDAO;