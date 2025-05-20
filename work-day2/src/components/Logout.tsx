import { auth } from "./firebase";

async function handleLogout() {
  try {
    await auth.signOut();
    window.location.href = "/login";
    console.log("User logged out successfully!");
  } catch (error) {
    console.error("Error logging out:", error);
  }
}

export default function Logout() {
  return (
    <>
      <button className="border-1 p-1 bg-linear-to-r from-blue-500 via-cyan-500 to-emerald-500" onClick={handleLogout}>
        Logout
      </button>
    </>
  );
}
