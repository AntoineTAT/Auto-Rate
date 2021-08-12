import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Header from "../../components/organisms/Header";
import useLocalStorage from "../../hooks/uselocalstorage";

function Login() {
  const [token, setToken] = useLocalStorage("token", null); // LocalStorage
  const [userId, setUserId] = useLocalStorage("userId", null);
  const [username, setUsername] = useLocalStorage("username", null);
  const [roles, setRoles] = useLocalStorage("roles", null);

  const [email, setEmail] = useState(""); // State pour le formulaire login
  const [password, setPassword] = useState("");

  const router = useRouter(); // Redirection

  const login_url = "//localhost:4000/auth/login"; // Url pour le login

  const login = async (e) => {
    e.preventDefault();

    await fetch(login_url, {
      // Requete pour le login
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.statusCode == 500) {
          // Si les identifiants sont pas bons
          alert("Wrong credentials");
        } else {
          // Alors redirection

          setUsername(data.username);
          setUserId(data.userId);
          setRoles(data.roles);
          setToken(data.access_token);

          router.push("/");
        }
      });
  };

  return (
    <div>
      <Header />
      <div className="ml-auto mr-auto w-1/4 pt-24">
        <div className="w-full">
          <form
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={login}
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                for="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                name="name"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                placeholder="Email"
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                for="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-black mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="********"
              />
            </div>

            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 border text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Sign In
              </button>

              <div className="bg-blue-500 hover:bg-blue-700 border hover:text-white  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                <Link href="/auth/register">
                  <a>Not Register yet !</a>
                </Link>
              </div>
            </div>
            
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login
