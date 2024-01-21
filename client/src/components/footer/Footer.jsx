import React from "react";

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <div className="flex justify-center items-center py-2">
      <p>&copy; {currentYear} All Rights Reserved</p>
    </div>
  );
}

export default Footer;
