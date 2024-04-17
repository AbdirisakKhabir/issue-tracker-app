import NextLink from 'next/link';
import { Link as RadixLink } from '@radix-ui/themes';

// Note NextLink is Link from next/link, we change the name because of same names
//  with Link Component that is why was changed the name 
interface Props {
    href: string;
    children: string;
}
const Link = ({href, children}: Props) => {
  return (
  <NextLink href={href} passHref legacyBehavior>
        <RadixLink>{children}</RadixLink>
    </NextLink>
  )
}

export default Link
