import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const NameEntryContainer = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 3rem;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
  max-width: 500px;
  margin: 0 auto;
`;

const Title = styled.h1`
  color: #ffd700;
  font-size: 2.5rem;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

const Subtitle = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.2rem;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const InputContainer = styled.div`
  margin-bottom: 2rem;
`;

const NameInput = styled.input`
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 15px;
  padding: 1rem 1.5rem;
  font-size: 1.2rem;
  color: white;
  text-align: center;
  width: 100%;
  max-width: 300px;
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #ffd700;
    box-shadow: 0 0 20px rgba(255, 215, 0, 0.3);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
`;

const StartButton = styled(motion.button)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 25px;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  min-width: 200px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    box-shadow: none;
  }
`;

const CharacterCounter = styled.div`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  margin-top: 0.5rem;
`;

const ExampleNames = styled.div`
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
`;

const ExampleTitle = styled.div`
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const ExampleNamesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
`;

const ExampleName = styled.span`
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 215, 0, 0.2);
    color: #ffd700;
  }
`;

const PlayerNameEntry = ({ onNameSubmit }) => {
  const [playerName, setPlayerName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const exampleNames = [
    'Arjun', 'Priya', 'Ravi', 'Meera', 'Kiran', 'Deepika', 
    'Vikram', 'Ananya', 'Rohit', 'Kavya', 'Arun', 'Shreya'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!playerName.trim() || playerName.trim().length < 2) return;

    setIsSubmitting(true);
    
    // Add a small delay for smooth transition
    setTimeout(() => {
      onNameSubmit(playerName.trim());
    }, 500);
  };

  const handleExampleNameClick = (name) => {
    setPlayerName(name);
  };

  const isValidName = playerName.trim().length >= 2 && playerName.trim().length <= 20;

  return (
    <NameEntryContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.8 }}
    >
      <Title>🎭 Welcome, Hero! 🎭</Title>
      <Subtitle>
        Before we begin your legendary journey through the Wheel of Destiny, 
        tell us your name so we can properly chronicle your adventures!
      </Subtitle>

      <form onSubmit={handleSubmit}>
        <InputContainer>
          <NameInput
            type="text"
            placeholder="Enter your name..."
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            maxLength={20}
            autoFocus
            disabled={isSubmitting}
          />
          <CharacterCounter>
            {playerName.length}/20 characters
            {playerName.length < 2 && playerName.length > 0 && (
              <span style={{ color: '#ff6b6b', marginLeft: '0.5rem' }}>
                (minimum 2 characters)
              </span>
            )}
          </CharacterCounter>
        </InputContainer>

        <StartButton
          type="submit"
          disabled={!isValidName || isSubmitting}
          whileHover={isValidName ? { scale: 1.05 } : {}}
          whileTap={isValidName ? { scale: 0.95 } : {}}
        >
          {isSubmitting ? 'Starting Adventure...' : 'Begin Your Destiny! 🎡'}
        </StartButton>
      </form>

      <ExampleNames>
        <ExampleTitle>💡 Need inspiration? Try one of these:</ExampleTitle>
        <ExampleNamesList>
          {exampleNames.map((name, index) => (
            <ExampleName
              key={index}
              onClick={() => handleExampleNameClick(name)}
            >
              {name}
            </ExampleName>
          ))}
        </ExampleNamesList>
      </ExampleNames>
    </NameEntryContainer>
  );
};

export default PlayerNameEntry;