"use client"
import { useMutation, useQuery } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { toast } from "sonner";
import { useState } from "react";
import { Input } from "@/components/ui/input";

const Page = () => {
    const [value, setValue] = useState("");
    const trpc = useTRPC();
    const { data: messages } = useQuery(trpc.messages.getMany.queryOptions())
    const createMessage = useMutation(trpc.messages.create.mutationOptions({
        onSuccess: () => {
            toast.success("Background event started")
        }
    }));

    return (
        <div>
            <Input value={value} onChange={(e) => setValue(e.target.value)} />
            <Button
                disabled={createMessage.isPending}
                onClick={() => createMessage.mutate({ value: value })}
            >Invoke background job</Button>
            {JSON.stringify(messages, null, 2)}
        </div>
    )
}
export default Page;