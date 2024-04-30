import { TriangleAlert } from "lucide-react";

interface FormErrorProps {
    message?: string;
}
export function FormError({
    message,
}: FormErrorProps) {
    if(!message) return null;
    return (
      <div className=" bg-red-200 mt-4 p-3 rounded-md flex items-center gap-x-2 text-sm text-red-600 ">
        <TriangleAlert className=" h-4 w-4 bg-transparent" />
        <p className="bg-transparent">{message}</p>
      </div>
    )
}
