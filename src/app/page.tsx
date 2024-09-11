'use client'

import { Button } from "@/components/ui/button";
import { UserButton } from "@/features/auth/components/user-button";
import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import { useMemo } from "react";

export default function Home() {
  const { workspacesData, isLoading } = useGetWorkspaces()
  const workspaceID = useMemo(() => {
    workspacesData?.[0]?._id
  }, [workspacesData])
  return (
    <div>
      <UserButton/>
    </div>
  );
}
