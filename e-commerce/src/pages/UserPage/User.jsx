import React from 'react';
import UserNav from '../../components/user/UserNav';
import CategoriesCards from '../../components/user/CategoriesCards';
import UserAbout from '../../components/user/UserAbout';
import RenewableEnergy from '../../components/user/RenewableEnergy';
export default function User() {
  return (
    <div>
      <UserNav />
      <CategoriesCards />
      <UserAbout />
      <RenewableEnergy />
    </div>
  );
}
