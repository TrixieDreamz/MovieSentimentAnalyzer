import React, { useEffect, useState } from "react";

const HomePage = ({ user }) => {
    const [currentUser, setCurrentUser] = useState(user);

    useEffect(() => {
        setCurrentUser(user);
    }, [user]); // 🔹 Update when user changes

    return (
        <div style={{ padding: "20px", textAlign: "center" }}>
            <h1>Welcome to Movie Sentiment App</h1>
            <p>Analyze movie reviews and discover trends.</p>

            {/* Show Welcome Message if User is Logged In */}
            {currentUser ? (
                <h2>Hello, {currentUser.username}!</h2>
            ) : (
                <p>
                    Please <a href="/login">log in</a> or <a href="/signup">sign up</a> to continue.
                </p>
            )}
        </div>
    );
};

export default HomePage;
