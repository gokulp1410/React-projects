import { useState } from "react";
import "./App.css";
import { motion, AnimatePresence } from "motion/react";

 

const formVariants = {
  hidden: {
    opacity: 0,
  },

  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.15,
      staggerChildren: 0.08,
    },
  },
};

 

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 15,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

 

const errorVariants = {
  hidden: {
    opacity: 0,
    height: 0,
    y: -5,
  },

  visible: {
    opacity: 1,
    height: "auto",
    y: 0,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },

  exit: {
    opacity: 0,
    height: 0,
    y: -5,
    transition: {
      duration: 0.15,
      ease: "easeIn",
    },
  },
};

 

function InputField({
  id,
  label,
  type,
  value,
  onChange,
  placeholder,
  icon,
  error,
}) {
  return (
    <motion.div className="form-group" variants={itemVariants}>
      <label htmlFor={id}>{label}</label>

      <div className={`input-wrapper ${error ? "input-error" : ""}`}>
        <i className={`fa-solid ${icon} input-icon`}></i>

        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
        />
      </div>

      <AnimatePresence mode="wait">
        {error && (
          <motion.p
            id={`${id}-error`}
            className="error-message"
            variants={errorVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <i className="fa-solid fa-circle-exclamation"></i>

            <span>{error}</span>
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

 

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [shake, setShake] = useState(false);
  const [submitting, setSubmitting] = useState(false);

 

  function handleSubmit(e) {
    e.preventDefault();

    let valid = true;

    /* Name validation */

    if (name.trim() === "") {
      setNameError("Username is required");
      valid = false;
    } else {
      setNameError("");
    }

    /* Email validation */

    if (email.trim() === "") {
      setEmailError("Email is required");
      valid = false;
    } else {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailPattern.test(email)) {
        setEmailError("Please enter a valid email");
        valid = false;
      } else {
        setEmailError("");
      }
    }

    /* Password validation */

    if (password.trim() === "") {
      setPasswordError("Password is required");
      valid = false;
    } else if (password.length < 6) {
      setPasswordError(
        "Password must contain at least 6 characters"
      );
      valid = false;
    } else {
      setPasswordError("");
    }

    /* Validation failed */

    if (!valid) {
      setShake(true);

      setTimeout(() => {
        setShake(false);
      }, 400);

      return;
    }

    /* Login */

    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);

      alert("Login successfully");

      console.log("Name:", name);
      console.log("Email:", email);
      console.log("Password:", password);
    }, 800);
  }

   

  return (
    <main className="page">

      

      <motion.section
        className="login-card"
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,

          x: shake
            ? [0, -8, 8, -6, 6, -2, 2, 0]
            : 0,
        }}
        transition={{
          opacity: {
            duration: 0.5,
            ease: "easeOut",
          },

          y: {
            duration: 0.5,
            ease: "easeOut",
          },

          x: {
            duration: 0.4,
            ease: "easeInOut",
          },
        }}
      >

         

        <motion.div
          className="form-header"
          initial={{
            opacity: 0,
            y: -10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.4,
            delay: 0.15,
            ease: "easeOut",
          }}
        >

          <motion.div
            className="logo"
            initial={{
              opacity: 0,
              scale: 0.8,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.4,
              delay: 0.2,
            }}
          >
            <i className="fa-solid fa-user-lock"></i>
          </motion.div>

          <h1>Welcome back</h1>

          <p>
            Sign in to your account to continue
          </p>

        </motion.div>

       

        <motion.form
          onSubmit={handleSubmit}
          variants={formVariants}
          initial="hidden"
          animate="visible"
          noValidate
        >

          {/* Name */}

          <InputField
            id="name"
            label="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            icon="fa-user"
            error={nameError}
          />

          {/* Email */}

          <InputField
            id="email"
            label="Email address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            icon="fa-envelope"
            error={emailError}
          />

          {/* Password */}

          <InputField
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            icon="fa-lock"
            error={passwordError}
          />

         
          
          <motion.div
            className="form-options"
            variants={itemVariants}
          >

            <label className="remember">
              <input type="checkbox" />

              <span>Remember me</span>
            </label>

            <button
              type="button"
              className="forgot-password"
              onClick={() =>
                alert("Forgot password clicked")
              }
            >
              Forgot password?
            </button>

          </motion.div>

          

          <motion.button
            className="login-button"
            variants={itemVariants}
            type="submit"
            disabled={submitting}
            whileHover={{
              scale: submitting ? 1 : 1.02,
            }}
            whileTap={{
              scale: submitting ? 1 : 0.97,
            }}
          >

            {submitting ? (
              <>
                <i className="fa-solid fa-spinner fa-spin"></i>

                <span>Logging in...</span>
              </>
            ) : (
              <>
                <span>Login</span>

                <i className="fa-solid fa-arrow-right"></i>
              </>
            )}

          </motion.button>

        </motion.form>

        

        <motion.div
          className="register-section"
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.35,
            delay: 0.6,
          }}
        >

          <span>
            Don't have an account?
          </span>

          <button
            type="button"
            className="register-button"
            onClick={() =>
              alert("Register clicked")
            }
          >
            Create account
          </button>

        </motion.div>

      </motion.section>

    </main>
  );
}

export default App;