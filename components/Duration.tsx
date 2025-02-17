import {Clock11} from "lucide-react";
import React from "react";

interface IDurationProps {
    duration: number
    size: number
    textSize?: string
}

export const Duration: React.FC<IDurationProps> = ({duration, size, textSize}) => {
    return (
        <span className={`text-foreground ${textSize ? textSize : "text-sm"} flex gap-2 items-center`}>
            <Clock11 size={size} strokeWidth={2}/> {duration} min
        </span>
    )
}