"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
    const router = useRouter();

    const [form, setForm] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }

    async function handleSubmite(e) {
        e.preventDefault();
        setError("");

        if(form.password !== form.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            setLoading(true);

            const res = await fetch("/api/register",{
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    name: form.name,
                    username: form.username,
                    email: form.email,
                    password: form.password
                }),
            });

            const data = await res.json();

            if(!res.ok){
                setError(data.message || "something went wrong");
                return;
            }
            router.push("/login");
        } catch (error) {
            setError("Failed to create account");
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-black px-4 text-white">
            <div className="w-full max-w-md rounded-2xl border border-[#2f3336] bg-black p-8">
                <h1 className="text-3xl font-extrabold">Create your account</h1>
                <p className="mt-2 text-gray-500">Join the Twitter clone today.</p>

                <form onSubmit={handleSubmite} className="mt-6 space-y-4">
                <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Name"
                    className="w-full rounded-md border border-[#2f3336] bg-black px-4 py-3 outline-none focus:border-sky-500"
                />

                <input
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    placeholder="Username"
                    className="w-full rounded-md border border-[#2f3336] bg-black px-4 py-3 outline-none focus:border-sky-500"
                />

                <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="w-full rounded-md border border-[#2f3336] bg-black px-4 py-3 outline-none focus:border-sky-500"
                />

                <input
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="w-full rounded-md border border-[#2f3336] bg-black px-4 py-3 outline-none focus:border-sky-500"
                />

                <input
                    name="confirmPassword"
                    type="password"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm password"
                    className="w-full rounded-md border border-[#2f3336] bg-black px-4 py-3 outline-none focus:border-sky-500"
                />

                {error && <p className="text-sm text-red-400">{error}</p>}

                <button
                    disabled={loading}
                    className="w-full rounded-full bg-sky-500 py-3 font-bold text-white transition hover:bg-sky-600 disabled:opacity-60"
                >
                    {loading ? "Creating account..." : "Sign up"}
                </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-500">
                Already have an account?{" "}
                <Link href="/login" className="text-sky-400 hover:underline">
                    Log in
                </Link>
                </p>
            </div>
        </main>
    );
}