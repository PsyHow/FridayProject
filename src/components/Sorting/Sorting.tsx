import { FC } from "react";
import { useDispatch } from "react-redux";
import { getSorting, setCurrentPageAC } from "features/Packs/bll/CardPacksActions";

export const Sorting:FC<PropsType> = ({ sortName }) => {
    const dispatch = useDispatch();

    const setSortUp = ()=> {
        dispatch(getSorting(`0${sortName}`))
        dispatch(setCurrentPageAC(1))
    }
    const setSortDown = ()=> {
        dispatch(getSorting(`1${sortName}`))
        dispatch(setCurrentPageAC(1))
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
