import * as React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Head from "next/head";
import RespostaPage from "../src/pages/RespostaPage/RespostaPage";

const Resposta = (props) => {
    return (
        <div>
            <Head>
                <title>Pesquisa de Público</title>
            </Head>
            <RespostaPage />
        </div>
    );
}

export default Resposta;