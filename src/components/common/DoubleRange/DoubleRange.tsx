import React from "react"
import { Slider } from "@mui/material";

type SuperDoubleRangePropsType = {
    onChangeRange?: (value: number | number[]) => void
    value?: number | number[]
    min:number
    max:number
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

    return (
        <>
            <Slider value={ value }
                    min={ restProps.min }
                    max={ restProps.max }
                    style={ { "width": "200px", "color": "#7676EE7D" } }
                    onChange={ onChangeCallback }
            />

        </>
    )
}