"use client"
import { useMutation } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { toast } from "sonner";

const Page = () => {
    const trpc = useTRPC();
    const invoke = useMutation(trpc.invoke.mutationOptions({
        onSuccess: () => {
            toast.success("Background event started")
        }
    }));

    return (
        <div>
            <Button
                disabled={invoke.isPending}
                onClick={() => invoke.mutate({ text: "Ak" })}
            >Invoke background job</Button>
        </div>
    )
}
export default Page;