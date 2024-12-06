"use client";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { useUserAuth } from "../_utils/auth-context";

export default function SignInPage() {
    const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

    async function handleSignIn() {
        try {
            await gitHubSignIn();
        } catch (error) {
            console.error("GitHub sign-in error:", error);
        }
    }

    async function handleSignOut() {
        try {
            await firebaseSignOut();
        } catch (error) {
            console.error("Sign-out error:", error);
        }
    }

    return (
        <main className="flex items-center justify-center min-h-screen bg-gradient-to-b from-green-400 to-teal-500">
            <div className="w-full max-w-md p-10 space-y-8 bg-white rounded-2xl shadow-lg">
                <header className="text-center">
                    <h1 className="text-5xl font-extrabold text-green-700">MealMetrics</h1>
                    <p className="mt-3 mb-10 text-lg text-gray-700">Track your meals, calories, and nutrition effortlessly!</p>
                </header>

                {user ? (
                    <div className="text-center space-y-6">
                        <div className="flex justify-center">
                            <img
                                src={user.photoURL || "/default-avatar.png"}
                                alt={user.displayName || 'User'}
                                className="w-28 h-28 rounded-full border-4 border-green-500"
                            />
                        </div>
                        <p className="text-xl font-medium text-gray-800">Welcome, {user.displayName || 'User'}!</p>
                        <p className="text-sm text-gray-500">Your email: {user.email || 'N/A'}</p>
                        <div className="mt-4">
                            <Link href="./home">
                                <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-5 rounded-full transition duration-300 ease-in-out">
                                    Start Tracking Your Meals
                                </button>
                            </Link>
                        </div>
                        <div className="mt-4">
                            <button
                                type="button"
                                className="w-full bg-gray-300 hover:bg-gray-400 text-gray-700 py-3 px-5 rounded-full transition duration-300 ease-in-out"
                                onClick={handleSignOut}
                            >
                                Sign Out
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="text-center space-y-6">
                        <p className="text-sm text-gray-600">Please sign in to get started with your meal tracking!</p>
                        <button
                            type="button"
                            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-5 rounded-full transition duration-300 ease-in-out flex items-center justify-center space-x-2"
                            onClick={handleSignIn}
                        >
                            <FaGithub className="text-2xl" />  {/* GitHub Icon */}
                            <span>Sign In with GitHub</span>
                        </button>
                    </div>
                )}
            </div>
        </main>
    );
}
