import {
   IconLogin, IconBook2, IconUserPlus, IconHome,IconBrandProducthunt,IconAccessible
} from '@tabler/icons';

import { uniqueId } from 'lodash';

const Menuitems = [
  {
    navlabel: true,
    subheader: 'Home'  
  },
  {
    id:uniqueId(),
    title: 'Home',
    icon: IconHome,
    href: '/home',
  },
  {
    id: uniqueId(),
    title: 'Products',
    icon: IconBrandProducthunt,
    href: '/products',
  },

  {
    id: uniqueId(),
    title: 'Book Register',
    icon: IconBook2,
    href: '/registerbook',
  },
  {
    id : uniqueId(),
    title: 'About us',
    icon: IconAccessible,
    href: '/aboutus',
  },
  
  {
    navlabel: true,
    subheader: 'Auth',
  },
  {
    id: uniqueId(),
    title: 'Login',
    icon: IconLogin,
    href: '/auth/login',
  },
  {
    id: uniqueId(),
    title: 'Register',
    icon: IconUserPlus,
    href: '/auth/register',
  },
  
];

export default Menuitems;
