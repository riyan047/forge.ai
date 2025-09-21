"use client"

import { Suspense, useState } from "react";

import { Fragment } from "@/generated/prisma";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from "@/components/ui/tabs";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup
} from "@/components/ui/resizable";

import { MessagesContainer } from "../components/messages-container";
import { ProjectHeader } from "../components/project-header";
import { FragmentWeb } from "../components/fragment-web";
import { FileExplorer } from "@/components/file-explorer";

import { EyeIcon, CodeIcon, CrownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Props {
    projectId: string
}

export const ProjectView = ({ projectId }: Props) => {
    const [activeFragment, setActiveFragment] = useState<Fragment | null>(null);
    const [tabState, setTabState] = useState<"preview" | "code">("preview");

    return (
        <div className="h-screen ">
            <ResizablePanelGroup direction="horizontal">
                <ResizablePanel
                    defaultSize={35}
                    minSize={20}
                    className="flex flex-col min-h-0 py-1"
                >
                    <Suspense fallback={<p>Loading project...</p>}>

                        <ProjectHeader projectId={projectId} />
                    </Suspense>
                    <Suspense fallback={<p>Loading messages...</p>}>
                        <MessagesContainer
                            projectId={projectId}
                            activeFragment={activeFragment}
                            setActiveFragment={setActiveFragment}
                        />
                    </Suspense>
                </ResizablePanel>
                <ResizableHandle className="hover:bg-primary transition-colors" />
                <ResizablePanel
                    defaultSize={65}
                    minSize={50}

                >
                    <Tabs
                        className="h-full gap-y-0"
                        defaultValue="preview"
                        value={tabState}
                        onValueChange={(value) => setTabState(value as "preview" | "code")}

                    >
                        <div className="w-full flex items-center p-2 border-b gap-x-2">
                            <TabsList className="flex gap-1 border rounded-md p-1 bg-muted">
                                <TabsTrigger
                                    value="preview"
                                    className="flex items-center gap-1 px-3 py-1 rounded-md data-[state=active]:bg-white"
                                >
                                    <EyeIcon className="w-4 h-4" />
                                    <span>Demo</span>
                                </TabsTrigger>
                                <TabsTrigger
                                    value="code"
                                    className="flex items-center gap-1 px-3 py-1 rounded-md data-[state=active]:bg-white"
                                >
                                    <CodeIcon className="w-4 h-4" />
                                    <span>Code</span>
                                </TabsTrigger>
                            </TabsList>

                            <div className="flex ml-auto items-center gap-x-2">
                                <Button asChild
                                    size="sm"
                                    variant="tertiary"
                                >
                                    <Link href="/pricing">
                                        <CrownIcon />Upgrade
                                    </Link>
                                </Button>
                            </div>
                        </div>
                        <TabsContent value="preview">
                            {!!activeFragment && <FragmentWeb data={activeFragment} />}
                        </TabsContent>
                        <TabsContent value="code" className="min-h-0">
                            {activeFragment?.files && (
                                <FileExplorer
                                    files={activeFragment.files as { [path: string]: string }}
                                />
                            )}
                        </TabsContent>
                    </Tabs>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    )
}