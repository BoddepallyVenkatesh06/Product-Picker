
import { ACCOUNT_TYPE } from './account-types';



export interface SidebarLink {
  id: number;
  name: string;
  path: string;
  icon: string;
  roles: ACCOUNT_TYPE[];
}



export const sidebarLinks: SidebarLink[] = [
  {
    id: 1,
    name: "My Profile",
    path: "/dashboard/profile",
    icon: "/assets/icons/profile-icon.png",
    roles: [ACCOUNT_TYPE.TEAM_MEMBER, ACCOUNT_TYPE.ADMIN],
  },
  {
    id: 2,
    name: "Create Product",
    path: "/dashboard/create-product",
    icon: "/assets/icons/create-product-icon.png",
    roles: [ACCOUNT_TYPE.TEAM_MEMBER, ACCOUNT_TYPE.ADMIN],
  },
  {
    id: 3,
    name: "All Products",
    path: "/dashboard/all-products",
    icon: "/assets/icons/products-icon.png",
    roles: [ACCOUNT_TYPE.TEAM_MEMBER, ACCOUNT_TYPE.ADMIN],
  },
  {
    id: 4,
    name: "My Submissions",
    path: "/dashboard/team-member/my-submissions",
    icon: "/assets/icons/submission-icon.png",
    roles: [ACCOUNT_TYPE.TEAM_MEMBER],
  },
  {
    id: 5,
    name: "Pending Requests",
    path: "/dashboard/admin/pending-requests",
    icon: "/assets/icons/watch-icon.png",
    roles: [ACCOUNT_TYPE.ADMIN],
  },
  {
    id: 6,
    name: "Server Side - All Products",
    path: "/dashboard/server-side-all-products",
    icon: "/assets/icons/products-icon.png",
    roles: [ACCOUNT_TYPE.TEAM_MEMBER, ACCOUNT_TYPE.ADMIN],
  },

];
