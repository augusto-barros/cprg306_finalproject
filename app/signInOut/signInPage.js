"use client";
import Link from "next/link";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { useUserAuth } from "../_utils/auth-context";

export default function SignInPage() {
    const { user, gitHubSignIn, googleSignIn, firebaseSignOut } = useUserAuth();

    async function handleGitHubSignIn() {
        try {
            await gitHubSignIn();
        } catch (error) {
            console.error("GitHub sign-in error:", error);
        }
    }

    async function handleGoogleSignIn() {
        try {
            await googleSignIn();
        } catch (error) {
            console.error("Google sign-in error:", error);
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
        <main className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <header className="text-center">
                    <h1 className="text-4xl font-bold text-blue-600">MealMetrics</h1>
                    <p className="mt-2 text-base text-gray-600">Track your meals, calories, and nutrition effortlessly!</p>
                </header>

                {user ? (
                    <div className="text-center space-y-4">
                        <div className="flex justify-center">
                            <img
                                src={user.photoURL || "/default-avatar.png"}
                                alt={user.displayName || 'User'}
                                className="w-24 h-24 rounded-full border-2 border-blue-500"
                            />
                        </div>
                        <p className="text-lg font-medium text-gray-800">Welcome, {user.displayName || 'User'}!</p>
                        <p className="text-sm text-gray-500">Your email: {user.email || 'N/A'}</p>
                        <div className="mt-4">
                            <Link href="./dashboard">
                                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition duration-300 ease-in-out">
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
                            onClick={handleGitHubSignIn}
                        >
                            <FaGithub className="text-2xl" />  {/* GitHub Icon */}
                            <span>Sign In with GitHub</span>
                        </button>
                        <button
                            type="button"
                            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-5 rounded-full transition duration-300 ease-in-out flex items-center justify-center space-x-2"
                            onClick={handleGoogleSignIn}
                        >
                            <FaGoogle className="text-2xl" />  {/* Google Icon */}
                            <span>Sign In with Google</span>
                        </button>
                    </div>
                )}
            </div>
        </main>
    );
}
