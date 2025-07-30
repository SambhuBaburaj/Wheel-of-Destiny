import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import BaseWheel from '../Wheels/BaseWheel';
import { getSavedCharacters } from '../../data/savedCharacters';
import { calculateTotalPower } from '../../utils/powerCalculations';

const OpponentContainer = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  margin: 2rem 0;
  border: 1px solid rgba(255, 255, 255, 0.2);
  text-align: center;
`;

const OpponentTitle = styled.h2`
  color: #ffd700;
  font-size: 2.5rem;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

const OpponentDescription = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.2rem;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
`;

const CharacterPoolStats = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 1rem;
  text-align: center;
  min-width: 120px;
`;

const StatValue = styled.div`
  color: #ffd700;
  font-size: 1.8rem;
  font-weight: bold;
`;

const StatLabel = styled.div`
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  margin-top: 0.5rem;
`;

const SelectedOpponent = styled(motion.div)`
  background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
  color: #333;
  padding: 2rem;
  border-radius: 20px;
  margin-top: 2rem;
  box-shadow: 0 8px 32px rgba(255, 215, 0, 0.3);
`;

const OpponentName = styled.h3`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const OpponentDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

const DetailCard = styled.div`
  background: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 1rem;
  text-align: left;
`;

const DetailTitle = styled.div`
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #333;
`;

const DetailContent = styled.div`
  font-size: 0.9rem;
  color: #555;
  line-height: 1.3;
`;

const OpponentSelection = ({ playerCharacter, onOpponentSelected }) => {
  const [savedCharacters, setSavedCharacters] = useState([]);
  const [selectedOpponent, setSelectedOpponent] = useState(null);
  const [wheelData, setWheelData] = useState([]);
  const [isSpinning, setIsSpinning] = useState(false);

  useEffect(() => {
    const characters = getSavedCharacters();
    setSavedCharacters(characters);
    
    // Create wheel data with power-based probability
    const playerPower = calculateTotalPower(playerCharacter).totalPower;
    
    const wheelItems = characters.map(char => {
      const powerDiff = Math.abs(char.totalPower - playerPower);
      
      // Higher probability for opponents with similar power levels
      let probability;
      if (powerDiff < 100) probability = 25; // Very close match
      else if (powerDiff < 200) probability = 20; // Close match  
      else if (powerDiff < 300) probability = 15; // Moderate match
      else if (powerDiff < 500) probability = 10; // Distant match
      else probability = 5; // Very distant match
      
      return {
        name: char.name,
        probability,
        description: `${char.race?.main} ${char.race?.subRace} - Power: ${char.totalPower}`,
        character: char,
        color: getPowerColor(char.totalPower)
      };
    });
    
    setWheelData(wheelItems);
  }, [playerCharacter]);

  const getPowerColor = (power) => {
    if (power > 800) return '#FF6B6B'; // Legendary
    if (power > 600) return '#4ECDC4'; // Epic
    if (power > 400) return '#45B7D1'; // Rare
    return '#96CEB4'; // Common
  };

  const getPoolStats = () => {
    if (savedCharacters.length === 0) return { total: 0, avgPower: 0, strongest: 0, weakest: 0 };
    
    const powers = savedCharacters.map(char => char.totalPower);
    return {
      total: savedCharacters.length,
      avgPower: Math.round(powers.reduce((sum, p) => sum + p, 0) / powers.length),
      strongest: Math.max(...powers),
      weakest: Math.min(...powers)
    };
  };

  const handleOpponentSelected = (selectedItem) => {
    setSelectedOpponent(selectedItem.character);
    setIsSpinning(false);
    
    // Pass selected opponent to parent after a short delay
    setTimeout(() => {
      if (onOpponentSelected) {
        onOpponentSelected(selectedItem.character);
      }
    }, 2000);
  };

  const stats = getPoolStats();

  if (selectedOpponent) {
    return (
      <SelectedOpponent
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <OpponentName>🎯 Opponent Selected! 🎯</OpponentName>
        <h4 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#333' }}>
          {selectedOpponent.name}
        </h4>
        
        <OpponentDetails>
          <DetailCard>
            <DetailTitle>🏰 Race & Class</DetailTitle>
            <DetailContent>
              {selectedOpponent.race?.main} - {selectedOpponent.race?.subRace}
            </DetailContent>
          </DetailCard>
          
          <DetailCard>
            <DetailTitle>⚡ Powers</DetailTitle>
            <DetailContent>
              <div>{selectedOpponent.powers?.raceSpecific?.name}</div>
              <div>{selectedOpponent.powers?.general?.name}</div>
              <div>{selectedOpponent.powers?.memePower?.name}</div>
            </DetailContent>
          </DetailCard>
          
          <DetailCard>
            <DetailTitle>⚔️ Weapon</DetailTitle>
            <DetailContent>{selectedOpponent.weapon?.name || 'None'}</DetailContent>
          </DetailCard>
          
          <DetailCard>
            <DetailTitle>📊 Total Power</DetailTitle>
            <DetailContent style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#333' }}>
              {selectedOpponent.totalPower}
            </DetailContent>
          </DetailCard>
        </OpponentDetails>
        
        <div style={{ marginTop: '1.5rem', fontSize: '1.1rem', color: '#555' }}>
          Preparing for battle...
        </div>
      </SelectedOpponent>
    );
  }

  return (
    <OpponentContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <OpponentTitle>🎯 Choose Your Opponent</OpponentTitle>
      
      <OpponentDescription>
        Your character is complete! Now spin the wheel to select a worthy opponent from the 
        pool of saved characters. The wheel is weighted to favor opponents with similar power levels 
        for more balanced battles.
      </OpponentDescription>

      <CharacterPoolStats>
        <StatCard>
          <StatValue>{stats.total}</StatValue>
          <StatLabel>Available Opponents</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{stats.avgPower}</StatValue>
          <StatLabel>Average Power</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{stats.strongest}</StatValue>
          <StatLabel>Strongest</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{stats.weakest}</StatValue>
          <StatLabel>Weakest</StatLabel>
        </StatCard>
      </CharacterPoolStats>

      <div style={{ maxWidth: '500px', margin: '0 auto' }}>
        <BaseWheel
          items={wheelData}
          onSpinComplete={handleOpponentSelected}
          isSpinning={isSpinning}
          title="🎲 Opponent Selection Wheel"
          disabled={wheelData.length === 0}
        />
      </div>

      {wheelData.length === 0 && (
        <div style={{ 
          color: 'rgba(255, 255, 255, 0.8)', 
          fontSize: '1.1rem', 
          marginTop: '2rem' 
        }}>
          No opponents available. Complete more characters to build the opponent pool!
        </div>
      )}

      <div style={{ 
        marginTop: '2rem', 
        color: 'rgba(255, 255, 255, 0.7)', 
        fontSize: '0.9rem' 
      }}>
        💡 Tip: The wheel gives higher chances to opponents with similar power levels for balanced fights!
      </div>
    </OpponentContainer>
  );
};

export default OpponentSelection;