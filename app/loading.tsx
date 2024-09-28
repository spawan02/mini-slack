import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <Skeleton className="h-[125px] w-[250px] rounded-xl" />
            <div className="space-y-2 py-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[250px]" />
            </div>
        </div>
    )
}