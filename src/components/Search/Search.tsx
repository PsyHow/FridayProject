import SuperInputText from "../common/Input/Input"
import Button from "../common/Button/Button";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { DoubleRange } from "../common/DoubleRange/DoubleRange";
import { getSearch, setMaxCardsCount, setMinCardsCount } from "../../features/Packs/bll/CardPacksActions";

export const Search = () => {
    const dispatch = useDispatch();

    const [search, setSearch] = useState<string>('')

    const onChangeSearch = (value:string) => {
        setSearch(value)
    }

    // double range
    const [value1, setValue1] = useState(0)
    const [value2, setValue2] = useState(103)

    const onChangeHandler = (values: number | number[]) => {
        if (Array.isArray(values)) {
            setValue1(values[0])
            setValue2(values[1])
        } else {
            setValue1(values)
        }
    }

    const onSubmit = () => {
        dispatch(getSearch(search))
        dispatch(setMinCardsCount(value1.toString()))
        dispatch(setMaxCardsCount(value2.toString()))
    }

    return (
        <div>
            <div style={ { display: "flex" } }>
                <span style={ { width: "50px" } }>{ value1 }</span>
                <DoubleRange
                    value={ [value1, value2] }
                    onChangeRange={ onChangeHandler }
                />
                <span style={ { marginLeft: "5%" } }>{ value2 }</span>
            </div>
            <SuperInputText value={search} onChangeText={onChangeSearch}/>
            <Button onClick={onSubmit}>Search</Button>
        </div>
    )
}