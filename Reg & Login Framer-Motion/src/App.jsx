import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import "./App.css";

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });

    
    setErrors({
      ...errors,
      [name]: "",
    });
  }

  function validate() {
    const newErrors = {};

    if (!isLogin && form.name.trim() === "") {
      newErrors.name = "Name is required";
    }

    if (form.email.trim() === "") {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (form.password === "") {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must contain at least 6 characters";
    }

    if (!isLogin && form.confirmPassword === "") {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (!isLogin && form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  }

  function handleSubmit(e) {
    e.preventDefault();

    const validationErrors = validate();

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setLoading(true);

    // Simulate API request
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);

      setTimeout(() => {
        setSuccess(false);
      }, 2000);
    }, 1500);
  }

  function switchMode() {
    setIsLogin(!isLogin);

    setForm({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    setErrors({});
    setSuccess(false);
  }

  return (
    <div className="page">
      <motion.div
        className="card"
        layout
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.6,
          ease: "easeOut",
        }}
      >
        <AnimatePresence mode="wait">
          {success ? (
            <motion.div
              key="success"
              className="success"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="success-icon"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                }}
              >
                ✓
              </motion.div>

              <h2>
                {isLogin ? "Login Successful!" : "Registration Successful!"}
              </h2>

              <p>
                {isLogin ? "Welcome back." : "Your account has been created."}
              </p>
            </motion.div>
          ) : (
            <motion.div
              key={isLogin ? "login" : "register"}
              initial={{
                opacity: 0,
                x: isLogin ? -40 : 40,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              exit={{
                opacity: 0,
                x: isLogin ? 40 : -40,
              }}
              transition={{ duration: 0.35 }}
            >
              <h1>{isLogin ? "Welcome Back" : "Create Account"}</h1>

              <p className="subtitle">
                {isLogin ? "Login to your account" : "Create your new account"}
              </p>

              <form onSubmit={handleSubmit}>
                {!isLogin && (
                  <FormInput
                    label="Name"
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    value={form.name}
                    onChange={handleChange}
                    error={errors.name}
                  />
                )}

                <FormInput
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={handleChange}
                  error={errors.email}
                />

                <FormInput
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  error={errors.password}
                />

                {!isLogin && (
                  <FormInput
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    error={errors.confirmPassword}
                  />
                )}

                {isLogin && (
                  <div className="forgot">
                    <a href="#">Forgot password?</a>
                  </div>
                )}

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {loading ? (
                    <motion.span
                      className="loader"
                      animate={{ rotate: 360 }}
                      transition={{
                        repeat: Infinity,
                        duration: 0.8,
                        ease: "linear",
                      }}
                    />
                  ) : isLogin ? (
                    "Login"
                  ) : (
                    "Register"
                  )}
                </motion.button>
              </form>

              <p className="switch">
                {isLogin
                  ? "Don't have an account?"
                  : "Already have an account?"}

                <button
                  type="button"
                  className="switch-button"
                  onClick={switchMode}
                >
                  {isLogin ? "Register" : "Login"}
                </button>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

function FormInput({ label, name, type, placeholder, value, onChange, error }) {
  return (
    <motion.div
      className="input-group"
      animate={
        error
          ? {
              x: [0, -8, 8, -8, 8, 0],
            }
          : { x: 0 }
      }
      transition={{ duration: 0.4 }}
    >
      <label>{label}</label>

      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={error ? "input-error" : ""}
      />

      <AnimatePresence>
        {error && (
          <motion.p
            className="error"
            initial={{ opacity: 0, height: 0, y: -5 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0 }}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default App;
