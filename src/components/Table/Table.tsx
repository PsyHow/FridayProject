import React, { useEffect } from "react";
import s from "./Table.module.css"
import { useDispatch, useSelector } from "react-redux";
import { AppRootStoreType } from "../../bll/Store";
import {
    CardPackType,
    createCardPackTC,
    deleteCardPackTC,
    getCardPacksTC,
    updateCardPackTC,
} from "./CardPacks/CardPacksReducer";
import Button from "../Button/Button";
import { CardPack } from "./CardPacks/CardPack/CardPack";
import { Paginator } from "../Paginator/Paginator";
import { Sorting } from "../Sorting/Sorting";
import { Search } from "../Search/Search";
import { Navigate } from "react-router-dom";

export const Table = () => {
    const dispatch = useDispatch()
    const loggedIn = useSelector<AppRootStoreType, boolean>(state => state.loginReducer.isLogged)
    const cardPacks = useSelector<AppRootStoreType, Array<CardPackType>>(state => state.cards.cardPacks)
    const page = useSelector<AppRootStoreType, number>(state => state.cards.page)
    const pageCount = useSelector<AppRootStoreType, number>(state => state.cards.pageCount)
    const sortPacks = useSelector<AppRootStoreType, string>(state => state.cards.sortPacks)
    const packName = useSelector<AppRootStoreType, string>(state => state.cards.packName)
    const min = useSelector<AppRootStoreType, string>(state => state.cards.min)

    useEffect(() => {

        dispatch(getCardPacksTC())
    }, [page, pageCount, sortPacks, loggedIn, packName, min])

    if(!loggedIn) {
        return <Navigate to='/login'/>
    }


    const deleteCardPack = (id: string) => {
        dispatch(deleteCardPackTC(id))
    }

    const editCardPack = (id: string, name: string) => {
        dispatch(updateCardPackTC(id, name))
    }
    // const LearnCardPack = () => {
    //
    // }
    const createCardPack = () => {
        dispatch(createCardPackTC())
    }

    return ( <>
        <Button onClick={ createCardPack }> add cardpack</Button>
        <Search/>
        <table className={ s.table }>
            <thead>
            <tr>
                <td>Name<Sorting sortName={ 'name' }/></td>
                <td>CardsCount<Sorting sortName={ 'cardsCount' }/></td>
                <td>Last Updated<Sorting sortName={ 'updated' }/></td>
                <td>Created by<Sorting sortName={ 'created' }/></td>
                <td>Actions</td>
            </tr>
            </thead>
            <tbody>
            { cardPacks.map(cardPack => {
                return <CardPack cardPack={ cardPack }
                                 deleteCardPack={ deleteCardPack }
                                 editCardPack={ editCardPack }
                />
            }) }
            </tbody>
        </table>
        <Paginator/>
    </> )
}