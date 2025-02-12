import Logo from "../assets/fav-icon.png";

const Footer = () => {
  return (
    // <footer className="w-11/12 mx-auto">
    //   <div className="footer p-10 rounded-t-xl lg:flex items-center justify-between">
    //     {/* Services Section */}
    //     <nav>
    //       <h6 className="footer-title">Services</h6>
    //       <Link to="/services/counseling" className="link link-hover">
    //         Counseling
    //       </Link>
    //       <Link to="/services/job-support" className="link link-hover">
    //         Job Support
    //       </Link>
    //       <Link to="/services/pricing" className="link link-hover">
    //         Pricing
    //       </Link>
    //       <Link to="/services/skills" className="link link-hover">
    //         Skills
    //       </Link>

    //     </nav>

    //     {/* Company Section */}
    //     <nav>
    //       <h6 className="footer-title">Company</h6>
    //       <Link to="/about" className="link link-hover">
    //         About Us
    //       </Link>
    //       <Link to="/contact" className="link link-hover">
    //         Contact
    //       </Link>
    //       <Link to="/jobs" className="link link-hover">
    //         Jobs
    //       </Link>
    //       <Link to="/press" className="link link-hover">
    //         Press Kit
    //       </Link>
    //     </nav>

    //     {/* Resources Section */}
    //     <nav>
    //       <h6 className="footer-title">Resources</h6>
    //       <Link to="/programs" className="link link-hover">
    //         Programs
    //       </Link>
    //       <Link to="/blogs" className="link link-hover">
    //         Blog
    //       </Link>
    //       <Link to="/privacy-policy" className="link link-hover">
    //         Privacy Policy
    //       </Link>
    //       <Link to="/terms-and-conditions" className="link link-hover">
    //         Terms & Conditions
    //       </Link>
    //     </nav>

    //     {/* Social Media Section */}
    //     <nav>
    //       <h6 className="footer-title">Follow Us</h6>
    //       <div className="grid grid-flow-col gap-4">
    //         <a
    //           href="https://twitter.com/tutorhunt"
    //           target="_blank"
    //           rel="noopener noreferrer"
    //         >
    //           <svg
    //             xmlns="http://www.w3.org/2000/svg"
    //             width="24"
    //             height="24"
    //             viewBox="0 0 24 24"
    //             className="fill-current"
    //           >
    //             <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
    //           </svg>
    //         </a>
    //         <a
    //           href="https://youtube.com/tutorhunt"
    //           target="_blank"
    //           rel="noopener noreferrer"
    //         >
    //           <svg
    //             xmlns="http://www.w3.org/2000/svg"
    //             width="24"
    //             height="24"
    //             viewBox="0 0 24 24"
    //             className="fill-current"
    //           >
    //             <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
    //           </svg>
    //         </a>
    //         <a
    //           href="https://facebook.com/tutorhunt"
    //           target="_blank"
    //           rel="noopener noreferrer"
    //         >
    //           <svg
    //             xmlns="http://www.w3.org/2000/svg"
    //             width="24"
    //             height="24"
    //             viewBox="0 0 24 24"
    //             className="fill-current"
    //           >
    //             <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
    //           </svg>
    //         </a>
    //       </div>
    //     </nav>
    //   </div>
    //   {/* Copyright Section */}
    //   <div className="footer footer-center p-4 rounded-b-xl">
    //     <aside>
    //       <div className="font-semibold text-center">
    //         Copyright © {new Date().getFullYear()} - All rights reserved by{" "}
    //         Tutor<span className="text-primary">Hunt</span>.
    //         <br />
    //         <p className="text-secondary mt-2">Powered by Rownak</p>
    //       </div>
    //     </aside>
    //   </div>
    // </footer>
    <footer className="footer footer-center gap-4 px-4 lg:px-6">
      <aside className="pt-10">
        <img src={Logo} alt="" className="brightness-75"/>
        <p className="font-bold">
          Tutor Hunt Ltd.
          <br />
          Providing reliable services since 2024
        </p>
        <p className="font-semibold">
          Copyright © {new Date().getFullYear()} - All rights reserved by Tutor
          <span className="text-primary">Hunt</span>
        </p>
        <p className="text-secondary">Powered by Rownak</p>
      </aside>
      <nav>
        <div className="grid grid-flow-col gap-4 pb-6">
          <a href="https://x.com" target="_blank">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
            </svg>
          </a>
          <a href="https://www.youtube.com" target="_blank">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
            </svg>
          </a>
          <a href="https://www.facebook.com" target="_blank">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
            </svg>
          </a>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
