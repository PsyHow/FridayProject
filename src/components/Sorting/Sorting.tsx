import { FC } from "react";
import { useDispatch } from "react-redux";
import { getCardsSorting, setCardsCurrentPageAC } from "features/Cards/bll/cardsActions";
import {
    getPackSorting,
    setPacksCurrentPageAC,
} from "features/Packs/bll/CardPacksActions";
import { getCardsTC } from "features/Cards/bll/cardsThunks";
import { getCardPacksTC } from "features/Packs/bll/CardPacksThunk";

export const Sorting: FC<PropsType> =
    ({ sortName, token }) => {
        const dispatch = useDispatch();

        const setSortUp = () => {
            dispatch(setPacksCurrentPageAC(1))
            dispatch(setCardsCurrentPageAC(1))
            if(token) {
                dispatch(getCardsSorting(`0${ sortName }`))
                dispatch(getCardsTC(token))
            } else {
                dispatch(getPackSorting(`0${ sortName }`))
                dispatch(getCardPacksTC())
            }
        }
        const setSortDown = () => {
            dispatch(setCardsCurrentPageAC(1))
            dispatch(setPacksCurrentPageAC(1))
            if(token) {
                dispatch(getCardsSorting(`1${ sortName }`))
                dispatch(getCardsTC(token))
            } else {
                dispatch(getPackSorting(`1${ sortName }`))
                dispatch(getCardPacksTC())
            }
        }
        return (
            <div>
                <button onClick={ setSortUp }>+</button>
                <button onClick={ setSortDown }>-</button>
            </div>
        )
    }

//types
type PropsType = {
    sortName: string
    token?: string
}
