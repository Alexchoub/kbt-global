import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip
} from "recharts";
import { supabase } from "./utils/supabase";
import {
  LayoutDashboard,
  Building2,
  Users,
  MessageSquare,
  Wallet
} from "lucide-react";
import React, { useState, useEffect } from "react";
import "./App.css";

import kbtLogo from "./assets/kbt-logo.png";
import ammuLogo from "./assets/ammu-logo.png";
import lscLogo from "./assets/lsc-logo.png";
import diamondLogo from "./assets/diamond-logo.png";

const pages = [
  {
   id: "users",
   label: "Utilisateurs",
   icon: <Users size={18} />
  },
  {
    id: "dashboard",
    label: "Dashboard",
    icon: <LayoutDashboard size={18} />
  },

  {
    id: "entreprises",
    label: "Entreprises",
    icon: <Building2 size={18} />
  },

  {
    id: "employes",
    label: "Employés",
    icon: <Users size={18} />
  },

  {
    id: "tchat",
    label: "Tchat",
    icon: <MessageSquare size={18} />
  },

  {
    id: "comptabilite",
    label: "Comptabilité",
    icon: <Wallet size={18} />
  },
];

const employees = [
  { name: "Direction KBT", role: "Présidence" },
  { name: "Responsable Ammu-Nation", role: "Direction filiale" },
  { name: "Responsable Los Santos Customs", role: "Direction filiale" },
  { name: "Responsable Diamond Casino", role: "Direction filiale" },
  { name: "Comptable", role: "Finance" },
];
function AccessDenied() {
  return (
    <div className="card form-card access-denied">
      <h2>🔒 Accès refusé</h2>

      <p className="muted">
        Vous ne disposez pas des permissions nécessaires pour accéder à cette section.
      </p>
    </div>
  );
}
function Dashboard() {
  const [serverLoad, setServerLoad] = useState(72);

useEffect(() => {
  const interval = setInterval(() => {
    setServerLoad(
      Math.floor(60 + Math.random() * 35)
    );
  }, 2500);

  return () => clearInterval(interval);
}, []);
  const totalEmployees = JSON.parse(
    localStorage.getItem("kbt-employes") || "[]"
  ).length;

  const totalMessages = JSON.parse(
    localStorage.getItem("kbt-messages") || "[]"
  ).length;

  const operations = JSON.parse(
    localStorage.getItem("kbt-compta") || "[]"
  );

  const totalMoney = operations.reduce((acc, op) => {
    if (op.type === "revenu") return acc + op.amount;
    return acc - op.amount;
  }, 0);

  const currentUser = localStorage.getItem("kbt-user");

  const lastEmployee = JSON.parse(
    localStorage.getItem("kbt-employes") || "[]"
  ).slice(-1)[0];

  const lastMessage = JSON.parse(
    localStorage.getItem("kbt-messages") || "[]"
  ).slice(-1)[0];

  const lastOperation = JSON.parse(
    localStorage.getItem("kbt-compta") || "[]"
  )[0];
  const chartData = [
  { value: 12000 },
  { value: 18000 },
  { value: 14000 },
  { value: 26000 },
  { value: 22000 },
  { value: 34000 },
  { value: totalMoney || 28000 },
];

  return (
    <div className="dashboard-page">
      <section className="hero hero--dashboard">
        <div className="hero__content">
          <span className="eyebrow">KBT GLOBAL SECURE PANEL</span>
          <h1>Bonjour {currentUser}</h1>
          <p className="hero__lead">
            Centre de contrôle des filiales, employés et finances du groupe.
          </p>
        </div>
      </section>

      <div className="grid--kpi dashboard-wide">
        <div className="card kpi">
          <div className="kpi__label">Employés</div>
          <div className="kpi__value">{totalEmployees}</div>
        </div>

        <div className="card kpi">
          <div className="kpi__label">Messages</div>
          <div className="kpi__value">{totalMessages}</div>
        </div>

        <div className="card kpi">
          <div className="kpi__label">Trésorerie</div>
          <div className="kpi__value">${totalMoney.toLocaleString()}</div>
        </div>
      </div>

      <div className="grid dashboard-latest dashboard-wide">
        <div className="card form-card">
          <h2>Dernier employé</h2>
          {lastEmployee ? (
            <>
              <p><strong>{lastEmployee.name}</strong></p>
              <p className="muted">{lastEmployee.role}</p>
            </>
          ) : (
            <p className="muted">Aucun employé.</p>
          )}
        </div>

        <div className="card form-card">
          <h2>Dernier message</h2>
          {lastMessage ? (
            <>
              <p><strong>{lastMessage.author}</strong></p>
              <p className="muted">{lastMessage.text}</p>
            </>
          ) : (
            <p className="muted">Aucun message.</p>
          )}
        </div>

        <div className="card form-card">
          <h2>Dernière opération</h2>
          {lastOperation ? (
            <>
              <p><strong>{lastOperation.label}</strong></p>
              <p className="muted">${lastOperation.amount}</p>
            </>
          ) : (
            <p className="muted">Aucune opération.</p>
          )}
        </div>
      </div><div className="card chart-card">
  <div className="chart-top">
    <h2>Activité financière</h2>
    <span>7 derniers jours</span>
  </div>

  <div style={{ width: "100%", height: 260 }}>
    <ResponsiveContainer>
      <LineChart data={chartData}>
        <Tooltip />

        <Line
          type="monotone"
          dataKey="value"
          stroke="#4b8fff"
          strokeWidth={4}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
</div>
<div className="card server-card">
  <div className="card activity-card">
  <h2>Activité système</h2>

  <div className="activity-list">
    <div><span></span> Synchronisation Supabase active</div>
    <div><span></span> Réseau interne sécurisé</div>
    <div><span></span> Modules financiers opérationnels</div>
    <div><span></span> Tchat interne disponible</div>
  </div>
</div>
  <div className="server-top">
    <h2>Charge réseau</h2>
    <span>{serverLoad}%</span>
  </div>

  <div className="server-bar">
    <div
      className="server-fill"
      style={{ width: `${serverLoad}%` }}
    />
  </div>
</div><div className="card terminal-card">
  <div className="terminal-header">
    KBT://SYSTEM/CONSOLE
  </div>

  <div className="terminal-body">
    <p>{">"} Secure connection established...</p>
<p>{">"} Supabase database synchronized</p>
<p>{">"} Financial modules operational</p>
<p>{">"} Internal network stable</p>
<p>{">"} Employee access verified</p>
  </div>
</div>
    </div>
  );
}
function Entreprises() {
  return (
    <>
      <section className="page-head">
        <h1>Nos entreprises</h1>
        <p className="muted">Les filiales officielles de la holding KBT Global.</p>
      </section>

      <div className="grid">
        <div className="card form-card enterprise-card reveal is-in">
          <img src={ammuLogo} alt="Ammu-Nation" style={{ width: "100%", maxHeight: 220, objectFit: "contain", borderRadius: 16, marginBottom: 14 }} />
          <h2>Ammu-Nation</h2>
          <p className="muted">Armurerie, équipements spécialisés, accessoires et fournitures professionnelles.</p>
          <span className="pill">Filiale KBT Global</span>
        </div>

        <div className="card form-card enterprise-card reveal is-in">
          <img src={lscLogo} alt="Los Santos Customs" style={{ width: "100%", maxHeight: 220, objectFit: "contain", borderRadius: 16, marginBottom: 14 }} />
          <h2>Los Santos Customs</h2>
          <p className="muted">Garage automobile spécialisé dans la personnalisation, préparation moteur, réparations et services premium.</p>
          <span className="pill">Filiale KBT Global</span>
        </div>

        <div className="card form-card enterprise-card reveal is-in">

  <img
    src={diamondLogo}
    alt="Diamond Casino"
    style={{ width: "100%", borderRadius: 16, marginBottom: 14 }}
  />

  <h2>Diamond Casino</h2>

  <p className="muted">
    Divertissement, luxe, événements VIP et services haut de gamme.
  </p>

  <span className="pill">Filiale KBT Global</span>

</div>
      </div>
    </>
  );
}

