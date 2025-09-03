import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const GithubSignInPage = () => {
    const { data: session, status } = useSession();
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (status === "unauthenticated") {
            signIn("github", {
                redirect: true,
                callbackUrl: "/projects"
            }).catch((error) => {
                console.error("GitHub SignIn Error:", error);
                setError("Failed to sign in with GitHub. Please try again.");
                setTimeout(() => {
                    window.close();
                }, 3000);
            });
        }

        if (status === "authenticated") {
            // Close popup and redirect parent window
            if (window.opener) {
                window.opener.location.href = "/projects";
                window.close();
            } else {
                window.location.href = "/projects";
            }
        }
    }, [session, status]);

    if (error) {
        return (
            <div style={{
                width: "100vw",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "white",
                flexDirection: "column",
            }}>
                <p style={{ color: "red", marginBottom: "10px" }}>{error}</p>
                <p>Closing window...</p>
            </div>
        );
    }

    return (
        <div style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "white",
        }}>
            <p>Redirecting to GitHub login...</p>
        </div>
    );
};

export default GithubSignInPage;