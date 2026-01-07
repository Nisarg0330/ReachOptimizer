import { SignOutButton } from "@clerk/nextjs";

export default function DashboardPage() {
    return (
        <div className="p-10">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="mt-4">Welcome to your dashboard!</p>
            <SignOutButton redirectUrl="/">
                <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 ml-2">Logout</button>
            </SignOutButton>
        </div>
        
    );
}