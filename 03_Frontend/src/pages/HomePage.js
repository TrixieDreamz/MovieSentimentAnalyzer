import React from "react";

const HomePage = ({ user }) => {
    return (
        <div style={{ padding: "20px", textAlign: "center" }}>
            <h1>Welcome to Movie Sentiment App</h1>
            <p>Analyze movie reviews and discover trends.</p>

            {/* Show Welcome Message if User is Logged In */}
            {user ? (
                <h2>Hello, {user.username}!</h2>
            ) : (
                <p>Please <a href="/login">log in</a> or <a href="/signup">sign up</a> to continue.</p>
            )}
        </div>
    );
};

export default HomePage;
