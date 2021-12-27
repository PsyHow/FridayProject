import SuperInputText from "../Input/Input"
import Button from "../Button/Button";
import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { DoubleRange } from "../DoubleRange/DoubleRange";
import {
    getPackSearch,
    setMinMaxCardsPackCount,
} from "features/Packs/bll/CardPacksActions";
import style from "./Search.module.css";
import { setCurrentPageAC } from "components/common/Paginator/paginatorActions";
import {
    getCardsSearch,
    setMinMaxCardsCountAC,
} from "../../../features/Cards/bll/cardsActions";
import { getCardsTC } from "../../../features/Cards/bll/cardsThunks";
import { getCardPacksTC } from "../../../features/Packs/bll/CardPacksThunk";

export const Search: FC<PropsType> =
    ({ min, max, defaultMin, defaultMax, token }) => {
        const dispatch = useDispatch();
        const [search, setSearch] = useState<string>('')


        const onChangeSearch = (value: string) => {
            setSearch(value)
        }

        // double range
        const [value1, setValue1] = useState(min)
        const [value2, setValue2] = useState(max)


        const onChangeHandler = (values: number | number[]) => {
            if(Array.isArray(values)) {
                setValue1(values[0])
                setValue2(values[1])
            } else {
                setValue1(values)
            }
        }

        const onSubmit = () => {
            dispatch(setCurrentPageAC(1))
            if(token) {
                dispatch(setMinMaxCardsCountAC(value1, value2))
                dispatch(getCardsSearch(search))
                dispatch(getCardsTC(token))
            } else {
                dispatch(setMinMaxCardsPackCount(value1, value2))
                dispatch(getPackSearch(search))
                dispatch(getCardPacksTC())
            }
        }

        return (
            <div className={ style.searchBox }>
                <div className={ style.range } style={ { display: "flex" } }>
                    <span style={ { width: "50px" } }>{ value1 }</span>
                    <DoubleRange
                        min={ defaultMin }
                        max={ defaultMax }
                        value={ [value1, value2] }
                        onChangeRange={ onChangeHandler }
                    />
                    <span style={ { marginLeft: "5%" } }>{ value2 }</span>
                </div>
                <SuperInputText value={ search } onChangeText={ onChangeSearch }/>
                <Button onClick={ onSubmit }>Search</Button>
            </div>
        )
    }

//types
type PropsType = {
    min: number
    max: number
    defaultMin: number
    defaultMax: number
    token?: string
}