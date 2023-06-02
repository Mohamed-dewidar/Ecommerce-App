import React from 'react';
import UserNav from '../../components/user/UserNav';
import SingleProduct from '../../components/user/SingleProduct';
import UserAbout from '../../components/user/UserAbout';
import RenewableEnergy from '../../components/user/RenewableEnergy';
import ContactUs from '../../components/user/ContactUs';
import Footer from '../../components/user/Footer';
export default function UserViewProduct() {
  return (
    <div>
      <UserNav />
      <SingleProduct />
      <UserAbout />
      <RenewableEnergy />
      <ContactUs />
      <Footer />
    </div>
  );
}
