import React, { useState } from "react";

import Login from "./Login";
import Register from "./Register";
import ForgotPassword from "./ForgotPassword";

export default function AuthPage() {
  const [page, setPage] = useState("login");
  if (page === "login") {
    return <Login onRegister={() => setPage("register")} onForgot={() => setPage("forgot")} />;
  }
  if (page === "register") {
    return <Register onRegister={() => setPage("login")} />;
  }
  if (page === "forgot") {
    return <ForgotPassword onBack={() => setPage("login")} />;
  }
}
