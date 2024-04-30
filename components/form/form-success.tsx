import { CircleCheck } from "lucide-react";

interface FormSuccessProps {
    message?: string;
}
export function FormSuccess ({
    message,
}: FormSuccessProps) {
    if(!message) return null;
    return (
      <div className=" bg-emerald-200 mt-4 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-600 ">
        <CircleCheck className=" h-4 w-4 bg-transparent" />
        <p className="bg-transparent">{message}</p>
      </div>
    )
}
