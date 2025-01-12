'use client'

import { ReactNode, useState } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ACCOUNT_TYPE } from './../../constants/account-types'
import { sidebarLinks, SidebarLink } from './../../constants/sidebar'
import Header from '../Header'
import Heading from '../../utils/Heading'
import Protected from "../../hooks/useProtectedRoute"
import Image from 'next/image';


interface LayoutProps {
  children: ReactNode;
  userRole: string;
}

const Layout = ({ children, userRole }: LayoutProps) => {
  const router = useRouter()
  const { user } = useSelector((state: any) => state.auth)
  const [open, setOpen] = useState(false)
  const [activeItem, setActiveItem] = useState(0)
  const [route, setRoute] = useState("")

  const filteredLinks = sidebarLinks.filter((link: SidebarLink) => link.roles.includes(userRole as ACCOUNT_TYPE));

  // console.log("filteredLinks =", filteredLinks)



  return (
    <Protected>


      <main className="flex-1 ">
        <Heading
          title={`${user?.name} Dashboard`}
          description="Product Picker is platform for ..."
          keywords="sofa, table, tea table, "
        />

        {/* navbar */}
        <Header
          setOpen={setOpen}
          open={open}
          activeItem={activeItem}
          route={route}
          setRoute={setRoute}
        />

      </main>

      <div className="flex">
        <aside className="min-w-60 p-1 bg-white/25 dark:bg-black/15 text-black dark:text-white border-r border-black/30 dark:border-white/20 ">
          <ul className='flex flex-col items-center'>
            {filteredLinks.map((link: SidebarLink) => (
              <Link
                key={link.id}
                href={link.path}
                className={`w-full h-full my-2 p-3 hover:dark:bg-white/15 hover:dark:text-white hover:bg-black/10 duration-200`}>
                <li className="flex items-center gap-5">
                  <Image
                    className="cursor-pointer object-contain"
                    src={link.icon}
                    width={30}
                    height={30}
                    alt={link.name}
                  />

                  <p className="flex items-center">
                    <span>{link.name}</span>
                  </p>
                </li>
              </Link>
            ))}
          </ul>
        </aside>

        <div className='max-h-screen w-full overflow-auto'>
                {children}
        </div>
      </div>

    </Protected>
  );
};

export default Layout;
