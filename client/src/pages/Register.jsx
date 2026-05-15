import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [adminCode, setAdminCode] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          username,
          password,
          adminCode,
        }
      );

      localStorage.setItem("token", res.data.token);

      setMessage("Admin registration successful");

      setTimeout(() => navigate("/admin"), 1500);
    } catch (err) {
      setMessage(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const field = {
    wrapper: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      border: "1.5px solid #d6b325",
      borderRadius: "10px",
      padding: "0 14px",
      height: "44px",
      background: "#f8fafc",
      transition: "0.3s ease",
    },

    icon: {
      fontSize: "15px",
      color: "#0f172a",
      flexShrink: 0,
    },

    input: {
      flex: 1,
      border: "none",
      outline: "none",
      background: "transparent",
      fontSize: "14px",
      color: "#0f172a",
    },

    label: {
      display: "block",
      fontSize: "13px",
      fontWeight: 600,
      color: "#1e293b",
      marginBottom: "6px",
    },
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        background:
          "linear-gradient(135deg,#0b1f3a,#102b52 50%,#081526)",
        fontFamily: "'Segoe UI', sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "820px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          borderRadius: "22px",
          overflow: "hidden",
          boxShadow: "0 25px 60px rgba(0,0,0,0.45)",
          background: "#fff",
        }}
      >
        {/* LEFT SIDE */}
        <div
          style={{
            background:
              "linear-gradient(160deg,#0f172a,#1e3a5f,#14213d)",
            padding: "34px 28px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            {/* Logo */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "24px",
              }}
            >
              <div
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "12px",
                  background: "rgba(250,204,21,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "22px",
                }}
              >
                🚌
              </div>

              <div>
                <div
                  style={{
                    fontSize: "12px",
                    color: "rgba(255,255,255,0.7)",
                  }}
                >
                  University
                </div>

                <div
                  style={{
                    fontSize: "18px",
                    color: "#facc15",
                    fontWeight: "700",
                  }}
                >
                  Bus Tracker
                </div>
              </div>
            </div>

            {/* Heading */}
            <h2
              style={{
                fontSize: "30px",
                fontWeight: "800",
                color: "#fff",
                lineHeight: 1.3,
                marginBottom: "12px",
              }}
            >
              Secure Admin
              <br />
              Registration Portal
            </h2>

            <p
              style={{
                fontSize: "14px",
                color: "rgba(255,255,255,0.75)",
                lineHeight: 1.7,
                marginBottom: "24px",
              }}
            >
              Create authorized administrator accounts securely
              using the protected admin secret code system.
            </p>

            {/* Features */}
            {[
              ["🛡️", "JWT Authentication Enabled"],
              ["🔑", "Protected Admin Registration"],
              ["🔒", "Encrypted Credential Storage"],
            ].map(([icon, text]) => (
              <div
                key={text}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  background: "rgba(250,204,21,0.08)",
                  border: "1px solid rgba(250,204,21,0.18)",
                  borderRadius: "12px",
                  padding: "12px 14px",
                  marginBottom: "10px",
                }}
              >
                <span style={{ fontSize: "15px" }}>{icon}</span>

                <span
                  style={{
                    fontSize: "13px",
                    color: "rgba(255,255,255,0.92)",
                  }}
                >
                  {text}
                </span>
              </div>
            ))}
          </div>

          {/* Bottom Tags */}
          <div
            style={{
              display: "flex",
              gap: "8px",
              marginTop: "20px",
              flexWrap: "wrap",
            }}
          >
            {["Morning Routes", "Evening Routes"].map((t) => (
              <span
                key={t}
                style={{
                  background: "rgba(250,204,21,0.12)",
                  border: "1px solid rgba(250,204,21,0.2)",
                  color: "#facc15",
                  borderRadius: "20px",
                  padding: "5px 14px",
                  fontSize: "12px",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div
          style={{
            background: "#ffffff",
            padding: "34px 32px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div style={{ width: "100%" }}>
            {/* Top */}
            <div
              style={{
                textAlign: "center",
                marginBottom: "24px",
              }}
            >
              <div
                style={{
                  width: "54px",
                  height: "54px",
                  borderRadius: "16px",
                  background:
                    "linear-gradient(135deg,#facc15,#eab308)",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "26px",
                  marginBottom: "12px",
                  boxShadow:
                    "0 8px 20px rgba(250,204,21,0.35)",
                }}
              >
                🚌
              </div>

              <h2
                style={{
                  fontSize: "24px",
                  fontWeight: "800",
                  color: "#0f172a",
                  marginBottom: "4px",
                }}
              >
                Admin Registration
              </h2>

              <p
                style={{
                  fontSize: "13px",
                  color: "#64748b",
                }}
              >
                Authorized administrators only
              </p>
            </div>

            {/* Message */}
            {message && (
              <div
                style={{
                  padding: "12px 14px",
                  borderRadius: "10px",
                  fontSize: "13px",
                  fontWeight: "500",
                  textAlign: "center",
                  marginBottom: "18px",
                  background: message.includes("successful")
                    ? "#dcfce7"
                    : "#fee2e2",
                  color: message.includes("successful")
                    ? "#15803d"
                    : "#dc2626",
                  border: `1px solid ${
                    message.includes("successful")
                      ? "#bbf7d0"
                      : "#fecaca"
                  }`,
                }}
              >
                {message.includes("successful") ? "✅ " : "❌ "}
                {message}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleRegister}>
              {[
                {
                  label: "Username",
                  type: "text",
                  ph: "Enter username",
                  val: username,
                  set: setUsername,
                  icon: "👤",
                },

                {
                  label: "Password",
                  type: "password",
                  ph: "Enter password",
                  val: password,
                  set: setPassword,
                  icon: "🔒",
                },

                {
                  label: "Secret Admin Code",
                  type: "password",
                  ph: "Enter secret code",
                  val: adminCode,
                  set: setAdminCode,
                  icon: "🗝️",
                },
              ].map(({ label, type, ph, val, set, icon }) => (
                <div key={label} style={{ marginBottom: "16px" }}>
                  <label style={field.label}>{label}</label>

                  <div style={field.wrapper}>
                    <span style={field.icon}>{icon}</span>

                    <input
                      type={type}
                      placeholder={ph}
                      value={val}
                      required
                      onChange={(e) => set(e.target.value)}
                      style={field.input}
                    />
                  </div>
                </div>
              ))}

              {/* Button */}
              <button
                type="submit"
                disabled={loading}
                style={{
                  width: "100%",
                  height: "46px",
                  border: "none",
                  borderRadius: "10px",
                  background:
                    "linear-gradient(135deg,#facc15,#eab308)",
                  color: "#0f172a",
                  fontSize: "14px",
                  fontWeight: "700",
                  cursor: "pointer",
                  opacity: loading ? 0.75 : 1,
                  boxShadow:
                    "0 4px 16px rgba(250,204,21,0.35)",
                }}
              >
                {loading
                  ? "Creating Account..."
                  : "Create Admin Account"}
              </button>
            </form>

            {/* Login */}
            <p
              style={{
                textAlign: "center",
                fontSize: "13px",
                color: "#64748b",
                marginTop: "18px",
              }}
            >
              Already registered?{" "}
              <Link
                to="/login"
                style={{
                  color: "#eab308",
                  fontWeight: "700",
                  textDecoration: "none",
                }}
              >
                Login Here →
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}