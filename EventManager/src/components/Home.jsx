import React from 'react'
import Nav from './Nav'
import EventCard from './landing/EventCard'
import test1 from '../assets/test1.jpg';
import test2 from '../assets/test2.jpg';

const testEvents = [
  {
    title: "ReactJS Bootcamp",
    description: "Learn ReactJS from scratch and build amazing web applications.",
    images: [test1, test2],
    date: "2025-06-01T09:00:00",
    distance: 15,
    cost: 150,
  },
  {
    title: "Node.js for Beginners",
    description: "Join us to learn the basics of Node.js and how to build server-side applications.",
    images: [test1, test2],
    date: "2025-06-05T14:00:00",
    distance: 20,
    cost: 120,
  },
  {
    title: "Full Stack Developer Meetup",
    description: "A meetup for full-stack developers to network and share knowledge.",
    images: [test1, test2],
    date: "2025-07-10T18:00:00",
    distance: 25,
    cost: 180,
  },
  {
    title: "UI/UX Design Workshop",
    description: "A hands-on workshop to improve your UI/UX design skills and learn industry best practices.",
    images: [test1, test2],
    date: "2025-06-15T10:00:00",
    distance: 30,
    cost: 100,
  },
  {
    title: "Blockchain and Cryptography Meetup",
    description: "An event to explore the world of blockchain and cryptography with experts.",
    images: [test1, test2],
    date: "2025-06-25T13:30:00",
    distance: 40,
    cost: 250,
  },
  {
    title: "Machine Learning Conference",
    description: "Join the best minds in AI and ML to discuss the future of technology and data science.",
    images: [test1, test2],
    date: "2025-08-01T09:30:00",
    distance: 50,
    cost: 300,
  },
  {
    title: "Cloud Computing Seminar",
    description: "A seminar on cloud technologies and their applications in modern businesses.",
    images: [test1, test2],
    date: "2025-07-20T12:00:00",
    distance: 60,
    cost: 220,
  },
  {
    title: "Frontend Developer Meetup",
    description: "A meetup for frontend developers to discuss trends, tools, and technologies in web development.",
    images: [test1, test2],
    date: "2025-09-05T11:00:00",
    distance: 35,
    cost: 130,
  },
  {
    title: "AI for Business Workshop",
    description: "Learn how AI can be leveraged for business applications and improve business processes.",
    images: [test1, test2],
    date: "2025-07-30T15:00:00",
    distance: 45,
    cost: 260,
  },
  {
    title: "Cybersecurity Awareness Session",
    description: "A session to understand the basics of cybersecurity and how to protect your data.",
    images: [test1, test2],
    date: "2025-08-15T10:00:00",
    distance: 10,
    cost: 180,
  },
];




const Test = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Nav />
      <div className="flex flex-wrap justify-center gap-12">
        {testEvents.map((event, index) => (
          <EventCard key={index} event={event} />
        ))}
      </div>
    </div>
  );
};

export default Test
