import React, {useEffect} from "react";
import s from './Table.module.css'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStoreType} from "../../bll/Store";
import {Navigate} from "react-router-dom";
import {
    CardPackType,
    createCardPackTC,
    deleteCardPackTC,
    getCardPacksTC,
    updateCardPackTC
} from "./CardPacks/CardPacksReducer";
import Button from "../Button/Button";
import {CardPack} from "./CardPacks/CardPack/CardPack";
import { Paginator } from "../Paginator/Paginator";

export const Table = () => {
    const loggedIn = useSelector<AppRootStoreType, boolean>(state => state.loginReducer.isLogged)
    const dispatch = useDispatch()
    const cardPacks = useSelector<AppRootStoreType, Array<CardPackType>>(state => state.cards.cardPacks)
    const page = useSelector<AppRootStoreType, number>(state => state.cards.page)
    const pageCount = useSelector<AppRootStoreType, number>(state => state.cards.pageCount)

    useEffect(() => {
        if (!loggedIn) {
            return;
        }
        dispatch(getCardPacksTC())
    }, [page, pageCount])

    if (!loggedIn) {
        return <Navigate to={"/login"}/>
    }

    const deleteCardPack=(id:string)=> {
        dispatch(deleteCardPackTC(id))
    }

    const editCardPack=(id: string, name: string)=> {
        dispatch(updateCardPackTC(id, name))
    }
    const LearnCardPack=()=> {

    }
    const createCardPack=()=>{
        dispatch(createCardPackTC())
    }

    return (<>
            <Button onClick={createCardPack}> add cardpack</Button>
            <table className={s.table}>
                <thead>
                <tr>
                    <td>Name</td>
                    <td>CardsCount</td>
                    <td>Last Updated</td>
                    <td>Created by</td>
                    <td>Actions</td>
                </tr>
                </thead>
                <tbody>
                {cardPacks.map(cardPack => {
                    return <CardPack cardPack={cardPack}
                                     deleteCardPack={deleteCardPack}
                                     editCardPack={editCardPack}
                    />
                })}
                </tbody>
            </table>
        <Paginator/>
    </>)
}