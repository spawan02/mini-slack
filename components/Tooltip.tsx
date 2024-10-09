import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from "./ui/button"
import { ReactNode, useRef } from "react"

interface toolTipProps {
    label: string,
    icon: ReactNode,
    handleFormat: any
}

const ToolComponent = ({ label, icon, handleFormat }: toolTipProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null)

    return (
        <div>
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
            {
                label === "Attach file" && (
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        onChange={(e) => {
                            // Handle file upload logic here
                            console.log('File selected:', e.target.files?.[0])
                        }}
                    />
                )
            }
        </div>
    )
}

export default ToolComponent