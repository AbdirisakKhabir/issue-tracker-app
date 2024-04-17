'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import classNames from 'classnames';
import { AiFillBug } from "react-icons/ai";
import { useSession } from "next-auth/react";
import { Avatar, Box, Button, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes';
import Skeleton from 'react-loading-skeleton';



const NavBar = () => {
    

  return (
   <nav className='border-b mb-5 px-5 py-5'>
    <Container>
    <Flex justify="between">
        <Flex align="center" gap="3">
        <Link href="/"><AiFillBug /></Link>
        {/* CALL NAVIGATION LINKS HERE */}
        <NavLinks />
        </Flex>
    <AuthStatus />
        
    </Flex>
    
    </Container>
   
   </nav>
  )
}
// CREATE SUB COMPONENT OF NAVLINKS
const NavLinks = () =>{
    const currentPath = usePathname();
    

    
    const links = [
        { lebal: 'Dashoard', href: "/"},
        { lebal: 'Issues', href: "/issues/list"},
    ];
    return (
        <ul className='flex space-x-6 '>
            {links.map(link => 
            <li key={link.href}>
                <Link  className={classNames({

                    // GET THE NAV LIN CSS FROM GLOBAL.CSS
                    "nav-linl" : true,
                    '!text-zinc-900': link.href === currentPath,
                  
                })}
                href={link.href}>{link.lebal}</Link></li>
                )}
        </ul>
    )
    
}


// CREATE SUB COMPONENT
const AuthStatus = () => {
    // WE CREATE USE SESSION TO VALIDATE IF THE USER AUTHENTICATED, not authenticated or Loading
    const {status, data: session } = useSession();

    // Check the Status
    if(status === 'loading') return <Skeleton />;

    if(status === "unauthenticated")
        return <Link className='nav-link' href="/api/auth/signin">Login</Link>;

    // OTHERWISE RETURN
    return (
        <Box>
        {/* ADD HERE LOGIN AND LOGOUT LINKS  */}
       
              
                    <DropdownMenu.Root>
                    <DropdownMenu.Trigger>
                    <Avatar
                        src={session!.user!.image!}
                        fallback="A"
                        size="2"
                        className='cursor-pointer'
                        referrerPolicy='no-referrer'
                    />
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content>
                        <Text size="2">
                            {session!.user!.email}
                        </Text>
                        <DropdownMenu.Item>

                    <Link href="/api/auth/signout">Logout</Link>
                        </DropdownMenu.Item>
                    </DropdownMenu.Content>
                  </DropdownMenu.Root>
              
               

         
        </Box>

    )
   
}
export default NavBar
