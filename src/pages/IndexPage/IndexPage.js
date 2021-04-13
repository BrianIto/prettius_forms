import React from 'react'
import {
    Button,
    Container,
    Divider,
    Form,
    Header,
    Icon,
    Label,
    Modal,
    Table, TableBody, TableHeader, TableHeaderCell, TableRow
} from "semantic-ui-react";
import PesquisaDAO from "../../DAOs/PesquisaDAO";
import PerguntasDAO from "../../DAOs/PerguntasDAO";
import {useDispatch, useSelector} from "react-redux";
import {ActionsFn} from "../../redux/actions/Actions";
import {useRouter} from "next/router";

const IndexPage = () => {

    const router = useRouter()
    const [modalOpen, setModalOpen] = React.useState(false)
    const [errorName, setErrorName] = React.useState(false)
    const [formPesquisa, setFormPesquisa] = React.useState({
        nome: '',
    })
    const [loading, setLoading]  = React.useState(false);
    const { pesquisas, db } = useSelector(state => state.general);



    const onSubmit = async () => {
        if (formPesquisa.nome === "") {
            setErrorName(true);
        } else {
            // do your magic
            try {
                setLoading(true);
                console.log('before')
                await PesquisaDAO.insert({
                    nome: formPesquisa.nome,
                })
                let result = await PesquisaDAO.findAll();
                dispatch(ActionsFn.setPesquisas(result))
                setLoading(false);
                setModalOpen(false);
            } catch (e) {
                console.log(e);
            }
        }
    }

    const dispatch = useDispatch();

    React.useEffect(() => {
        if (db) {
            PesquisaDAO.findAll().then(res => {
                dispatch(ActionsFn.setPesquisas(res));
                PerguntasDAO.findAll().then(res1 => {
                    dispatch(ActionsFn.setPerguntas(res1))
                })
            });
        }
        console.log(db)
    }, [db]);

    React.useEffect(() => {
        setFormPesquisa({nome: ''})
        setErrorName(false);
    }, [modalOpen])

    return (
    <div style={{paddingTop: 35}}>
        <Container>
            <Modal
                size={'tiny'}
                onClose={() => setModalOpen(false)} onOpen={() => setModalOpen(true)} open={modalOpen}>
                <Modal.Header>
                    Criar Nova Pesquisa
                </Modal.Header>
                    <Modal.Content>
                        <Modal.Description>
                            <Form>
                                <Form.Field>
                                        {
                                            errorName ? <Label basic color={'red'}>Por favor, insira um nome!</Label>: <></>
                                        }
                                <Form.Input
                                    onChange={e =>
                                        setFormPesquisa({...formPesquisa, nome: e.target.value})}
                                    fluid
                                    size={"large"}
                                    labelPosition={"left"}
                                    placeholder={'Nome da Pesquisa'} />
                                </Form.Field>
                        </Form>
                            </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color={'black'} onClick={() => setModalOpen(false)}>Cancelar</Button>
                        <Button onClick={onSubmit} color={"orange"}>Criar Pesquisa</Button>
                    </Modal.Actions>
            </Modal>
        <Header as={'h1'}>Lista de Pesquisas</Header>
            <Divider />
            <Table>
                <TableHeader>
                    <TableRow>
                    <TableHeaderCell>Nome da Pesquisa</TableHeaderCell>
                        <TableHeaderCell>Respostas</TableHeaderCell>
                        <TableHeaderCell>Ações</TableHeaderCell>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        pesquisas.map((pesquisa, index) => (
                            <TableRow key={index}>
                                <Table.Cell>{pesquisa.nome}</Table.Cell>
                                <Table.Cell>{0}</Table.Cell>
                                <Table.Cell>
                                    <Button onClick={() => {
                                        router.push({ pathname: '/pesquisa/', query: {id: pesquisa._id.toString()}});
                                    }}>Visualizar</Button>
                                    <Button
                                        onClick={async () => {
                                            await PesquisaDAO.delete(pesquisa._id);
                                            let res = await PesquisaDAO.findAll();
                                            dispatch(ActionsFn.setPesquisas(res))
                                        }}
                                        secondary={true}>Deletar</Button>
                                </Table.Cell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
            <Button
                color={'orange'}
                icon
                disabled={loading}
                onClick={() => { setModalOpen(true)}}
                labelPosition={'right'}>Nova Pesquisa <Icon name={'add'} /></Button>
    </Container>
    </div>)
}

export default IndexPage;