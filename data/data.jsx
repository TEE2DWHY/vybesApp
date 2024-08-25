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

const recentConversations = [
  {
    id: "1",
    username: "@AlexRoxy",
    status: "I would like to know you more",
    time: "12:24pm",
    badge: "Vyber",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    tick: "single",
  },
  {
    id: "2",
    username: "@BellaSun",
    status: "I would like to know you more",
    time: "12:24pm",
    badge: "Baddie",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    tick: "double",
  },
  {
    id: "3",
    username: "@ChrisStar",
    status: "I would like to know you more",
    time: "12:24pm",
    badge: "Baddie",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    tick: "single",
  },
  {
    id: "4",
    username: "@DianaLane",
    status: "I would like to know you more",
    time: "12:24pm",
    badge: "Vyber",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    tick: "double",
  },
  {
    id: "5",
    username: "@EveRose",
    status: "I would like to know you more",
    time: "12:24pm",
    badge: "Baddie",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    tick: "single",
  },
  {
    id: "6",
    username: "@FrankWolf",
    status: "I would like to know you more",
    time: "12:24pm",
    badge: "Vyber",
    image: "https://randomuser.me/api/portraits/men/6.jpg",
    tick: "double",
  },
  {
    id: "7",
    username: "@GraceWillow",
    status: "I would like to know you more",
    time: "12:24pm",
    badge: "Baddie",
    image: "https://randomuser.me/api/portraits/women/7.jpg",
    tick: "single",
  },
  {
    id: "8",
    username: "@HarryStone",
    status: "I would like to know you more",
    time: "12:24pm",
    badge: "Vyber",
    image: "https://randomuser.me/api/portraits/men/8.jpg",
    tick: "double",
  },
  {
    id: "9",
    username: "@IvyBrook",
    status: "I would like to know you more",
    time: "12:24pm",
    badge: "Baddie",
    image: "https://randomuser.me/api/portraits/women/9.jpg",
    tick: "single",
  },
  {
    id: "10",
    username: "@JackWest",
    status: "I would like to know you more",
    time: "12:24pm",
    badge: "Vyber",
    image: "https://randomuser.me/api/portraits/men/10.jpg",
    tick: "double",
  },
];

const storiesData = [
  {
    id: 1,
    imageUrl:
      "https://images.unsplash.com/photo-1540324155974-7523202daa3f?q=80&w=2815&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    postedAt: "30 Minutes Ago",
  },
  {
    id: 2,
    imageUrl:
      "https://images.unsplash.com/photo-1631947430066-48c30d57b943?q=80&w=2816&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    postedAt: "1 Hours Ago",
  },
  {
    id: 3,
    imageUrl:
      "https://images.unsplash.com/photo-1599457382197-820d65b8bbdc?q=80&w=3088&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    postedAt: "2 Hours Ago",
  },
  {
    id: 4,
    imageUrl:
      "https://images.unsplash.com/photo-1561158317-757a4631770e?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    postedAt: "3 Hours Ago",
  },
  {
    id: 5,
    imageUrl:
      "https://images.unsplash.com/photo-1643185539104-3622eb1f0ff6?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    postedAt: "4 Hours Ago",
  },
  {
    id: 6,
    imageUrl:
      "https://images.unsplash.com/photo-1485872299829-c673f5194813?q=80&w=2054&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    postedAt: "5 Hours Ago",
  },
  {
    id: 7,
    imageUrl:
      "https://images.unsplash.com/photo-1516450137517-162bfbeb8dba?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    postedAt: "6 Hours Ago",
  },
  {
    id: 8,
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1670740580828-9f6b0526d830?q=80&w=3088&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    postedAt: "7 Hours Ago",
  },
  {
    id: 9,
    imageUrl:
      "https://images.unsplash.com/photo-1562007900-a6aae8e4f07d?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    postedAt: "8 Hours Ago",
  },
  {
    id: 10,
    imageUrl:
      "https://images.unsplash.com/photo-1534366352488-8b7b5f205086?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    postedAt: "9 Hours Ago",
  },
];

export {
  users,
  withdrawalData,
  depositData,
  convertedCoinsData,
  receivedCoinsData,
  transferredCoinsData,
  recentConversations,
  storiesData,
};
