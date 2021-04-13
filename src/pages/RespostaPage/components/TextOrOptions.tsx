import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Input} from "semantic-ui-react";
import Options from "./Options";

const TextOrOptions = ({ tipo, opcoes, onClickOption, onChangeText } :
                           {tipo : "mult_escolha" | "mult_escolha1" | "texto",
                               opcoes?: Array<any>,
                               onChangeText: (value: any) => any,
                               onClickOption : (option: any) => any}) => {


    const [selected, setSelected] = React.useState('');

    React.useEffect(() => {
        setSelected('');
    }, [tipo, opcoes]);


    if (tipo === "texto") {
        return (
            <Input
                onChange={(e, {value}) => onChangeText(value)}
                className={'width100'}
                fluid
                placeholder={"Digite sua resposta aqui..."}/>
        )
    } else {
        return (<React.Fragment>
            {
                opcoes.map(option => (
                    <Options
                        selected={selected === option.titulo}
                        onClick={() => {
                            setSelected(option.titulo)
                            onClickOption(option)
                        }}
                        option={option.titulo}/>
                ))
            }
        </React.Fragment>)
    }
}

export default TextOrOptions;