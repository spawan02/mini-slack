import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from "./ui/button"
import { ReactNode } from "react"

interface toolTipProps {
    label: string,
    icon: ReactNode
}
const handleFormat = (label: string) => {

}
const ToolComponent = ({ label, icon }: toolTipProps) => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" onClick={() => handleFormat(label)} >
                        {icon}
                    </Button>
                </TooltipTrigger>
                <TooltipContent>{label}</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export default ToolComponent