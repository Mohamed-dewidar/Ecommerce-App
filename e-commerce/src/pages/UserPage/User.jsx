import React from 'react';
import UserNav from '../../components/user/UserNav';
import CategoriesCards from '../../components/user/CategoriesCards';
import UserAbout from '../../components/user/UserAbout';
import RenewableEnergy from '../../components/user/RenewableEnergy';
import ContactUs from '../../components/user/ContactUs';
import Footer from '../../components/user/Footer';
import Products from '../../components/user/Products';
export default function User() {
  return (
    <div>
      <UserNav />
      <Products category="Electronics" />
      <UserAbout />
      <RenewableEnergy />
      <ContactUs />
      <Footer />
    </div>
  );
}
