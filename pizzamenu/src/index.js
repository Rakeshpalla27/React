import React from "react";
import ReactDom, { createRoot } from "react-dom/client";
import "./index.css";

const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];

function App() {
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}

function Header() {
  //   const style = { color: "red", fontSize: "32px", textTransform: "uppercase" };
  return (
    <header className="header">
      <h1>Fast PIZZA Co.</h1>;{/*  style={style}*/}
    </header>
  );
}

function Menu() {
  const pizzas = pizzaData;
  // const pizzas = [];
  const pizzasno = pizzas.length;

  return (
    <main className="menu">
      <h2>Our Menu</h2>
      {pizzasno > 0 ? (
        <ul className="pizzas">
          {pizzas.map((pizza) => (
            <Pizza pizzaobj={pizza} key={pizza.name} />
          ))}
        </ul>
      ) : (
        <p>We are still working on our menu.Please come back later :)</p>
      )}

      {/* <Pizza
        name="Pizza Prosciutto"
        ingredients="Tomato, mozarella, ham, aragula, and burrata cheese"
        photoName="pizzas/prosciutto.jpg"
        price={10}
      />

      <Pizza
        name="Pizza Salamino"
        ingredients="Tomato, mozarella, ham, aragula, and burrata cheese"
        photoName="pizzas/salamino.jpg"
        price={12}
      /> */}
    </main>
  );
}

function Pizza({ pizzaobj }) {
  // console.log(props);
  // if (pizzaobj.soldOut) return null;
  return (
    <li className={`pizza ${pizzaobj.soldOut ? "sold-out" : ""} `}>
      <img src={pizzaobj.photoName} alt={pizzaobj.name} />
      <div>
        <h3>{pizzaobj.name}</h3>
        <p>{pizzaobj.ingredients}</p>
        <span>{pizzaobj.soldOut ? "Sold Out" : pizzaobj.price + 3}</span>
      </div>
    </li>
  );
}

function Footer() {
  const hour = new Date().getHours();
  const openhr = 10;
  const closehr = 22;
  console.log(hour);
  const isopen = hour >= openhr && hour <= closehr;
  console.log(isopen);

  return (
    <footer className="footer">
      {isopen ? (
        <Order closehr={closehr} />
      ) : (
        <p>
          We are happy to welcome you between {openhr}:00 and {closehr}:00.
        </p>
      )}
    </footer>
  );
}

function Order({ closehr }) {
  // console.log(props);
  return (
    <div className="order">
      <p>We are open until {closehr}:00.Come and vist us.</p>
      <button className="btn">Order</button>
    </div>
  );
}

const root = ReactDom.createRoot(document.getElementById("root"));
root.render(<App />);
