'use client'

import Image from 'next/image'
import Link from 'next/link'
import { IoMenu, IoClose } from 'react-icons/io5'
import Logo from '@/public/images/logo.png'
import { ConnectWallet } from '@/app/components/ConnectWallet'

interface NavbarProps {
  opened: boolean
  toggle: () => void
  pathname: string
  menu: { name: string; href: string; icon: React.ReactNode }[]
}

const Navbar: React.FC<NavbarProps> = ({
  opened,
  toggle,
  pathname,
  menu,
}) => {
  return (
    <header className="fixed top-0 left-0 z-40 w-full flex items-center justify-between bg-[#F3E4D4] md:bg-[#F3ECE3]">
      {/* Mobile menu + logo */}
      <div className="py-2 border-r border-gray-300 px-4 w-full md:w-58">
        <div className="flex justify-between items-center w-full md:gap-2 py-1 md:pl-3 md:bg-[#F3E4D4]">
          {/* Menu toggle (mobile) */}
          <div className="flex items-center gap-3 md:hidden order-2 md:order-1">
            <div className="flex items-center gap-4">
              <ConnectWallet variant="icon" />
            </div>
            <button className="cursor-pointer" onClick={toggle}>
              {opened ? <IoClose size={38} /> : <IoMenu size={38} />}
            </button>
          </div>

          {/* Logo */}
          <div className="flex gap-2 items-center order-1 md:order-2">
            <Link href="/" className="flex items-center ">
              <Image
                src={Logo}
                alt="Baby Crepe Logo"
                width={50}
                height={50}
                priority
              />
            </Link>
            <span className="text-[12px] font-bold font-poppins uppercase">
              BABYCREPE
            </span>
          </div>
        </div>
      </div>

      {/* Right side */}
      <div className="md:flex-1 hidden md:flex justify-between px-4 md:p-6">
        {/* Active menu name */}
        <div className="flex items-center gap-2 text-sm md:text-xl font-semibold capitalize text-button-bg">
          {menu.find((item) => item.href === pathname)?.icon}
          <span>
            {menu.find((item) => item.href === pathname)?.name || 'Dashboard'}
          </span>
        </div>

        {/* Wallet connection */}
        <div className="flex items-center gap-4">
          <ConnectWallet variant="icon" />
        </div>
      </div>
    </header>
  )
}

export default Navbar
