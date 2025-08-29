"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

// --- Reusable Components ---

const Input = ({ label, name, type = "text", value, onChange, placeholder, error }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full p-3 border rounded-md outline-none transition ${
        error ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:border-black'
      }`}
    />
  </div>
);

const EyeIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
);

const EyeOffIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" /><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" /><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" /><line x1="2" x2="22" y1="2" y2="22" /></svg>
);




// --- Main Register Page Component ---

export default function RegisterPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.firstName.trim()) newErrors.firstName = "Please enter your first name.";
    if (!form.lastName.trim()) newErrors.lastName = "Please enter your last name.";
    if (!form.email.trim()) {
      newErrors.email = "Please enter your email.";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!form.password) {
      newErrors.password = "Please enter your password.";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }
    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/auths/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            firstName: form.firstName,
            lastName: form.lastName,
            email: form.email,
            password: form.password
        }),
      });
      
      if (response.ok) {
        router.push(`/verify-otp?email=${form.email}`);
      } else {
        const resultText = await response.text();
        setApiError(resultText || "Registration failed. This email may already be in use.");
      }
    } catch (err) {
      console.error("Registration error:", err);
      setApiError("Could not connect to the server. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    signIn("google", { callbackUrl: "/" });
  };

  useEffect(() => {
    if (status === "authenticated" && session?.accessToken) {
      localStorage.setItem("token", session.accessToken);
      localStorage.setItem("userId", session.userId || "");
      localStorage.setItem("email", session.email || "");
      localStorage.setItem("role", session.role || "");
      localStorage.setItem("firstName", session.firstName || "");
      localStorage.setItem("lastName", session.lastName || "");
      window.dispatchEvent(new Event("storage")); // Notify other components of login
      router.push("/");
    }
  }, [status, session, router]);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-lg flex overflow-hidden">
        
        {/* Left Side: Form */}
        <div className="w-full lg:w-1/2 p-8 md:p-12">
            <div className="flex justify-center mb-6">
                <Link href="/">
                    <Image src="/logo.png" alt="Zando Logo" width={150} height={50} />
                </Link>
            </div>
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Create an Account</h2>
          <p className="text-center text-gray-500 mb-8">Join the Zando community today!</p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-1/2">
                <Input label="First Name" name="firstName" value={form.firstName} onChange={handleChange} placeholder="John" error={!!errors.firstName} />
                {errors.firstName && <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>}
              </div>
              <div className="w-full sm:w-1/2">
                <Input label="Last Name" name="lastName" value={form.lastName} onChange={handleChange} placeholder="Doe" error={!!errors.lastName} />
                {errors.lastName && <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>}
              </div>
            </div>

            <div>
              <Input label="Email" type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" error={!!errors.email} />
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
            </div>

            <div className="relative">
              <Input label="Password" type={showPassword ? "text" : "password"} name="password" value={form.password} onChange={handleChange} placeholder="••••••••" error={!!errors.password} />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute top-9 right-3 text-gray-500">
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
              {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
            </div>
            
            <div className="relative">
              <Input label="Confirm Password" type={showConfirm ? "text" : "password"} name="confirmPassword" value={form.confirmPassword} onChange={handleChange} placeholder="••••••••" error={!!errors.confirmPassword} />
              <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute top-9 right-3 text-gray-500">
                {showConfirm ? <EyeOffIcon /> : <EyeIcon />}
              </button>
              {errors.confirmPassword && <p className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>}
            </div>

            {apiError && <p className="text-sm text-center text-red-600 bg-red-100 p-2 rounded-md">{apiError}</p>}

            <button type="submit" disabled={loading} className="w-full py-3 bg-black text-white rounded-md font-semibold hover:bg-gray-800 transition disabled:bg-gray-400">
              {loading ? "Registering..." : "Create Account"}
            </button>
          </form>

          <div className="flex items-center my-6">
            <hr className="w-full border-gray-300" />
            <span className="text-gray-400 text-sm px-4">OR</span>
            <hr className="w-full border-gray-300" />
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 border border-gray-300 p-3 rounded-md hover:bg-gray-50 transition"
          >
            <img src="/google-20.png" alt="Google" className="w-5 h-5" />
            <span className="text-sm font-medium text-gray-700">Continue with Google</span>
          </button>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-black font-semibold hover:underline">
              Log in
            </Link>
          </p>
        </div>

        {/* Right Side: Image */}
        <div className="hidden lg:block w-1/2 relative">
          <Image src="/ban1.jpg" alt="Fashion model" layout="fill" objectFit="cover" />
        </div>
      </div>
    </div>
  );
}