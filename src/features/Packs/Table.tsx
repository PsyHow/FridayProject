import React, { useEffect } from "react";
import s from "./Table.module.css"
import { useDispatch, useSelector } from "react-redux";
import { AppRootStoreType } from "bll/Store";
import Button from "../../components/common/Button/Button";
import { CardPack } from "./CardPack/CardPack";
import { Paginator } from "components/common/Paginator/Paginator";
import { Sorting } from "components/Sorting/Sorting";
import { Search } from "components/Search/Search";
import { Navigate } from "react-router-dom";
import {
    createCardPackTC,
    deleteCardPackTC,
    getCardPacksTC,
    updateCardPackTC,
} from "./bll/CardPacksThunk";

export const Table = () => {
    const dispatch = useDispatch()
    const loggedIn = useSelector<AppRootStoreType, boolean>(state => state.loginReducer.isLogged)
    const {
        cardPacksTotalCount,
        cardPacks,
        page,
        pageCount,
        sortPacks,
        packName,
        min,
        max,
        minCardsCount,
        maxCardsCount,
    } = useSelector((state:AppRootStoreType)=> state.cardPacks)

    useEffect(() => {
        dispatch(getCardPacksTC())
    }, [dispatch, page, pageCount, sortPacks, loggedIn, packName, min, max, minCardsCount, maxCardsCount])

    const deleteCardPack = (id: string) => {
        dispatch(deleteCardPackTC(id))
    }

    const editCardPack = (id: string, name: string) => {
        dispatch(updateCardPackTC(id, name))
    }

    const createCardPack = () => {
        dispatch(createCardPackTC())
    }

    if (!loggedIn) {
        return <Navigate to="/login"/>
    }

    return ( <>
        <Button onClick={ createCardPack }> add cardpack</Button>
        <Search min={ +min } max={ +max }
                defaultMin={minCardsCount} defaultMax={maxCardsCount}/>
        <table className={ s.table }>
            <thead>
            <tr>
                <td>Name<Sorting sortName={ "name" }/></td>
                <td>CardsCount<Sorting sortName={ "cardsCount" }/></td>
                <td>Last Updated<Sorting sortName={ "updated" }/></td>
                <td>Created by<Sorting sortName={ "created" }/></td>
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
        <Paginator totalItemsCount={ cardPacksTotalCount }
                   currentPage={ page }
                   pageSize={ pageCount }/>
    </> )
}