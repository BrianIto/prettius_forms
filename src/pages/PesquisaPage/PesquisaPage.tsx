import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
    Container,
    Icon,
    Table,
} from "semantic-ui-react";
import PerguntasDAO from '../../DAOs/PerguntasDAO';
import {useRouter} from "next/router";
import PesquisaDAO from "../../DAOs/PesquisaDAO";
import {ActionsFn} from "../../redux/actions/Actions";
import {Button} from "semantic-ui-react";
import AddEditModal from "./components/AddEditModal";

const Pesquisa = () => {

    const router = useRouter();

    const { pesquisas, perguntas, selectedPergunta } = useSelector(state => state.general);
    const dispatch = useDispatch()

    const [selectedPesquisa, setSelectedPesquisa] = React.useState({
        _id: '',
        nome: '',
    });

    const [modalOpen, setModalOpen] = React.useState(false);
    const [editing, setEditing] = React.useState(false);

    React.useEffect(() => {
        if (pesquisas.length === 0) {
            PesquisaDAO.findAll().then((res) => {
                dispatch(ActionsFn.setPesquisas(res))
                PerguntasDAO.findAll().then(res1 => {
                    dispatch(ActionsFn.setPerguntas(res1))
                })
            });
        }
    }, []);

    React.useEffect(() => {
        if (pesquisas.length > 0) {
            setSelectedPesquisa(PesquisaDAO.findById(pesquisas, router.query.id));
        }
    }, [pesquisas]);

    React.useEffect(() => {
        if (!modalOpen) {
            dispatch(ActionsFn.selectPergunta({
                titulo: '',
                _id: '',
            }));
            setEditing(false);
        }
    }, [modalOpen])

    return (
        <div style={{paddingTop: 35, paddingBottom: 35}}>
            <AddEditModal
                editing={editing}
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                selectedPesquisa={selectedPesquisa}
                selectedPergunta={selectedPergunta} />
            <Container>
                <h1>{selectedPesquisa.nome}</h1>
                <Table>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Título da Pergunta</Table.HeaderCell>
                            <Table.HeaderCell>Pergunta</Table.HeaderCell>
                            <Table.HeaderCell>Tipo de Pergunta</Table.HeaderCell>
                            <Table.HeaderCell />
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {
                            perguntas.map((pergunta) => (
                                pergunta.id_pesquisa.toString() === selectedPesquisa._id.toString() ?
                                <Table.Row>
                                    <Table.Cell>
                                        {pergunta.titulo}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {pergunta.pergunta}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {pergunta.tipo}
                                    </Table.Cell>
                                    <Table.Cell singleLine={true}>
                                        <Button
                                            onClick={() => {
                                                dispatch(ActionsFn.selectPergunta(pergunta));
                                                setModalOpen(true);
                                                setEditing(true);
                                            }}
                                            icon >
                                            <Icon name={'pencil'} />
                                        </Button>
                                        <Button onClick={async () => {
                                            if (confirm("Tem certeza que deseja excluir a pergunta? ")) {
                                                await PerguntasDAO.delete(pergunta._id);
                                                let perguntas = await PerguntasDAO.findAll();
                                                dispatch(ActionsFn.setPerguntas(perguntas));
                                            }
                                        }} icon><Icon name={'trash'} /> </Button>
                                    </Table.Cell>
                                </Table.Row> : <></>
                            ))
                        }
                    </Table.Body>
                </Table>
                <Button
                    onClick={() => setModalOpen(true)}
                    color={'orange'} icon labelPosition={'right'}> Adicionar Pergunta <Icon name={'plus'} /></Button>
            </Container>
        </div>
    );
}

export default Pesquisa;