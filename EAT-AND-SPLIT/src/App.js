import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Liki",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Vasavi",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Naveen",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [isopen, setisopen] = useState(false);
  const [friendlist, setfriendlist] = useState(initialFriends);
  const [selectedfrnd, setselectedfrnd] = useState(null);

  function addfriendintolist(frnd) {
    setfriendlist((f) => [...f, frnd]);
    setisopen(false);
  }

  function handleformopen() {
    setisopen((is) => !is);
  }

  function handleselect(frnd) {
    setselectedfrnd((s) => (selectedfrnd?.id === frnd.id ? null : frnd));
    setisopen(false);
  }

  function handlesplitbill(value) {
    setfriendlist((friends) =>
      friends.map((frnd) =>
        frnd.id === selectedfrnd?.id
          ? { ...frnd, balance: frnd.balance + value }
          : frnd
      )
    );
    setselectedfrnd(null);
  }
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friendlist={friendlist}
          onselection={handleselect}
          selectedfrnd={selectedfrnd}
        />
        <Formaddfriend formcontrol={isopen} addfrnd={addfriendintolist} />
        <Button onclick={handleformopen}>
          {!isopen ? "Add Friend" : "close"}
        </Button>
      </div>
      {selectedfrnd && (
        <Formsplitbill
          selectedfrnd={selectedfrnd}
          onsplitbill={handlesplitbill}
        />
      )}
    </div>
  );
}

function FriendsList({ friendlist, onselection, selectedfrnd }) {
  return (
    <ul>
      {friendlist.map((frnd) => (
        <Friend
          frnd={frnd}
          key={frnd.id}
          onselection={onselection}
          selectedfrnd={selectedfrnd}
        />
      ))}
    </ul>
  );
}

function Friend({ frnd, onselection, selectedfrnd }) {
  const isselected = frnd.id === selectedfrnd?.id;
  return (
    <li className={isselected ? `selected` : ``}>
      {/* <li> */}
      <img src={frnd.image} alt={frnd.name} />
      <h3>{frnd.name}</h3>
      {frnd.balance < 0 && (
        <p className="red ">
          You owe {frnd.name} {Math.abs(frnd.balance)}💸
        </p>
      )}
      {frnd.balance > 0 && (
        <p className="green ">
          {frnd.name} owes you {Math.abs(frnd.balance)}💸
        </p>
      )}
      {frnd.balance === 0 && <p>You and {frnd.name} are even</p>}
      <Button onclick={() => onselection(frnd)}>
        {isselected ? "close" : "select"}
      </Button>
    </li>
  );
}

function Button({ onclick, children }) {
  return (
    <button className="button" onClick={onclick}>
      {children}
    </button>
  );
}

function Formaddfriend({ formcontrol, addfrnd }) {
  const [frndname, setfrndname] = useState("");
  const [img, setimg] = useState("https://i.pravatar.cc/48");
  function handleaddform(e) {
    e.preventDefault();
    if (!frndname) return;

    const id = crypto.randomUUID();
    const frnd = {
      id,
      name: frndname,
      image: `${img}?=${id}`,
      balance: 0,
    };
    addfrnd(frnd);
    setfrndname("");
    setimg("https://i.pravatar.cc/48");
  }
  return (
    <>
      {formcontrol && (
        <form className="form-add-friend" onSubmit={handleaddform}>
          <label>✌️Friendname</label>
          <input
            type="text"
            value={frndname}
            onChange={(e) => setfrndname((s) => e.target.value)}
          />
          <label>🏞️ Image URL</label>
          <input
            type="text"
            value={img}
            onChange={(e) => setimg(e.target.value)}
          />
          <Button>Add</Button>
        </form>
      )}
    </>
  );
}

function Formsplitbill({ selectedfrnd, onsplitbill }) {
  const [billvalue, setBillvalue] = useState("");
  const [paidbyuser, setPaidbyuser] = useState("");
  const [paying, setPaying] = useState("user");
  const paidbyfrnd = billvalue ? billvalue - paidbyuser : "";

  function handlesplitbill(e) {
    e.preventDefault();
    if (!billvalue || !paidbyuser) return;
    onsplitbill(paying === "user" ? paidbyfrnd : -paidbyuser);
  }
  return (
    <form className="form-split-bill" onSubmit={handlesplitbill}>
      <h2>Split a bill with {selectedfrnd.name}</h2>
      <label>💰 Bill value</label>
      <input
        type="text"
        value={billvalue}
        onChange={(e) => setBillvalue(Number(e.target.value))}
      />
      <label>🧔‍♂️Your expense</label>
      <input
        type="text"
        value={paidbyuser}
        onChange={(e) =>
          setPaidbyuser(
            Number(e.target.value) > billvalue
              ? paidbyuser
              : Number(e.target.value)
          )
        }
      />
      <label>🧑‍🤝‍🧑 {selectedfrnd.name}'s expense</label>
      <input type="text" disabled value={paidbyfrnd} />
      <label>🤑Who is paying the bill</label>
      <select value={paying} onChange={(e) => setPaying(e.target.value)}>
        <option value="user">You</option>
        <option value="frnd">{selectedfrnd.name}</option>
      </select>
      <Button>Split bill</Button>
    </form>
  );
}
