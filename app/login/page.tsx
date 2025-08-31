"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState('')

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (username === "admin" && password === "password123") {
            localStorage.setItem("isAdmin", "true");
            router.push('/admin');
        } else {
            alert("Invalid credentials");
            setErrorMessage('invalid error message');
        }
    };

    return (
        <div className="p-6 items-center justify-center">
            <h2 className="text-xl font-semibold text-center mb-[1.5rem]">Admin Login</h2>
            <form onSubmit={handleLogin} className="max-w-80 mx-auto py-4 px-4 bg-blue-950/95 rounded">
                <h6 className="mb-4 text-lg text-white font-medium">Admin Login</h6>
                <input type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="p-2 w-full mb-4 rounded bg-white outline outline-blue-950/95"
                />
                <input type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="p-2 w-full mb-4 rounded bg-white outline outline-blue-950/95"
                />
                <p className="text-red-500">{errorMessage}</p>
                <button type="submit" className="bg-blue-700 w-full text-white px-4 py-2 rounded hover:bg-blue-800 cursor-pointer transition-all">Login</button>
            </form>
        </div>
    )
};

