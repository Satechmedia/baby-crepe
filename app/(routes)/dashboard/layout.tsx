'use client'

import { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { Drawer } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import Navbar from '@/app/components/Navbar'
import { ConnectWallet } from '@/app/components/ConnectWallet'
import { useAdmin } from '@/app/hooks/useAdmin'
import { FaExchangeAlt, FaTelegram } from 'react-icons/fa'
import { MdOutlineBarChart, MdAdminPanelSettings } from 'react-icons/md'
import { RiSettingsLine } from 'react-icons/ri'
import { SlEarphones } from 'react-icons/sl'
import { FaXTwitter } from 'react-icons/fa6'
import '@mantine/core/styles.css'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [opened, { close, toggle }] = useDisclosure(false)
  const { isAdmin } = useAdmin()

  const menu = [
    {
      name: 'market',
      href: '/dashboard/market',
      icon: <MdOutlineBarChart size={24} />,
    },

    {
      name: 'on chain',
      href: '/dashboard/on-chain',
      icon: <RiSettingsLine size={24} />,
    },
        {
      name: 'dust converter',
      href: '/dashboard/dust-converter',
      icon: <FaExchangeAlt size={24} />,
    },
    // Admin menu item - only shown to admins
    ...(isAdmin
      ? [
          {
            name: 'admin',
            href: '/dashboard/admin',
            icon: <MdAdminPanelSettings size={24} />,
          },
        ]
      : []),
  ]

  const sidebarContent = (
    <div className="flex flex-col space-y-8 py-12 px-4">
      {menu.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className={`flex items-center gap-2 px-4 py-2 text-xs md:text-sm rounded-md transition-colors capitalize ${
            pathname === item.href
              ? 'bg-button-bg/40 font-bold'
              : 'hover:bg-button-bg/20'
          }`}
          onClick={close}
        >
          {item.icon}
          {item.name}
        </a>
      ))}
      <div className="mt-20">
        <div className="flex items-center gap-2 px-4 py-2 text-xs md:text-sm rounded-md hover:bg-button-bg/20 cursor-pointer">
          <SlEarphones size={16} /> <span>Support</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2">
          <a href="https://x.com/babycrepebnb" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
            <FaXTwitter size={16} />
          </a>
          <a href="https://t.me/BABYCREPE" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
            <FaTelegram size={16} />
          </a>
          {/* <a href="https://telegram.org" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
            <FaTelegram size={16} />
          </a> */}
        </div>
      </div>
      <div className="flex items-center gap-4">
        <ConnectWallet variant="button" dropdownPosition="left" />
      </div>
    </div>
  )

  return (
    <div className="w-full h-screen bg-background flex flex-col relative overflow-x-hidden">
      {/* ✅ Navbar */}
      <Navbar
        opened={opened}
        toggle={toggle}
        pathname={pathname}
        menu={menu}
      />

      <div className="md:flex md:flex-1 mt-20 min-h-[calc(100vh-80px)] relative overflow-x-hidden">
        {/* Drawer (mobile) */}
        <Drawer
          opened={opened}
          onClose={close}
          withCloseButton={false}
          withinPortal={false}
          zIndex={1000}
          overlayProps={{ opacity: 0.4, blur: 2 }}
          size="xs"
          styles={{
            content: {
              backgroundColor: '#F3E4D4',
              width: '75%',
              maxWidth: '280px',
              maxHeight: 'calc(100vh - 80px)',
              marginTop: '80px',
              borderTopRightRadius: '5px',
              borderBottomRightRadius: '5px',
            },
          }}
          className="md:hidden  z-50"
        >
          {sidebarContent}
        </Drawer>

        {/* Sidebar (desktop) */}
        <aside className="hidden md:flex w-58 flex-col border-r border-gray-300 h-full fixed top-20 left-0 z-30">
          {sidebarContent}
        </aside>

        {/* Main content */}
        <main className="flex-1 h-full px-4 md:px-6 py-4 overflow-y-auto ml-0 md:ml-58">
          {children}
        </main>
      </div>
    </div>
  )
}
