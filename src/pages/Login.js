import React from "react";
import "../assets/css/pages/Login.css";

function Login() {
  return (
    <div className="login-web">
      <div className="left-side">
        <h1 style={{ color: "#007bff" }}>H HOSPITAL</h1>
        <form style={{ display: "contents" }} action="login.php" method="post">
          <div className="card">
            <div className="card-head">
              <h2 style={{ margin: 0 }}>Selamat Datang</h2>
              <p style={{ margin: 0 }}>Silahkan masuk dengan akun anda</p>
            </div>
            <div className="card-body">
              <div className="input-group">
                <label className="form-label" for="email">
                  Email:
                </label>
                <input
                  className="form-text-input"
                  type="email"
                  id="email"
                  name="email"
                  required
                ></input>
              </div>
              <div className="input-group">
                <label className="form-label" for="password">
                  Password:
                </label>
                <input
                  className="form-text-input"
                  type="password"
                  id="password"
                  name="password"
                  required
                ></input>
              </div>
            </div>
            <div className="card-footer">
              <input
                className="form-login-submit"
                type="submit"
                value="Masuk"
              ></input>
            </div>
          </div>
        </form>
      </div>
      <div className="right-side fill"></div>
    </div>
  );
}

export default Login;
