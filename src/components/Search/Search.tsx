import SuperInputText from "../common/Input/Input"
import Button from "../common/Button/Button";
import React, { memo, useState } from "react";
import { useDispatch } from "react-redux";
import { DoubleRange } from "../common/DoubleRange/DoubleRange";
import {
    getSearch,
    setMaxItemsCount,
    setMinItemsCount,
} from "features/Packs/bll/CardPacksActions";
import style from "./Search.module.css";
import { setCurrentPageAC } from "bll/paginatorReducer/paginatorActions";

export const Search = memo(({ min, max, defaultMin, defaultMax }: PropsType) => {
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
        dispatch(getSearch(search))
        dispatch(setMinItemsCount(value1.toString()))
        dispatch(setMaxItemsCount(value2.toString()))
        dispatch(setCurrentPageAC(1))
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
})

//types
type PropsType = {
    min: number
    max: number
    defaultMin:number
    defaultMax:number
}