import { useState } from "react";
import { useCookies } from "react-cookie";
export default function Auth() {
  const [, setCookie] = useCookies(null);
  const [isLogIn, setIsLogIn] = useState(true);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [error, setError] = useState(null);
  const [licenseKey, setLicenseKey] = useState(null);

  const viewLogin = (status) => {
    setError(null);
    setIsLogIn(status);
  };

  const handleSubmit = async (e, endpoint) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    if (!isLogIn && password !== confirmPassword) {
      setError("Make sure passwords match");
      return;
    }

    const response = await fetch(
      `${process.env.REACT_APP_SERVERURL}/${endpoint}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, license_key: licenseKey }),
      }
    );

    const data = await response.json();
    if (data.detail) {
      setError(data.detail);
    } else {
      setCookie("Email", data.email);
      setCookie("AuthToken", data.token);
      setCookie("Role", data.role);

      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 dark:bg-dark-gradient transition-colors duration-500 px-4">
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <form>
          <h2 className="text-xl font-bold leading-tight tracking-tight text-gray-800 dark:text-gray-200 md:text-2xl mb-5">
            {isLogIn ? "Please Log In To VitalOrgans" : "Please Sign Up To VitalOrgans"}
          </h2>
          <input
            type="email"
            placeholder="Email"
            className="input-text mb-4 p-2 w-full rounded border dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="input-text mb-4 p-2 w-full rounded border dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
            onChange={(e) => setPassword(e.target.value)}
          />
          {!isLogIn && (
            <>
              <input
                type="password"
                placeholder="Confirm Password"
                className="input-text mb-4 p-2 w-full rounded border dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <label
                htmlFor="licenseKey"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
              >
                License Key * for Hospital/Clinic
              </label>
              <input
                type="text"
                placeholder="HSP-#####-YYYY-IN (e.g., HSP-12345-2024-IN)"
                className="input-text mb-4 p-2 w-full rounded border dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                onChange={(e) => setLicenseKey(e.target.value)}
              />
            </>
          )}
          <input
            type="submit"
            className="bg-RussianViolet hover:bg-hoverButtonColor dark:bg-buttonColor dark:hover:bg-hoverButtonColor text-white p-2 w-full rounded cursor-pointer transition-colors duration-300"
            onClick={(e) => handleSubmit(e, isLogIn ? "login" : "signup")}
          />
          {error && <p className="error text-red-500 text-sm">{error}</p>}
          <p className="mt-4"><strong>User:</strong> Email: <span className="text-red-500">user@test.com</span> Pass: <span className="text-red-500">123</span></p>
          <p><strong>Hospital:</strong> Email: <span className="text-red-500">hospital@test.com</span> Pass: <span className="text-red-500">123</span></p>
        </form>
        <div className="auth-options mt-4 flex justify-between">
          <button
            onClick={() => viewLogin(false)}
            className={`px-4 py-2 rounded transition-colors duration-300 ${!isLogIn ? "bg-RussianViolet text-white dark:bg-buttonColor" : "bg-gray-300 dark:bg-gray-600 dark:text-gray-200"}`}
          >
            Sign Up
          </button>
          <button
            onClick={() => viewLogin(true)}
            className={`px-4 py-2 rounded transition-colors duration-300 ${isLogIn ? "bg-RussianViolet text-white dark:bg-buttonColor" : "bg-gray-300 dark:bg-gray-600 dark:text-gray-200"}`}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
