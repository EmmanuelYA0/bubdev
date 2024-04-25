import { Skeleton } from "@/components/ui/skeleton"

export default function SkeletonCard() {
    return (
        <div className="grid justify-center">
            <div className="flex w-full max-w-xs flex-col self-center overflow-hidden rounded-3xl mb-12">
                <div className="relative mx-3 mt-3 flex h-60 rounded-2xl">
                    <Skeleton className="h-[260px] w-[250px] rounded-xl bg-slate-300" />
                </div>
                <div className="mt-4 px-5 pb-5">
                    <Skeleton className="h-8 mt-3 mb-5 w-[130px] bg-slate-300" />
                    <div className="mt-2 mb-5 ml-3 flex items-center justify-between">
                        <Skeleton className="h-4 w-[200px] bg-slate-300" />
                        <Skeleton className="h-4 w-[200px] bg-slate-300" />
                    </div>
                    <Skeleton className="h-10 w-[120px] mx-auto rounded-md bg-slate-300" />
                </div>
            </div>
        </div>
    )
}
