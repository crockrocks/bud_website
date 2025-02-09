import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext/authContext";
import { CardContainer, CardBody, CardItem } from "./ui/3d-card";

const PersonalityCheck = ({ user }) => {
  const navigate = useNavigate();
  const [personalityType, setPersonalityType] = useState(null);

  useEffect(() => {
    const checkPersonality = async () => {
      try {
        if (!user) return;

        const token = await user.getIdToken();

        const response = await fetch("http://localhost:5000/api/get_personality", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch personality");
        }

        const data = await response.json();
        if (!data.personality_type) {
          navigate("/personality");
        } else {
          setPersonalityType(data.personality_type);
        }
      } catch (error) {
        console.error("Error checking personality:", error);
      }
    };

    checkPersonality();
  }, [user, navigate]);

  return null; 
};

const CharactersPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const characters = [
    {
      name: "BUD",
      description:
        "Of course, our very own BUD is here as your trusty AI companion, ready to assist you at any moment.",
      imageUrl: "/images/bud.png",
    },
    {
      name: "Luffy",
      description:
        "Join Luffy on his adventure and let his infectious enthusiasm brighten your day.",
      imageUrl: "/images/luffy.png",
    },
    {
      name: "Deadpool",
      description:
        "The Merc with a Mouth is here to add a touch of humor and wit to your interactions.",
      imageUrl: "/images/deadpool.png",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-900 dark:to-gray-800"
    >
      {/* Personality Check Component */}
      <PersonalityCheck user={user} />

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-200 dark:bg-green-800/20 rounded-full blur-3xl opacity-50" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-200 dark:bg-green-800/20 rounded-full blur-3xl opacity-50" />
        <div className="absolute top-1/4 left-1/4 w-60 h-60 bg-green-100 dark:bg-green-900/20 rounded-full blur-2xl opacity-30" />
      </div>

      {/* Main Content */}
      <div id="characters" className="container mx-auto px-4 py-12">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl lg:text-5xl font-bold text-green-700 dark:text-green-400 text-center mb-12"
        >
          Characters we offer:
        </motion.h1>

        {/* Character Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {characters.map((character, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <CardContainer className="relative group">
                <CardBody className="relative h-[500px] w-full max-w-[350px] rounded-2xl bg-white/50 dark:bg-gray-800/50 p-6 shadow-lg hover:shadow-xl transition-transform transform hover:scale-105">
                  {/* Character Name */}
                  <CardItem
                    translateZ="80"
                    className="w-full text-2xl font-bold text-green-700 dark:text-green-400 mb-4"
                  >
                    {character.name}
                  </CardItem>

                  {/* Character Image */}
                  <CardItem
                    translateZ="100"
                    rotateZ={5}
                    className="w-full h-60 relative mb-4 overflow-hidden rounded-lg"
                  >
                    <img
                      src={character.imageUrl}
                      alt={character.name}
                      className="object-cover w-full h-full transform-gpu group-hover:scale-110 transition-transform duration-500"
                    />
                  </CardItem>

                  {/* Character Description */}
                  <CardItem
                    translateZ="60"
                    className="text-gray-600 dark:text-gray-400 text-sm mb-6"
                  >
                    {character.description}
                  </CardItem>

                  {/* Actions */}
                  <div className="flex justify-between items-center mt-6">
                    <CardItem translateZ="40">
                      <a
                        href="#"
                        className="text-green-600 hover:text-green-700 dark:hover:text-green-400"
                      >
                        Know More →
                      </a>
                    </CardItem>

                    <CardItem translateZ="40">
                      <button
                        onClick={() =>
                          navigate(`/chat/${character.name.toLowerCase()}`)
                        }
                        className="px-6 py-3 text-white bg-green-600 rounded-full hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 shadow-md transition-all duration-300"
                      >
                        Try Now
                      </button>
                    </CardItem>
                  </div>
                </CardBody>
              </CardContainer>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default CharactersPage;
