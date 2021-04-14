import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { Dimmer, Header} from "semantic-ui-react";
import Lottie from "lottie-react";
import blob from '../../../public/blob_animated.json';
import styles from "./RespostaPage.module.sass"
import PerguntasDAO, {Pergunta} from "../../DAOs/PerguntasDAO";
import PesquisaDAO from "../../DAOs/PesquisaDAO";
import * as Realm from "realm-web";
import {AppId, setCollections} from "../../config/variables";
import {ActionsFn} from "../../redux/actions/Actions";
import TextOrOptions from "./components/TextOrOptions";
import RespostasDAO from "../../DAOs/RespostasDAO";

const RespostaPage = () => {

    const [loadingPage, setLoadingPage] = React.useState(true);
    const dispatch = useDispatch();

    const [perguntas, setPerguntas] = React.useState({});
    const [perguntaAtual, setPerguntaAtual] = React.useState<Pergunta | "final">({
        titulo: '',
        pergunta: '',
        tipo: 'mult_escolha',
        opcoes: [],
        id_pesquisa: ''
    });
    const [pesquisa, setPesquisa] = React.useState({});
    const [resposta, setResposta] = React.useState([]);

    React.useEffect(() => console.log(resposta), [resposta]);

    React.useEffect(() => {
        const app = new Realm.App({ id: AppId });
        const credentials = Realm.Credentials.emailPassword("brian.oliveira100@gmail.com", "123456");

        try {
            app.logIn(credentials).then(() => {
                const mongodb = app.currentUser.mongoClient("mongodb-atlas");
                dispatch(ActionsFn.setDb(setCollections(mongodb)))
                PesquisaDAO.setDb(setCollections(mongodb));
                RespostasDAO.setDb(setCollections(mongodb));
                PerguntasDAO.setDb(setCollections(mongodb));
                const pesquisaId = window.location.search.match(/id=(\w+)/g)[0].split("=")[1];

                PesquisaDAO.findAll().then(pesquisas => {
                    PerguntasDAO.findAll().then(perguntas => {
                        setLoadingPage(false)
                        let pesquisa = pesquisas.filter(pesquisa => pesquisa._id.toString() === pesquisaId);
                        let perguntasDaPesquisa = perguntas.filter(pergunta => pergunta.id_pesquisa.toString() === pesquisaId);
                        setPesquisa(pesquisa[0]);
                        setPerguntas(perguntasDaPesquisa);
                        setPerguntaAtual(perguntasDaPesquisa[0]);
                    })
                })
            });
        } catch (e) {
            console.log("login failed");
            throw e;
        }
    }, []);

    const submitToDatabase = async (resposta) => {
        const data = {
            data: new Date(),
            //@ts-ignore
            pesquisa: pesquisa._id,
            respostas: resposta,
        }
        await RespostasDAO.insert(data);
    }

    const [optionSelected, setOptionSelected] = React.useState(null);
    const [textTyped, setTextTyped] = React.useState('');
    React.useEffect(() => {
        setOptionSelected(null);
        setTextTyped('');
        if (perguntaAtual === "final") {
            submitToDatabase(resposta).then(() => {
                console.log('something working on');
            })
        }
    }, [perguntaAtual])

    const getPergunta = (perguntas, id_pergunta) => {
        if (id_pergunta === "final") {
            return "final";
        }
        return perguntas.filter(pergunta => (pergunta._id.toString() === id_pergunta.toString()))[0];
    }

        return (
            <div>

                {loadingPage ? <Dimmer active={loadingPage}>
                        <Header as={'h2'} color={'orange'}>Carregando...</Header>
                </Dimmer> : <></>}
                <div className={styles.animation}>
                    <Lottie animationData={blob} autoplay={true} loop={true}  />
                </div>
                <div className={styles.animation1}>
                    <Lottie animationData={blob} autoplay={true} loop={true}  />
                </div><div className={styles.animation2}>
                <Lottie animationData={blob} autoplay={true} loop={true}  />
            </div><div className={styles.animation3}>
                <Lottie animationData={blob} autoplay={true} loop={true}  />
            </div>
                <div className={styles.bg}>
                    {perguntaAtual === "final" ?
                        <div>
                            <h2>Obrigado por contribuir!</h2>
                            <p>Sua ajuda é muito importante. Você pode fechar essa página. (:</p>
                        </div> :
                        <div>
                            <h1>{perguntaAtual.titulo}</h1>
                            <h2>{perguntaAtual.pergunta}</h2>
                            <div className={styles.options_container}>
                                <TextOrOptions
                                    onChangeText={(value) => {
                                        setTextTyped(value);
                                    }}
                                    onClickOption={(option) => {
                                        setOptionSelected(option);
                                    }}
                                    tipo={perguntaAtual.tipo}
                                    opcoes={perguntaAtual.opcoes}  />
                            </div>
                            <button
                                onClick={() => {
                                        if (perguntaAtual.tipo === "texto") {
                                            setResposta([...resposta, {
                                                pergunta: perguntaAtual._id,
                                                texto: textTyped,
                                            }])
                                        } else {
                                            setResposta([...resposta, {
                                                pergunta: perguntaAtual._id,
                                                opcao: optionSelected,
                                            }])
                                        }
                                        if (perguntaAtual.tipo === "mult_escolha1") {
                                            if (optionSelected.type === "Certo") {
                                                setPerguntaAtual(getPergunta(perguntas, perguntaAtual.proxCerto));
                                            } else {
                                                setPerguntaAtual(getPergunta(perguntas, perguntaAtual.proxErrado));
                                            }
                                        } else {
                                            setPerguntaAtual(getPergunta(perguntas, perguntaAtual.prox));
                                        }
                                }}
                            >Próxima &nbsp; <i className={'fas fa-arrow-right'} /></button>
                        </div>
                        }
                </div>
            </div>
        )
}

export default RespostaPage;