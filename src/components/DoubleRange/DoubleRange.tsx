import React from "react"
import { Slider } from "@mui/material";
import { useSelector } from "react-redux";
import { AppRootStoreType } from "../../bll/Store";

type SuperDoubleRangePropsType = {
    onChangeRange?: (value: number | number[]) => void
    value?: number | number[]
}

export const DoubleRange: React.FC<SuperDoubleRangePropsType> = (
    {
        onChangeRange, value,
        ...restProps
    },
) => {
    const onChangeCallback = (e: Event, value: number | number[]) => {
        onChangeRange && onChangeRange(value)
    }

    const min = useSelector<AppRootStoreType, number>(state => state.cards.minCardsCount)
    const max = useSelector<AppRootStoreType, number>(state => state.cards.maxCardsCount)


    return (
        <>
            <Slider value={ value }
                    min={ min }
                    max={ max }
                    style={ { "width": "200px" } }
                    onChange={ onChangeCallback }
            />

        </>
    )
}
