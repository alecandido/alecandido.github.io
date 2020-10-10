import React from "react";
import Link from "next/link";
import styles from "./navbar.module.scss";

class NavbarBurger extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inactiveClass: styles["my-navbar-burger"],
      activeClass: styles["my-navbar-burger-active"]
    };
  }

  render() {
    return (
      <a
        role="button"
        className={
          this.props.isActive
            ? this.state.activeClass
            : this.state.inactiveClass
        }
        onClick={this.props.onClick}
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    );
  }
}

function NavbarLogo(props) {
  return (
    <div className={styles["my-navbar-logo-holder"]}>
      <Link href="/" as={process.env.BACKEND_URL + "/"}>
        <a className={styles["my-navbar-logo"]}>Projects</a>
      </Link>
    </div>
  );
  //<img src="/assets/img/profile.jpg" width="112" height="28" />
}

class NavbarMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inactiveClass: styles["my-navbar-menu"],
      activeClass: styles["my-navbar-menu-active"]
    };
  }

  render() {
    return (
      <div
        id="navbarBasicExample"
        className={
          this.props.isActive
            ? this.state.activeClass
            : this.state.inactiveClass
        }
      >
        <div className={styles["my-navbar-start"]}>
          <a className={styles["my-navbar-item"]}>Home</a>

          <a className={styles["my-navbar-item"]}>Documentation</a>

          <div className={styles["my-navbar-item-dropdown"]}>
            <a className={styles["my-navbar-link"]}>More</a>

            <div className={styles["my-navbar-dropdown"]}>
              <a className={styles["my-navbar-item"]}>About</a>
              <a className={styles["my-navbar-item"]}>Jobs</a>
              <a className={styles["my-navbar-item"]}>Contact</a>
              <hr className={styles["my-navbar-divider"]} />
              <a className={styles["my-navbar-item"]}>Report an issue</a>
            </div>
          </div>
        </div>

        <div className={styles["my-navbar-end"]}>
          <div className={styles["my-navbar-item"]}>
            <div className="buttons">
              <a className="button is-primary">
                <strong>Sign up</strong>
              </a>
              <a className="button is-light">Log in</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class Navbar extends React.Component {
  //static async getInitialProps() {}
  constructor(props) {
    super(props);

    this.state = {
      activeBurger: false
    };
  }

  toggleBurger() {
    if (this.state.activeBurger) {
      this.setState({ activeBurger: false });
    } else {
      this.setState({ activeBurger: true });
    }
  }

  render() {
    return (
      <nav
        className={styles["my-navbar"]}
        role="navigation"
        aria-label="main navigation"
      >
        <div className={styles["my-navbar-brand"]}>
          <NavbarLogo />
          <NavbarBurger
            isActive={this.state.activeBurger}
            onClick={() => this.toggleBurger()}
          />
        </div>

        <NavbarMenu isActive={this.state.activeBurger} />
      </nav>
    );
  }
}

export default Navbar;
