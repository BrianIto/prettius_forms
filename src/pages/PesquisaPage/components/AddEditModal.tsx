import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
    Button,
    CommentText,
    Dropdown,
    Form, Grid,
    Header,
    Icon,
    Input,
    Label, Message,
    Modal,
    Radio,
    TextArea
} from "semantic-ui-react";
import PerguntasDAO from "../../../DAOs/PerguntasDAO";
import {ActionsFn} from "../../../redux/actions/Actions";

interface Props {
    modalOpen: boolean,
    setModalOpen: (boolean) => void,
    selectedPesquisa: any,
    selectedPergunta?: any,
    editing: boolean,
}

const AddEditModal = ({modalOpen, setModalOpen, selectedPesquisa, selectedPergunta, editing} : Props) => {

    const radioType = [{
        name: 'mult_escolha',
        label: 'Múltipla Escolha'
    }, {
        name: 'texto',
        label: 'Texto',
    }, {
        name: 'mult_escolha1',
        label: 'Múltipla Escolha (Certo ou Errado)'
    }];
    const certoErradoOptions = [{key: 'Certo', text: 'Certo', value: 'Certo'},
        {key: 'Errado', text: 'Errado', value: 'Errado'}];

    const { perguntas } = useSelector(state => state.general);
    const dispatch = useDispatch();

    const [options, setOptions] = React.useState([]);
    const [radioSelected, setRadioSelected] = React.useState(radioType[2].name);
    const [opcaoValue, setOpcaoValue] = React.useState("");
    const [dropdownSelected, selectDropdown]  = React.useState('Certo');
    const [pergunta, setPergunta] = React.useState({
        titulo: '',
        tipo: 'mult_escolha1',
        pergunta: '',
        opcoes: [],
        id_pesquisa: '',
    });
    const [optionsProx, setOptionsProx] = React.useState([]);
    const [proxCerto, setProxCerto] = React.useState(null);
    const [proxErrado, setProxErrado] = React.useState(null);
    const [prox, setProx] = React.useState(null);

    //Close modal Erases ALL cache data.
    React.useEffect(() => {
        setOpcaoValue('');
        setRadioSelected(radioType[2].name);
        setOptions([]);
        selectDropdown('Certo');
    }, [modalOpen]);

    React.useEffect(() => {
        if (selectedPergunta) {
            setOpcaoValue(selectedPergunta.option);
            setRadioSelected(selectedPergunta.tipo);
            if (selectedPergunta.opcoes) {
                setOptions(selectedPergunta.opcoes);
            }
            if (selectedPergunta.tipo === 'mult_escolha1') {
                setProxCerto(selectedPergunta.proxCerto);
                setProxErrado(selectedPergunta.proxErrado);
            } else {
                setProx(selectedPergunta.prox);
            }
            setPergunta(selectedPergunta);
            selectDropdown('Certo');
        }
    }, [modalOpen, selectedPergunta, perguntas])

    React.useEffect(() => {
        let arr = [{key: 'final', text: "Finalizar Questionário", value: 'final'}]
        let aux = perguntas.filter(pergunta => (pergunta.id_pesquisa.toString() === selectedPesquisa._id.toString()))
        aux = aux.map((pergunta) => {
            return ({key: pergunta._id, text: pergunta.titulo, value: pergunta._id})
        });
        console.log(aux);
        arr = [...arr, ...aux];
        setOptionsProx(arr);
    }, [perguntas])

    return (
        <Modal open={modalOpen} onClose={() => setModalOpen(false)} onOpen={() => setModalOpen(true)}>
            <Modal.Header>
                Adicionar Pergunta
            </Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    <Form>
                        <Form.Input
                            key={selectedPergunta.titulo}
                            defaultValue={selectedPergunta.titulo}
                            onChange={(e) =>
                                setPergunta({...pergunta, titulo: e.target.value})}
                            label={'Título da Pergunta'} fluid/>
                        <div style={{display: 'flex', marginTop: 15, marginBottom: 15}}>
                            {
                                radioType.map((radio) => (
                                    <div style={{width: '100%'}} key={radio.name}>
                                        <Radio
                                            checked={radioSelected === radio.name}
                                            onChange={() => {
                                                setRadioSelected(radio.name)
                                                setPergunta({...pergunta, tipo: radio.name})
                                            }}
                                            label={radio.label} />
                                    </div>
                                ))
                            }
                        </div>
                        <div style={{marginBottom: 15}}>
                            <TextArea
                                key={selectedPergunta.pergunta}
                                defaultValue={selectedPergunta.pergunta}
                                onChange={(e, {value}) =>{
                                // @ts-ignore
                                setPergunta({...pergunta, pergunta: value})
                            }} rows={4} placeholder={"Pergunta"} />
                        </div>
                    </Form>
                    {
                        radioSelected === 'texto' ?
                            <></> :
                            <React.Fragment>
                                <div style={{marginBottom: 15}}>
                                    <Input
                                        value={opcaoValue}
                                        onChange={e => {
                                            setOpcaoValue(e.currentTarget.value)
                                        }} labelPosition={'left'} fluid>
                                        <Label>Título da Opção</Label>
                                        <input />
                                        {
                                            (radioSelected === radioType[2].name) ?
                                                <Label>
                                                    <Dropdown
                                                        onChange={e => {
                                                            // @ts-ignore
                                                            selectDropdown(e.target.innerHTML);
                                                        }}
                                                        defaultValue={'Certo'}
                                                        options={certoErradoOptions} />
                                                </Label> : <></> }
                                    </Input>
                                </div>
                                <Button
                                    onClick={() => {
                                        let optionsAux = [...options];
                                        if (radioSelected === 'mult_escolha1') {
                                            optionsAux.push({titulo: opcaoValue, type: dropdownSelected});
                                        } else {
                                            optionsAux.push({titulo: opcaoValue})
                                        }
                                        console.log(optionsAux);
                                        setOptions(optionsAux);
                                    }}
                                    icon
                                    labelPosition={'right'}>
                                    Adicionar Opção
                                    <Icon name={'plus'} />
                                </Button>
                                <Header>Opções</Header>
                                {
                                    (options.length <= 0) ?
                                        <CommentText>Sem opções adicionadas, ainda, clique acima para adicionar opção.</CommentText>
                                        : options.map((option, index) => (
                                            <Message>
                                                <Message.Header>
                                                    <Grid>
                                                        <Grid.Row>
                                                            <Grid.Column width={10}>
                                                                <h3 style={{marginTop: 3}}>
                                                                <span style={{marginRight: 20}}>
                                                                    {
                                                                        (() => {
                                                                            if (radioSelected === 'mult_escolha1') {
                                                                                if (option.type === "Certo") {
                                                                                    return <Icon 
                                                                                        name={'check'} 
                                                                                        color={"grey"} 
                                                                                        circular={true} />
                                                                                } else {
                                                                                    return <Icon 
                                                                                        name={'times'} 
                                                                                        color={'grey'} 
                                                                                        circular={true} />
                                                                                }
                                                                            }
                                                                            return <></>
                                                                        })()
                                                                    }
                                                                </span>
                                                                    {option.titulo}
                                                                </h3>
                                                            </Grid.Column>
                                                            <Grid.Column floated={'right'}>
                                                                <Button
                                                                    style={{marginTop: 5}}
                                                                    onClick={() => {
                                                                        let optionsAux = [...options];
                                                                        optionsAux.splice(index, 1);
                                                                        setOptions(optionsAux);
                                                                    }}
                                                                    icon>
                                                                    <Icon name={'trash'}/>
                                                                </Button>
                                                            </Grid.Column>
                                                        </Grid.Row>
                                                    </Grid>
                                                </Message.Header>
                                            </Message>
                                        ))
                                }
                            </React.Fragment>
                    }
                    {
                        pergunta.tipo === 'mult_escolha1' ?
                            <React.Fragment>
                                <Header as={'h3'}>Próxima Pergunta (Se Certo)</Header>
                                <Dropdown
                                    key={selectedPergunta}
                                    onChange={(e, {value}) => {
                                        setProxCerto(value);
                                    }}
                                    fluid
                                    value={proxCerto}
                                    defaultValue={
                                        editing ?
                                            selectedPergunta.proxCerto
                                            :
                                        perguntas.length > 0 ? perguntas[0]._id : ''}
                                    options={optionsProx} />
                                <Header as={'h3'}>Próxima Pergunta (Se Errado)</Header>
                                <Dropdown
                                    key={selectedPergunta}
                                    onChange={(e, {value}) => {
                                        setProxErrado(value)
                                    }}
                                    fluid
                                    value={proxErrado}
                                    options={optionsProx} />
                            </React.Fragment>
                            :
                            <React.Fragment>
                                <Header as={'h3'}>Próxima Pergunta</Header>
                                <Dropdown
                                    onChange={(e, {value}) => {
                                        setProx(value);
                                    }}
                                    fluid
                                    value={prox}
                                    options={optionsProx} />
                            </React.Fragment>
                    }

                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button
                    secondary
                    onClick={() => setModalOpen(false)}>
                    Cancelar</Button>
                <Button
                    onClick={async () => {
                        let finalPergunta = {...pergunta};
                        finalPergunta = {...finalPergunta, opcoes: options, id_pesquisa: selectedPesquisa._id};
                        if (finalPergunta.tipo === 'mult_escolha1') {
                            finalPergunta["proxCerto"] = proxCerto
                            finalPergunta["proxErrado"] = proxErrado
                        } else {
                            finalPergunta["prox"] = prox
                        }
                        if (editing) {
                            console.log(finalPergunta);
                            await PerguntasDAO.edit(selectedPergunta._id, finalPergunta);
                        } else {
                            //@ts-ignore
                            delete finalPergunta._id;
                            console.log(finalPergunta);
                            await PerguntasDAO.insert(finalPergunta);
                        }
                        const perguntas = await PerguntasDAO.findAll();
                        dispatch(ActionsFn.setPerguntas(perguntas));
                        setModalOpen(false);
                    }}
                    color={'orange'}>Adicionar</Button>
            </Modal.Actions>
        </Modal>
    );
}

export default AddEditModal;