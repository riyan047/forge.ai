"use client"
import { useMutation } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { toast } from "sonner";
import { useState } from "react";
import { Input } from "@/components/ui/input";

const Page = () => {
    const [value, setValue] = useState("");
    const trpc = useTRPC();
    const invoke = useMutation(trpc.invoke.mutationOptions({
        onSuccess: () => {
            toast.success("Background event started")
        }
    }));

    return (
        <div>
            <Input value={value} onChange={(e) => setValue(e.target.value)} />
            <Button
                onClick={() => invoke.mutate({ value: value })}
            >Invoke background job</Button>
        </div>
    )
}
export default Page;