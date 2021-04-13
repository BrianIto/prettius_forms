import Head from 'next/head'
import React from 'react'
import IndexPage from '../src/pages/IndexPage/IndexPage'
import styles from '../styles/Home.module.css'
import {setCollections, AppId} from '../src/config/variables'
import {useSelector, useDispatch} from 'react-redux';
import * as Realm from 'realm-web'
import PesquisaDAO from "../src/DAOs/PesquisaDAO";
import {ActionsFn} from "../src/redux/actions/Actions";
import PerguntasDAO from '../src/DAOs/PerguntasDAO'

export default function Home() {

    const dispatch = useDispatch()

  React.useEffect(() => {

        const app = new Realm.App({ id: AppId });
        const credentials = Realm.Credentials.emailPassword("brian.oliveira100@gmail.com", "123456");
        try {
            app.logIn(credentials).then(user => {
              const mongodb = app.currentUser.mongoClient("mongodb-atlas");
              dispatch(ActionsFn.setDb(setCollections(mongodb)))
              PesquisaDAO.setDb(setCollections(mongodb));
              PerguntasDAO.setDb(setCollections(mongodb))
              console.log("logged in");
            });
        } catch (e) {
            console.log("login failed");
            throw e;
        }
  }, [])

    React.useEffect(() => {
        console.log(window.location.href);
    })
  return (<IndexPage />)
}
