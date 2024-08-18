import moana from "../assets/images/moana.png";
import esther from "../assets/images/esther.png";
import mina from "../assets/images/mina.png";
import bella from "../assets/images/bella.png";
import bisola from "../assets/images/bisola.png";
import gold from "../assets/images/gold.png";
import ella from "../assets/images/ella.png";
import janie from "../assets/images/janie.png";
import crystabel from "../assets/images/crystabel.png";
import maryam from "../assets/images/maryam.png";

const users = [
  {
    img: moana,
    username: "Vyber",
    firstName: "Moana",
    age: 25,
    state: "Abeokuta",
    country: "Nigeria",
  },
  {
    img: esther,
    username: "Baddie",
    firstName: "Esther",
    age: 21,
    state: "Abeokuta",
    country: "Nigeria",
  },
  {
    img: mina,
    username: "Baddie",
    firstName: "Munachi",
    age: 27,
    state: "Abeokuta",
    country: "Nigeria",
  },
  {
    img: bella,
    username: "Vyber",
    firstName: "Elizabeth",
    age: 24,
    state: "Abeokuta",
    country: "Nigeria",
  },
  {
    img: bisola,
    username: "Vyber",
    firstName: "Bisola",
    age: 22,
    state: "Lagos",
    country: "Nigeria",
  },
  {
    img: gold,
    username: "Baddie",
    firstName: "Gold",
    age: 21,
    state: "Abeokuta",
    country: "Nigeria",
  },
  {
    img: maryam,
    username: "Baddie",
    firstName: "Maryam",
    age: 21,
    state: "Abeokuta",
    country: "Nigeria",
  },
  {
    img: janie,
    username: "Baddie",
    firstName: "Janie",
    age: 20,
    state: "Abeokuta",
    country: "Nigeria",
  },
  {
    img: ella,
    username: "Baddie",
    firstName: "Ella",
    age: 25,
    state: "Abeokuta",
    country: "Nigeria",
  },
  {
    img: crystabel,
    username: "Baddie",
    firstName: "Crystabl",
    age: 19,
    state: "Abeokuta",
    country: "Nigeria",
  },
];
const withdrawalData = [
  {
    id: 1,
    type: "Withdrawal",
    amount: "-#500,000",
    date: "12-03-2024 16:09",
  },
  {
    id: 2,
    type: "Withdrawal",
    amount: "-#500,000",
    date: "12-03-2024 16:09",
  },
  {
    id: 3,
    type: "Withdrawal",
    amount: "-#500,000",
    date: "12-03-2024 16:09",
  },
  {
    id: 4,
    type: "Withdrawal",
    amount: "-#500,000",
    date: "12-03-2024 16:09",
  },
  {
    id: 5,
    type: "Withdrawal",
    amount: "-#500,000",
    date: "12-03-2024 16:09",
  },
];

const depositData = [
  { id: 1, type: "Deposit", amount: "+#500,000", date: "12-03-2024 16:09" },
  { id: 2, type: "Deposit", amount: "+#500,000", date: "12-03-2024 16:09" },
  { id: 3, type: "Deposit", amount: "+#500,000", date: "12-03-2024 16:09" },
  { id: 4, type: "Deposit", amount: "+#500,000", date: "12-03-2024 16:09" },
  { id: 5, type: "Deposit", amount: "+#500,000", date: "12-03-2024 16:09" },
];

const convertedCoinsData = [
  {
    id: 1,
    type: "Deposit",
    amount: "+50 VybeCoins ",
    date: "12-03-2024 16:09",
  },
  {
    id: 2,
    type: "Deposit",
    amount: "+50 VybeCoins ",
    date: "12-03-2024 16:09",
  },
  {
    id: 3,
    type: "Deposit",
    amount: "+50 VybeCoins ",
    date: "12-03-2024 16:09",
  },
  {
    id: 4,
    type: "Deposit",
    amount: "+50 VybeCoins ",
    date: "12-03-2024 16:09",
  },
  {
    id: 5,
    type: "Deposit",
    amount: "+50 VybeCoins ",
    date: "12-03-2024 16:09",
  },
];

const receivedCoinsData = [
  {
    id: 1,
    to: "@Adetola_123",
    amount: "+50 Vybe Coin",
    date: "12-03-2024 16:09",
  },
  {
    id: 2,
    to: "@Adetola_123",
    amount: "+40 Vybe Coin",
    date: "13-03-2024 09:09",
  },
  {
    id: 3,
    to: "@Adetola_123",
    amount: "+250 Vybe Coin",
    date: "14-03-2024 11:09",
  },
  {
    id: 4,
    to: "@Adetola_123",
    amount: "+100 Vybe Coin",
    date: "15-03-2024 17:09",
  },
  {
    id: 5,
    to: "@Adetola_123",
    amount: "+1710 Vybe Coin",
    date: "16-03-2024 20:09",
  },
  {
    id: 6,
    to: "@Adetola_123",
    amount: "+120 Vybe Coin",
    date: "17-03-2024 21:09",
  },
  {
    id: 7,
    to: "@Adetola_123",
    amount: "+10 Vybe Coin",
    date: "18-03-2024 22:09",
  },
];

const transferredCoinsData = [
  {
    id: 1,
    to: "@Adetola_123",
    amount: "-50 Vybe Coin",
    date: "12-03-2024 16:09",
  },
  {
    id: 2,
    to: "@Adetola_123",
    amount: "-40 Vybe Coin",
    date: "13-03-2024 09:09",
  },
  {
    id: 3,
    to: "@Adetola_123",
    amount: "-250 Vybe Coin",
    date: "14-03-2024 11:09",
  },
  {
    id: 4,
    to: "@Adetola_123",
    amount: "-100 Vybe Coin",
    date: "15-03-2024 17:09",
  },
  {
    id: 5,
    to: "@Adetola_123",
    amount: "-1710 Vybe Coin",
    date: "16-03-2024 20:09",
  },
  {
    id: 6,
    to: "@Adetola_123",
    amount: "-120 Vybe Coin",
    date: "17-03-2024 21:09",
  },
  {
    id: 7,
    to: "@Adetola_123",
    amount: "-10 Vybe Coin",
    date: "18-03-2024 22:09",
  },
];

export {
  users,
  withdrawalData,
  depositData,
  convertedCoinsData,
  receivedCoinsData,
  transferredCoinsData,
};
