"use client";

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import TwitterLogo from '@/components/ui/TwitterLogo';

export default function LoginPage() {
    const [form, setForm] = useState({
        email:'',
        password:'',
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { status } = useSession();

    useEffect(() => {
    if (status === "authenticated") {
        router.push("/");
    }
    }, [status, router]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        
        try {
            const res = await signIn("credentials", {
                email: form.email,
                password: form.password,
                redirect: false,
            });
        
            console.log("Sign-in response:", res);

        if(res?.error) {
            setError("Invalid email or password");
            return;
        }

        window.location.href = "/"; // Redirect to home page on successful login
        } catch (err) {
            console.error("Error during sign-in:", err);
            setError("An error occurred during sign-in. Please try again.");
        } finally {
            setLoading(false);
        }   
    };

    return (
        <main className="min-h-screen bg-black px-4 text-white flex items-center justify-center">
            <form
                onSubmit={handleSubmit}
                className="mx-auto mt-24 max-w-md space-y-6 rounded-xl border border-gray-800 bg-black p-6 text-white"
            >
                <div className="flex flex-col items-center mb-8">
                    <TwitterLogo />
                    <h1 className="mt-4text-2xl font-bold">Sign in to Twitter</h1>
                </div>

                {error && (
                    <p>
                        {error}
                    </p>
                )}
                <div className="space-y-4">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-gray-800 bg-transparent px-4 py-3 outline-none focus:border-sky-500"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-gray-800 bg-black p-4 text-white"
                        />

                    <button
                        disabled={loading}
                        className='w-full rounded-full bg-sky-500 py-3 font-bold text-white transition hover:bg-sky-600 disabled:opacity-50'>
                        {loading ? "Signing in..." : "Sign in"}
                    </button>
                </div>
            </form>
        </main>
    )
}