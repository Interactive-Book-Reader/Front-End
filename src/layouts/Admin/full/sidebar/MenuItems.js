import {
   IconLogin, IconUserPlus, IconHome,IconAccessible
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
    href: '/admin/home',
  },
  {
    id : uniqueId(),
    title: 'About us',
    icon: IconAccessible,
    href: '/admin/aboutus',
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
