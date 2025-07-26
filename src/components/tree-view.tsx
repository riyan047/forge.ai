import { TreeItem } from "@/types";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarProvider,
    SidebarRail
} from "@/components/ui/sidebar"
import { ChevronRightIcon, FileIcon, FolderIcon } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { cn } from "@/lib/utils";



interface TreeViewProps {
    data: TreeItem[];
    value?: string | null;
    onSelect?: (value: string) => void
}

export const TreeView = ({
    data,
    value,
    onSelect
}: TreeViewProps) => {
    return (
        <SidebarProvider>
            <Sidebar collapsible="none" className="w-full">
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {data.map((item, index) => (
                                    <Tree
                                        key={index}
                                        item={item}
                                        selectedValue={value}
                                        onSelect={onSelect}
                                        parentPath=""
                                    />
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
                <SidebarRail />
            </Sidebar>
        </SidebarProvider>
    )
}

interface TreeProps {
    item: TreeItem;
    selectedValue?: string | null;
    onSelect?: (value: string) => void;
    parentPath: string
}

const Tree = ({
    item,
    selectedValue,
    onSelect,
    parentPath,
}: TreeProps) => {

    const [name, ...items] = Array.isArray(item) ? item : [item];
    const currentPath = parentPath ? `${parentPath}/${name}` : name;

    if (!items.length) {
        // file
        const isSelected = selectedValue === currentPath;
        return (
            <SidebarMenuButton
                isActive={isSelected}
                className={cn(
                    "cursor-pointer rounded-md px-2 py-1",
                    "data-[active=true]:bg-accent data-[active=true]:text-accent-foreground",
                    "data-[active=true]:shadow-inner"
                )}
                onClick={() => onSelect?.(currentPath)}
            >
                <FileIcon className="w-4 h-4" />
                <span>{name}</span>
            </SidebarMenuButton>

        )
    }

    // folder
    return (
        <SidebarMenuItem>
            <Collapsible
                className="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90"
                defaultOpen
            >
                <CollapsibleTrigger asChild>
                    <SidebarMenuButton className="cursor-pointer">
                        <ChevronRightIcon className="transition-transform" />
                        <FolderIcon />
                        <span className="truncate">
                            {name}
                        </span>
                    </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <SidebarMenuSub >
                        {items.map((subItem, index) => (
                            <Tree
                                key={index}
                                item={subItem}
                                selectedValue={selectedValue}
                                onSelect={onSelect}
                                parentPath={currentPath}
                            />
                        ))}
                    </SidebarMenuSub>
                </CollapsibleContent>
            </Collapsible>
        </SidebarMenuItem>
    )

}