function Employes({ showToast }) {
  const [staff, setStaff] = React.useState([]);
  const [name, setName] = React.useState("");
  const [role, setRole] = React.useState("");

  React.useEffect(() => {
    loadEmployees();
  }, []);

  async function loadEmployees() {
    const { data, error } = await supabase
      .from("employes")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setStaff(data);
  }

  async function addEmployee() {
  if (!name.trim() || !role.trim()) return;

  await supabase.from("employes").insert({
    name,
    role,
    status: "Actif",
  });

  showToast(
    "Employé ajouté",
    `${name} a rejoint KBT Global.`
  );

  setName("");
  setRole("");
  loadEmployees();
}

  async function removeEmployee(id) {
    await supabase.from("employes").delete().eq("id", id);
    loadEmployees();
  }

  return (
    <>
      <section className="page-head">
        <h1>Employés</h1>
        <p className="muted">Gestion cloud des effectifs KBT Global.</p>
      </section>

      <div className="card form-card">
        <h2>Ajouter un employé</h2>

        <div className="form-grid">
          <div className="field">
            <label>Nom</label>
            <input value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div className="field">
            <label>Poste</label>
            <input value={role} onChange={(e) => setRole(e.target.value)} />
          </div>
        </div>

        <button className="btn btn--pill btn--outline" style={{ marginTop: 16 }} onClick={addEmployee}>
          Ajouter
        </button>
      </div>

      <div className="stack" style={{ marginTop: 18 }}>
        {staff.map((e) => (
          <div className="card employee reveal is-in" key={e.id}>
            <div className="employee__left">
              <div className="avatar">{e.name.charAt(0)}</div>
              <div>
                <strong>{e.name}</strong>
                <div className="muted small">{e.role}</div>
              </div>
            </div>

            <div className="employee__right">
              <span className="pill">{e.status}</span>
              <button className="btn btn--sm btn--red" onClick={() => removeEmployee(e.id)}>
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
function Utilisateurs({ showToast }) {

  const [newUsername, setNewUsername] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [newRole, setNewRole] = React.useState("employe");

  async function createUser() {

    const { error } = await supabase
      .from("users")
      .insert({
        username: newUsername,
        password: newPassword,
        role: newRole
      });

    if (error) {
      showToast(
        "Erreur",
        "Impossible de créer l'utilisateur."
      );
      return;
    }

    showToast(
      "Succès",
      "Utilisateur créé."
    );

    setNewUsername("");
    setNewPassword("");
    setNewRole("employe");
  }

  return (
    <div className="card form-card">
      <h2>Créer un utilisateur</h2>

      <input
        placeholder="Pseudo"
        value={newUsername}
        onChange={(e) => setNewUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Mot de passe"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        style={{ marginTop: 12 }}
      />

      <select
        value={newRole}
        onChange={(e) => setNewRole(e.target.value)}
        style={{ marginTop: 12 }}
      >
        <option value="employe">Employé</option>
        <option value="admin">Admin</option>
      </select>

      <button
        className="btn-primary"
        style={{ marginTop: 18 }}
        onClick={createUser}
      >
        Créer
      </button>
    </div>
  );
}

function Tchat({ showToast }) {

  const [messages, setMessages] = React.useState(() => {
    const saved = localStorage.getItem("kbt-messages");
    return saved
      ? JSON.parse(saved)
      : [
          {
            author: "Direction",
            text: "Bienvenue sur le réseau interne KBT Global.",
            time: "09:00"
          }
        ];
  });

  const [input, setInput] = React.useState("");

  React.useEffect(() => {
    localStorage.setItem("kbt-messages", JSON.stringify(messages));
  }, [messages]);

  function sendMessage() {

    if (!input.trim()) return;

    const now = new Date();

    const time =
      now.getHours().toString().padStart(2, "0") +
      ":" +
      now.getMinutes().toString().padStart(2, "0");

    const newMessage = {
      author: "Employé",
      text: input,
      time
    };

    setMessages([...messages, newMessage]);
    setInput("");
    showToast(
  "Message envoyé",
  "Le message a été transmis au réseau interne."
);
  }

  return (
    <>
      <section className="page-head">
        <h1>Tchat sécurisé</h1>
        <p className="muted">
          Réseau de communication interne KBT Global.
        </p>
      </section>

      <div className="card form-card">

        <div className="chat-wrap">

          {messages.map((msg, index) => (

            <div
  className={`chat-msg ${
    msg.author === "Employé"
      ? "me"
      : "other"
  }`}
  key={index}
>

              <div className="chat-top">
                <strong className="chat-author">
                  {msg.author}
                </strong>

                <span className="chat-time">
                  {msg.time}
                </span>
              </div>

              <div>
                {msg.text}
              </div>

            </div>

          ))}

        </div>

        <div className="chat-input-wrap">

          <input
  type="text"
  placeholder="Envoyer un message..."
  value={input}
  onChange={(e) => setInput(e.target.value)}

  onKeyDown={(e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  }}

  className="chat-input"
/>
          <button
            className="btn btn--pill btn--outline"
            onClick={sendMessage}
          >
            Envoyer
          </button>

        </div>

      </div>
    </>
  );
}

function Comptabilite({ showToast }) {

  const [operations, setOperations] = React.useState(() => {

    const saved = localStorage.getItem("kbt-compta");

    return saved
      ? JSON.parse(saved)
      : [];

  });

  const [label, setLabel] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [type, setType] = React.useState("revenu");

  React.useEffect(() => {
    localStorage.setItem(
      "kbt-compta",
      JSON.stringify(operations)
    );
  }, [operations]);

  function addOperation() {

    if (!label || !amount) return;

    const newOperation = {
      label,
      amount: Number(amount),
      type,
      date: new Date().toLocaleDateString()
    };

    setOperations([
  newOperation,
  ...operations
]);

showToast(
  "Opération enregistrée",
  `${label} ajouté aux finances.`
);

setLabel("");
setAmount("");
  }

  const total = operations.reduce((acc, op) => {

    if (op.type === "revenu") {
      return acc + op.amount;
    }

    return acc - op.amount;

  }, 0);

  return (
    <>

      <section className="page-head">
        <h1>Comptabilité</h1>

        <p className="muted">
          Gestion financière interne KBT Global.
        </p>
      </section>

      <div className="grid grid--kpi">

        <div className="card kpi">
          <div className="kpi__label">
            Solde total
          </div>

          <div className="kpi__value">
            ${total.toLocaleString()}
          </div>
        </div>

      </div>

      <div
        className="card form-card"
        style={{ marginTop: 18 }}
      >

        <div className="form-grid">

          <div className="field">
            <label>Nom</label>

            <input
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="Ex: Vente Ammu-Nation"
            />
          </div>

          <div className="field">
            <label>Montant</label>

            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="50000"
            />
          </div>

          <div className="field">
            <label>Type</label>

            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="revenu">
                Revenu
              </option>

              <option value="depense">
                Dépense
              </option>
            </select>
          </div>

        </div>

        <button
          className="btn btn--pill btn--outline"
          style={{ marginTop: 16 }}
          onClick={addOperation}
        >
          Ajouter
        </button>

      </div>

      <div
        className="stack"
        style={{ marginTop: 18 }}
      >

        {operations.map((op, index) => (

          <div
            className="card employee"
            key={index}
          >

            <div>
              <strong>
                {op.label}
              </strong>

              <div className="small muted">
                {op.date}
              </div>
            </div>

            <div
              style={{
                color:
                  op.type === "revenu"
                    ? "#4dff88"
                    : "#ff6b6b",

                fontWeight: 900
              }}
            >
              {op.type === "revenu"
                ? "+"
                : "-"}

              ${op.amount.toLocaleString()}
            </div>

          </div>

        ))}

      </div>

    </>
  );
}

export default function App() {
  
 const [page, setPage] = useState("dashboard");
const [loading, setLoading] = useState(true);

useEffect(() => {
  const timer = setTimeout(() => {
    setLoading(false);
  }, 2200);

  return () => clearTimeout(timer);
}, []);

const [isLogged, setIsLogged] = React.useState(() => {
  return localStorage.getItem("kbt-user")
    ? true
    : false;
});
const [username, setUsername] = React.useState("");
const role = localStorage.getItem("kbt-role") || "employe";
const [toast, setToast] = useState(null);
const [time, setTime] = useState(
  new Date().toLocaleTimeString()
);
const [password, setPassword] = React.useState("");
useEffect(() => {
  const interval = setInterval(() => {
    setTime(new Date().toLocaleTimeString());
  }, 1000);

  return () => clearInterval(interval);
}, []);

function showToast(title, text){
  setToast({ title, text });

  setTimeout(() => {
    setToast(null);
  }, 2500);
}

function renderPage() {
  if (page === "users") {

  if (role !== "admin") {
    return (
      <div className="card form-card">
        <h2>Accès refusé</h2>
        <p className="muted">
          Réservé aux administrateurs.
        </p>
      </div>
    );
  }

  return <Utilisateurs showToast={showToast} />;
}
  if (page === "dashboard") return <Dashboard />;
  if (page === "entreprises") return <Entreprises />;
  if (page === "employes") {

  if (role !== "admin") {
    return <AccessDenied />;
  }

  return <Employes showToast={showToast} />;
  }
  if (page === "tchat") return <Tchat showToast={showToast} />;
  if (page === "comptabilite") {
  if (role !== "admin") {
  return <AccessDenied />;
}

  return <Comptabilite showToast={showToast} />;
}

  return <Dashboard />;
}
function logout() {
  localStorage.removeItem("kbt-user");
  setIsLogged(false);
}
if (loading) {
  return (
    <div className="splash">
      <img src={kbtLogo} alt="KBT Global" />
      <h1>KBT Global</h1>
      <p>Chargement en cours...</p>
    </div>
    
  );
}





async function login() {

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("username", username)
   .maybeSingle();
    console.log("LOGIN DATA:", data);
console.log("LOGIN ERROR:", error);
console.log("PASSWORD:", password);

  console.log(data, error);
    if (error || !data) {
    showToast(
      "Accès refusé",
      "Utilisateur introuvable."
    );
    return;
  }

  if (data.password !== password) {
    showToast(
      "Accès refusé",
      "Mot de passe incorrect."
    );
    return;
  }

  localStorage.setItem("kbt-user", data.username);
  localStorage.setItem("kbt-role", data.role);

  setIsLogged(true);
}
  function renderPage() {
    if (page === "dashboard") return <Dashboard />;
    if (page === "entreprises") return <Entreprises />;
    if (page === "employes") return <Employes />;
    if (page === "tchat") return <Tchat />;
    if (page === "comptabilite") return <Comptabilite />;
    return <Entreprises />;
  }

  function logout() {
  localStorage.removeItem("kbt-user");
  setIsLogged(false);
}

if (!isLogged) {
  return (
    <div className="auth-page">
      <img src={kbtLogo} alt="KBT Global" className="login-watermark" />
      <div className="cyber-lines">
  <span></span>
  <span></span>
  <span></span>
</div>
<div className="login-side">
  <h2>Secure Corporate Access</h2>
  <p>Panel interne réservé à la direction et aux employés autorisés de KBT Global.</p>

  <div className="login-status">
    <span></span>
    Système sécurisé actif
  </div>

  <div className="login-status">
    <span></span>
    Connexion chiffrée
  </div>

  <div className="login-status">
    <span></span>
    Base cloud synchronisée
  </div>
</div>
      <div className="card login">
        <h1>KBT Global</h1>
        <div className="login-badge">
  SECURE ACCESS • KBT GLOBAL
</div>
        <p className="muted">Connexion au panel interne</p>

        <div className="field" style={{ marginTop: 18 }}>
          <label>Nom d'utilisateur</label>
          <input
            placeholder="Ex: Alexandre"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                login();
              }
            }}
          />
        </div>
        <div className="field" style={{ marginTop: 18 }}>
  <label>Mot de passe</label>

  <input
    type="password"
    placeholder="••••••••"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
  />
</div>


        <button
          className="btn btn--pill btn--light"
          style={{ marginTop: 16 }}
          onClick={login}
        >
          Connexion
        </button>
      </div>
    </div>
  );
}
return (
  <>
    {toast && (
      <div className="toast">
        <div className="toast-title">
          {toast.title}
        </div>

        <div className="toast-text">
          {toast.text}
        </div>
      </div>
    )}

    <div className="sidebar">

      <div>

        <div className="sidebar-logo">
          KBT Global
        </div>

        <div className="sidebar-nav">

          {pages
  .filter((p) =>
    role === "admin" ||
    (
  p.id !== "comptabilite" &&
  p.id !== "users" &&
  p.id !== "employes"
)
  )
  .map((p) => (

            <button
              key={p.id}
              className={`sidebar-link ${
                page === p.id ? "active" : ""
              }`}
              onClick={() => setPage(p.id)}
            >
              {p.icon}
              <span>{p.label}</span>
            </button>

          ))}

        </div>

      </div>

      <button
        className="btn btn--pill btn--light"
        onClick={logout}
      >
        Déconnexion
      </button>

    </div>

    <div className="app-content">
      <div className="system-bar">

  <div className="system-left">
    <span className="status-dot"></span>
    SECURE NETWORK ONLINE
  </div>

  <div className="system-center">
  <span>EMPLOYÉS: ONLINE</span>
  <span>UPTIME: 99.9%</span>
  <span>PING: 12MS</span>
</div>

  <div className="system-right">
    {time}
  </div>

</div>

      <main className="container">
  <motion.div
  className="page-transition"
  initial={{ opacity: 0, y: 18 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.35 }}
>
  {renderPage()}
</motion.div>
</main>

      <footer className="fc-footer">

        <div className="fc-footer__wrap">

          <div className="fc-footer__line"></div>

          <div className="fc-footer__brand">
            KBT Global
          </div>

          <div className="fc-footer__tag">
            Holding & services spécialisés —
            <span> Qualité</span> •
            <span> Discrétion</span> •
            <span> Fiabilité</span>
          </div>

          <nav className="fc-footer__nav">

            {pages.map((item) => (

              <button
                key={item.id}
                onClick={() => setPage(item.id)}
                style={{
                  background: "none",
                  border: 0,
                  color: "inherit",
                  cursor: "pointer"
                }}
              >
                {item.label}
              </button>

            ))}

          </nav>

          <div className="fc-footer__copy">
            © 2026 KBT Global — Tous droits réservés
          </div>

        </div>

      </footer>

    </div>
  </>
);
}