import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";

const GithubSignInPage = () => {
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === "unauthenticated") {
            signIn("github", {
                redirect: true,
                callbackUrl: "/projects" // Sesuaikan dengan URL tujuan
            }).catch((error) => {
                console.error("GitHub SignIn Error:", error);
                window.close();
            });
        }

        if (status === "authenticated") {
            window.close();
        }
    }, [session, status]);

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