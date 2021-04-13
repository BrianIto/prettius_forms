import * as React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Head from "next/head";
import RespostaPage from "../src/pages/RespostaPage/RespostaPage";
import {useRouter} from "next/router";

const Resposta = (props) => {
    return (
        <div>
            <Head>
                <title>Questionário de Viabilidade</title>
            </Head>
            <RespostaPage />
        </div>
    );
}

export default Resposta;