"use client"

import { signOut } from 'next-auth/react';
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { IoMenu } from "react-icons/io5";
import { IoCloseSharp } from "react-icons/io5";

const Navbar = () => {
    const pathname = usePathname()

    return (
        <header className='flex items-center px-4 md:px-12 md:py-2 py-6 justify-between fixed top-0 w-full z-50 shadow bg-white h-'>
            <Link href={"/"} className='md:w-96 w-24'>
                <Image src={"/next.svg"} alt='Image of logo' width={150} height={40} priority />
            </Link>

            <div className='items-center gap-x-4 hidden md:block'>
                <Link href={"/"} className={`link mr-5  ${pathname === '/' ? 'text-green-400' : ''}`}>
                    Home Page
                </Link>
                <Link href={"/products"} className={`link mr-5 ${pathname === '/products' ? 'text-green-400' : ''}`}>
                    Products Page
                </Link>
                <Link href={"/contact"} className={`link mr-5    ${pathname === '/contact' ? 'text-green-400' : ''}`}>
                    Contact
                </Link>
                <Link href={'/shopping-cart'} >
                    <button className='bg-sky-600 text-white px-10 py-3 rounded hover:bg-transparent hover:text-black border hover:border-sky-500 transition duration-200 ease'>
                        My bag
                    </button>
                </Link>
                <button className='ml-3 bg-red-600 px-3 py-2 text-white rounded-md' onClick={() => signOut()}>Sign Out</button>
            </div>
            <div className='md:hidden flex'>
                <IoMenu className='w-10 h-10' />
                <IoCloseSharp className='w-10 h-10 hidden' />
            </div>
        </header>
    )
}

export default Navbar