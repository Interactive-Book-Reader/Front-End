import {
   IconLogin, IconUserPlus, IconHome,IconAccessible,IconBadgeAd,IconCards,IconBuildingStore
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
    title: 'Add Admin',
    icon: IconBadgeAd,
    href: '/admin/addadmin',
  },
  {
    id : uniqueId(),
    title: 'Customer',
    icon: IconCards,
    href: '/admin/customers',
  },
  {
    id : uniqueId(),
    title: 'Publisher',
    icon: IconBuildingStore,
    href: '/admin/publisher',
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
