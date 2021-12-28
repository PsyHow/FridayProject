import React, { ChangeEvent, useEffect } from "react";
import s from "./Table.module.css"
import { useDispatch, useSelector } from "react-redux";
import { AppRootStoreType } from "bll/Store";
import Button from "../../components/common/Button/Button";
import { CardPack } from "./CardPack/CardPack";
import { Paginator } from "components/common/Paginator/Paginator";
import { Sorting } from "components/common/Sorting/Sorting";
import { Search } from "components/common/Search/Search";
import { Navigate } from "react-router-dom";
import {
    createCardPackTC,
    deleteCardPackTC,
    getCardPacksTC,
    updateCardPackTC,
} from "./bll/CardPacksThunk";
import { setCardsCurrentPageAC, setCardsError } from "../Cards/bll/cardsActions";
import SuperCheckbox from "../../components/common/Checkbox/Checkbox";
import { setPackId } from "./bll/CardPacksActions";

export const Table = () => {
    const dispatch = useDispatch()
    const isLoggedIn = useSelector<AppRootStoreType, boolean>(state => state.loginReducer.isLogged)
    const userId = useSelector<AppRootStoreType, string>(st => st.profileReducer.user._id)
    const {
        cardPacksTotalCount,
        cardPacks,
        min,
        max,
        page,
        pageCount,
        minCardsCount,
        maxCardsCount,
        error,
    } = useSelector((state: AppRootStoreType) => state.cardPacks)

    useEffect(() => {
        dispatch(setCardsError(''))
        dispatch(getCardPacksTC())
        return () => {
            dispatch(setCardsCurrentPageAC(1))
        }
    }, [dispatch])

    const deleteCardPack = (id: string) => {
        dispatch(deleteCardPackTC(id))
    }

    const editCardPack = (id: string, name: string) => {
        dispatch(updateCardPackTC(id, name))
    }

    const createCardPack = () => {
        dispatch(createCardPackTC())
    }

    const changePacks = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.currentTarget.checked) {
            dispatch(setPackId(userId))
            dispatch(getCardPacksTC())
        } else {
            dispatch(setPackId(''))
            dispatch(getCardPacksTC())
        }
    }

    if(!isLoggedIn) {
        return <Navigate to="/login"/>
    }

    return ( <>
        <Button style={ { marginRight: "20px" } } onClick={ createCardPack }> add
            cardpack</Button>
        <SuperCheckbox onChange={ changePacks }/> --- My Packs
        <Search min={ min } max={ max }
                defaultMin={ minCardsCount } defaultMax={ maxCardsCount }/>
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
        <Paginator
            page={page}
            pageCount={pageCount}
            totalItemsCount={ cardPacksTotalCount }/>
        { error && <span className={ s.error }>{ error }</span> }
    </> )
}