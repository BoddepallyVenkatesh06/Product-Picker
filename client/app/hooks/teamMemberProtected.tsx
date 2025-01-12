import { redirect } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";
import {ACCOUNT_TYPE} from '../constants/account-types'

interface ProtectedProps {
  children: React.ReactNode;
}

export default function TeamMemberProtected({ children }: ProtectedProps) {
  const { user } = useSelector((state: any) => state.auth);

  const isTeamMember = user?.accountType === ACCOUNT_TYPE.TEAM_MEMBER;

  return isTeamMember ? children : redirect("/");
}