import SuperInputText from "../Input/Input"
import Button from "../Button/Button";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getSearch } from "../Table/CardPacks/CardPacksReducer";

export const Search = () => {
    const dispatch = useDispatch();

    const [search, setSearch] = useState<string>('')

    const onChangeSearch = (value:string) => {
        setSearch(value)
    }
    const onSubmit = () => {
        dispatch(getSearch(search))
    }

    return (
        <div>
            <SuperInputText value={search} onChangeText={onChangeSearch}/>
            <Button onClick={onSubmit}>Search</Button>
        </div>
    )
}