import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { Lock, User, Loader2 } from "lucide-react";
import { ADMIN_USERNAME, ADMIN_PASSWORD, setAdminAuth } from "@/lib/adminAuth";

export const Route = createFileRoute("/admin/login")({
  component: AdminLoginPage,
});

function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    setTimeout(() => {
      if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        setAdminAuth();
        router.navigate({ to: "/admin" });
      } else {
        setError("Invalid username or password");
        setIsLoading(false);
      }
    }, 500);
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="neu w-full max-w-md p-8">
        <div className="text-center">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[var(--gradient-hero)] text-[oklch(0.86_0.12_85)] shadow-[var(--shadow-gold)]">
            <span className="text-2xl font-bold">T</span>
          </div>
          <h1 className="mt-4 text-2xl font-bold">Admin Login</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Enter your credentials to access the admin panel
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <User size={12} /> Username
            </label>
            <input
              type="text"
              required
              className="neu-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
            />
          </div>

          <div>
            <label className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <Lock size={12} /> Password
            </label>
            <input
              type="password"
              required
              className="neu-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="btn-gold w-full justify-center disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? <Loader2 size={18} className="animate-spin" /> : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
