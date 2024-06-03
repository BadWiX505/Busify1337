"use client";
import {
  IoStarOutline,
  IoCloseOutline,
  IoLogoInstagram,
  IoLogoFacebook,
  IoLogoTwitter,
  IoMenuOutline,
  IoBusOutline,
  IoWifiOutline,
  IoTimeOutline,
  IoSyncOutline,
} from "react-icons/io5";
import { MdChairAlt } from "react-icons/md";
import { FaRegMoon } from "react-icons/fa";
import { useEffect, useState } from "react";
// import Image from "next/image";
import "../styles/general.css";
import "../styles/style.css";
import "../styles/queries.css";
import { useRouter } from "next/navigation";
export default function Home() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [navOpen, setNavOpen] = useState(false);
  const router = useRouter();

  const toggleNav = () => {
    setNavOpen(!navOpen);
  };

  useEffect(() => {
    const checkFlexGap = () => {
      const flex = document.createElement("div");
      flex.style.display = "flex";
      flex.style.flexDirection = "column";
      flex.style.rowGap = "1px";
      flex.appendChild(document.createElement("div"));
      flex.appendChild(document.createElement("div"));
      document.body.appendChild(flex);
      const isSupported = flex.scrollHeight === 1;
      flex.parentNode.removeChild(flex);
      if (!isSupported) document.body.classList.add("no-flexbox-gap");
    };
    checkFlexGap();

    const sectionHeroEl = document.querySelector(".section-hero");

    const obs = new IntersectionObserver(
      (entries) => {
        const ent = entries[0];

        if (ent.isIntersecting === false) {
          document.body.classList.add("sticky");
        }

        if (ent.isIntersecting === true) {
          document.body.classList.remove("sticky");
        }
      },
      {
        root: null,
        threshold: 0,
        rootMargin: "-80px",
      }
    );
    obs.observe(sectionHeroEl);
  }, []);
  const smoothScroll = (event) => {
    event.preventDefault();
    const targetId = event.currentTarget.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: "smooth",
      });
    }
  };
  const handleTryForFreeClick = (event) => {
    event.preventDefault();
    router.push("/login");
  };

  return (
    <>
      <header
        className={`header ${navOpen ? "nav-open" : ""}`}
        style={{
          backgroundColor: "#fff",
          // color: "#BBB",
        }}
      >
        <a href="#">
          <h1 className="logo font-bold text-[24px]">.Busify</h1>
        </a>

        <nav className={`main-nav ${navOpen ? "open" : ""}`}>
          <ul className="main-nav-list">
            <li>
              <a
                className="main-nav-link text-[#7c8698]"
                href="#how"
                onClick={smoothScroll}
              >
                How it works
              </a>
            </li>
            <li>
              <a className="main-nav-link" href="#bus" onClick={smoothScroll}>
                Bus
              </a>
            </li>

            <li>
              <a
                className="main-nav-link"
                href="#features"
                onClick={smoothScroll}
              >
                Features
              </a>
            </li>
            <li>
              <a
                className="main-nav-link nav-cta"
                style={{
                  backgroundColor: "#22c55e",
                }}
                href="/login"
              >
                Try for free
              </a>
            </li>
          </ul>
        </nav>

        <button className="btn-mobile-nav" onClick={toggleNav}>
          {navOpen ? (
            <IoCloseOutline className="icon-mobile-nav" />
          ) : (
            <IoMenuOutline className="icon-mobile-nav" />
          )}
        </button>
      </header>

      <main>
        <section className="section-hero" style={{ backgroundColor: "#fff" }}>
          <div className="hero">
            <div className="hero-text-box">
              <h1 className="heading-primary">
                A convenient ride to your destination, every single day.
              </h1>
              <p className="hero-description">
                The smart 365-day-per-year transportation service tailored to
                your needs. Powered by{" "}
                <span className="text-green-500 font-bold">Busify</span>, your
                ultimate booking platform for hassle-free travel
              </p>
              <a href="/login" className="btn btn--full margin-right-sm">
                Start your Journey
              </a>
              <a href="#how" className="btn btn--outline">
                Learn more &darr;
              </a>
              <div className="delivered-meals">
                <div className="delivered-imgs">
                  <img
                    src="/img/customers/customer-1.jpg"
                    alt="Customer photo"
                  />
                  <img
                    src="/img/customers/customer-2.jpg"
                    alt="Customer photo"
                  />
                  <img
                    src="/img/customers/customer-3.jpg"
                    alt="Customer photo"
                  />
                  <img
                    src="/img/customers/customer-6.jpg"
                    alt="Customer photo"
                  />
                  <img
                    src="/img/customers/customer-4.jpg"
                    alt="Customer photo"
                  />
                  <img
                    src="/img/customers/customer-5.jpg"
                    alt="Customer photo"
                  />
                </div>
                <p className="delivered-text">
                  <span>Free rides</span> provided to 1337 students!
                </p>
              </div>
            </div>
            <div className="hero-img-box">
              <img
                src="/img/logos2.png"
                className="hero-img"
                alt="Woman enjoying food, meals in storage container, and food bowls on a table"
              />
            </div>
          </div>
        </section>

        <section className="section-featured">
          <div className="container">
            <h2 className="heading-featured-in">As featured in</h2>
            <div className="logos">
              <img src="img/42.png" alt="42 Netwrok logo" />
              <img src="img/1337.png" alt="1337 logo" />
              <img src="img/ocp.png" alt="OCP logo" />
            </div>
          </div>
        </section>

        <section id="how" className="section-how">
          <div className="container">
            <span className="subheading">How it works</span>
            <h2 className="heading-secondary">
              Your Journey in 3 simple steps
            </h2>
          </div>

          <div className="container grid grid--2-cols grid--center-v">
            {/* <!-- STEP 01 --> */}
            <div className="step-text-box">
              <p className="step-number">01</p>
              <h3 className="heading-tertiary">Choose Your Destination</h3>
              <p className="step-description">
                Select your desired destination, date, and time with ease. Our
                intuitive platform allows you to quickly find the best routes
                and schedules to plan your journey.
              </p>
            </div>

            <div className="step-img-box">
              <img
                // src="img/app/app-screen-1.png"
                src="img/HowitWorks(main)1.png"
                className="step-img"
                alt="iPhone app
            preferences selection screen"
                style={{
                  width: "75%",
                }}
              />
            </div>

            {/* <!-- STEP 02 --> */}
            <div className="step-img-box">
              <img
                // src="img/app/app-screen-2.png"
                src="img/HowitWorks(ticket)2.png"
                className="step-img"
                alt="iPhone app
            meal approving plan screen"
                style={{
                  width: "90%",
                  opacity: "0.9",
                }}
              />
            </div>
            <div className="step-text-box">
              <p className="step-number">02</p>
              <h3 className="heading-tertiary">Get Your Tickets</h3>
              <p className="step-description">
                After selecting your trip details, proceed to secure your seat.
                You will receive instant confirmation and your tickets will be
                ready for your upcoming adventure.
              </p>
            </div>

            {/* <!-- STEP 03 --> */}
            <div className="step-text-box">
              <p className="step-number">03</p>
              <h3 className="heading-tertiary">Enjoy Your Ride in the Bus</h3>
              <p className="step-description">
                it back and relax as you enjoy your ride in our comfortable
                buses. Breathe in the fresh air and take in the scenic views.
                With our top-notch service, your journey will be a delightful
                experience.
              </p>
            </div>
            <div className="step-img-box">
              <img
                src="img/EnjoyYourRide-removebg-preview.png"
                className="step-img"
                alt="iPhone app
            delivery screen"
                style={{
                  width: "90%",
                }}
              />
            </div>
          </div>
        </section>

        <section id="bus" className="section-meals">
          <div className="container center-text">
            <span className="subheading">BUS</span>
            <h2 className="heading-secondary">
              We have got the best buses in town
            </h2>
          </div>

          <div className="container grid grid--3-cols margin-bottom-md">
            <div className="meal">
              <img
                src="img/bigBG.jpg"
                className="meal-img"
                alt="Avocado Salad"
              />
              <div className="meal-content">
                <div className="meal-tags">
                  <span className="tag tag--vegetarian">1337 BUS</span>
                </div>
                <p className="meal-title">1337 Bus </p>
                <ul className="meal-attributes">
                  <li className="meal-attribute">
                    <MdChairAlt className="meal-icon" />

                    <span>
                      <strong>50</strong> seats
                    </span>
                  </li>
                  <li className="meal-attribute">
                    <FaRegMoon className="meal-icon" />

                    <span>Night Shift</span>
                  </li>
                  <li className="meal-attribute">
                    <IoStarOutline className="meal-icon" />

                    <span>
                      <strong>4.8</strong> rating (441)
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="meal">
              <img
                src="img/bigBG.jpg"
                className="meal-img"
                alt="Avocado Salad"
              />
              <div className="meal-content">
                <div className="meal-tags">
                  <span className="tag tag--vegetarian">1337 BUS</span>
                </div>
                <p className="meal-title">1337 Bus </p>
                <ul className="meal-attributes">
                  <li className="meal-attribute">
                    <MdChairAlt className="meal-icon" />

                    <span>
                      <strong>40</strong> seats
                    </span>
                  </li>
                  <li className="meal-attribute">
                    <FaRegMoon className="meal-icon" />

                    <span>Night Shift</span>
                  </li>
                  <li className="meal-attribute">
                    <IoStarOutline className="meal-icon" />

                    <span>
                      <strong>4.8</strong> rating (441)
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="meal">
              <img
                src="img/bigBG.jpg"
                className="meal-img"
                alt="Avocado Salad"
              />
              <div className="meal-content">
                <div className="meal-tags">
                  <span className="tag tag--vegetarian">1337 BUS</span>
                </div>
                <p className="meal-title">1337 Bus </p>
                <ul className="meal-attributes">
                  <li className="meal-attribute">
                    <MdChairAlt className="meal-icon" />

                    <span>
                      <strong>35</strong> seats
                    </span>
                  </li>
                  <li className="meal-attribute">
                    <FaRegMoon className="meal-icon" />

                    <span>Night Shift</span>
                  </li>
                  <li className="meal-attribute">
                    <IoStarOutline className="meal-icon" />

                    <span>
                      <strong>4.8</strong> rating (441)
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="section-features">
          <div className="container">
            <span className="subheading">Features</span>
            <h2 className="heading-secondary">Enjoy the Best Bus Experience</h2>
          </div>

          <div className="container grid grid--4-cols">
            <div className="feature">
              <IoBusOutline className="feature-icon" />
              <p className="feature-title">Comfortable Rides</p>
              <p className="feature-text">
                Enjoy comfortable seats and a smooth ride to your destination.
              </p>
            </div>
            <div className="feature">
              <IoWifiOutline className="feature-icon" />

              <p className="feature-title">Free Wi-Fi</p>
              <p className="feature-text">
                Stay connected with free Wi-Fi on all our buses.
              </p>
            </div>
            <div className="feature">
              <IoTimeOutline className="feature-icon" />
              <p className="feature-title">Flexible Schedules</p>
              <p className="feature-text">
                Choose from a variety of schedules that fit your needs.
              </p>
            </div>
            <div className="feature">
              <IoSyncOutline className="feature-icon" />
              <p className="feature-title">Easy Booking</p>
              <p className="feature-text">
                Book your seats effortlessly with our user-friendly platform.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container grid grid--footer">
          <div className="logo-col">
            <a href="#" className="footer-logo">
              <img
                className="logo"
                alt="busify logo"
                src="img/logo.png"
                style={{
                  width: "50%",
                }}
              />
            </a>

            <ul className="social-links">
              <li>
                <a className="footer-link" href="#">
                  <IoLogoInstagram className="social-icon" />
                </a>
              </li>
              <li>
                <a className="footer-link" href="#">
                  <IoLogoFacebook className="social-icon" />
                </a>
              </li>
              <li>
                <a className="footer-link" href="#">
                  <IoLogoTwitter className="social-icon" />
                </a>
              </li>
            </ul>

            <p className="copyright">
              <p>&copy; {currentYear} Busify. All rights reserved.</p>
            </p>
          </div>

          <div className="address-col">
            <p className="footer-heading">Contact us</p>
            <address className="contacts">
              <p className="address">Mail Central, Khouribga 1337 School</p>
              <p>
                <a className="footer-link" href="tel:415-201-6370">
                  415-201-6370
                </a>
                <br />
                <a className="footer-link" href="mailto:hello@omnifood.com">
                  hello@omnifood.com
                </a>
              </p>
            </address>
          </div>

          <nav className="nav-col">
            <p className="footer-heading">Account</p>
            <ul className="footer-nav">
              <li>
                <a className="footer-link" href="/login">
                  Create account
                </a>
              </li>
              <li>
                <a className="footer-link" href="/login">
                  Sign in
                </a>
              </li>

              <li>
                <a className="footer-link" href="">
                  Android app
                </a>
              </li>
            </ul>
          </nav>

          <nav className="nav-col">
            <img
              src="/img/travel.png"
              alt="travel"
              style={{
                width: "125%",
              }}
            />
          </nav>
        </div>
      </footer>
    </>
  );
}
