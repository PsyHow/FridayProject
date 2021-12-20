import { FC } from "react";
import { useDispatch } from "react-redux";
import { getSorting } from "../Table/CardPacks/CardPacksReducer";

export const Sorting:FC<PropsType> = ({ sortName }) => {
    const dispatch = useDispatch();

    const setSortUp = ()=> {
        dispatch(getSorting(`0${sortName}`))
    }
    const setSortDown = ()=> {
        dispatch(getSorting(`1${sortName}`))
    }
    return(
        <div>
            <button onClick={setSortUp}>+</button>
            <button onClick={setSortDown}>-</button>
        </div>
    )
}

//types
type PropsType = {
    sortName: string
}
