import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import BaseWheel from '../Wheels/BaseWheel';

const BattleContainer = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  margin: 2rem 0;
  border: 1px solid rgba(255, 255, 255, 0.2);
  text-align: center;
`;

const BattleTitle = styled.h2`
  color: #FF6B6B;
  font-size: 3rem;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  background: linear-gradient(45deg, #FF6B6B, #FF8E53);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const BattleDescription = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.2rem;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
`;

const BattleWheel = styled.div`
  max-width: 500px;
  margin: 0 auto;
`;

const OddsDisplay = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 2rem 0;
  gap: 2rem;
`;

const PlayerOdds = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 1.5rem;
  flex: 1;
  border: 2px solid rgba(255, 255, 255, 0.2);
`;

const OddsTitle = styled.h3`
  color: white;
  margin-bottom: 1rem;
  font-size: 1.3rem;
`;

const OddsValue = styled.div`
  color: #ffd700;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const OddsSubtext = styled.div`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
`;

const BattleResult = styled(motion.div)`
  background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
  color: #333;
  padding: 2rem;
  border-radius: 20px;
  margin-top: 2rem;
  box-shadow: 0 8px 32px rgba(255, 215, 0, 0.3);
`;

const ResultTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const ResultDescription = styled.p`
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;

const FinalBattle = ({ player1, player2, comparison, onBattleComplete }) => {
  const [battleResult, setBattleResult] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);

  // Create battle wheel segments based on win probabilities
  const battleSegments = [
    {
      name: "Player 1 Wins!",
      probability: comparison.char1WinProbability,
      description: `${player1.race?.main || 'Player 1'} emerges victorious!`,
      color: '#4ECDC4',
      winner: 1
    },
    {
      name: "Player 2 Wins!",
      probability: comparison.char2WinProbability,
      description: `${player2.race?.main || 'Player 2'} claims victory!`,
      color: '#FF6B6B',
      winner: 2
    }
  ];

  const handleBattleComplete = (result) => {
    setBattleResult(result);
    setIsSpinning(false);
    
    // Notify parent component of battle completion
    setTimeout(() => {
      if (onBattleComplete) {
        onBattleComplete(result.winner);
      }
    }, 3000); // Wait 3 seconds before transitioning
  };

  const handleBattleStart = () => {
    setIsSpinning(true);
  };

  const getCharacterTitle = (character) => {
    const parts = [];
    if (character.race?.main) parts.push(character.race.main);
    if (character.race?.subRace) parts.push(character.race.subRace);
    if (character.powers?.memePower?.movie) {
      parts.push(`(${character.powers.memePower.movie} Style)`);
    }
    return parts.join(' ') || 'Unknown Fighter';
  };

  const getBattleDescription = () => {
    const char1Title = getCharacterTitle(player1);
    const char2Title = getCharacterTitle(player2);
    
    return `The ${char1Title} faces off against the ${char2Title} in an epic battle of destiny! The wheel of fate will determine the ultimate victor in this clash of titans!`;
  };

  if (battleResult) {
    return (
      <BattleResult
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <ResultTitle>🎉 {battleResult.name} 🎉</ResultTitle>
        <ResultDescription>{battleResult.description}</ResultDescription>
        <div style={{ fontSize: '3rem', margin: '1rem 0' }}>
          {battleResult.winner === 1 ? '👑' : '🏆'}
        </div>
        <div style={{ fontSize: '1.1rem', opacity: 0.8 }}>
          The battle has concluded! Preparing victory celebration...
        </div>
      </BattleResult>
    );
  }

  return (
    <BattleContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <BattleTitle>⚔️ FINAL BATTLE ⚔️</BattleTitle>
      
      <BattleDescription>
        {getBattleDescription()}
      </BattleDescription>

      <OddsDisplay>
        <PlayerOdds
          whileHover={{ scale: 1.02 }}
          style={{ 
            borderColor: comparison.char1WinProbability > 50 ? '#ffd700' : 'rgba(255, 255, 255, 0.2)' 
          }}
        >
          <OddsTitle>Player 1</OddsTitle>
          <div style={{ color: 'rgba(255, 255, 255, 0.8)', marginBottom: '1rem', fontSize: '1rem' }}>
            {getCharacterTitle(player1)}
          </div>
          <OddsValue>{comparison.char1WinProbability}%</OddsValue>
          <OddsSubtext>
            Power: {comparison.char1Power}
            {comparison.char1WinProbability > 50 && <div style={{ color: '#ffd700', marginTop: '0.5rem' }}>⭐ Favorite</div>}
          </OddsSubtext>
        </PlayerOdds>

        <PlayerOdds
          whileHover={{ scale: 1.02 }}
          style={{ 
            borderColor: comparison.char2WinProbability > 50 ? '#ffd700' : 'rgba(255, 255, 255, 0.2)' 
          }}
        >
          <OddsTitle>Player 2</OddsTitle>
          <div style={{ color: 'rgba(255, 255, 255, 0.8)', marginBottom: '1rem', fontSize: '1rem' }}>
            {getCharacterTitle(player2)}
          </div>
          <OddsValue>{comparison.char2WinProbability}%</OddsValue>
          <OddsSubtext>
            Power: {comparison.char2Power}
            {comparison.char2WinProbability > 50 && <div style={{ color: '#ffd700', marginTop: '0.5rem' }}>⭐ Favorite</div>}
          </OddsSubtext>
        </PlayerOdds>
      </OddsDisplay>

      <BattleWheel>
        <BaseWheel
          items={battleSegments}
          onSpinComplete={handleBattleComplete}
          isSpinning={isSpinning}
          title="🎯 WHEEL OF DESTINY 🎯"
          disabled={false}
        />
      </BattleWheel>

      {!isSpinning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          style={{ marginTop: '2rem' }}
        >
          <div style={{ 
            color: 'rgba(255, 255, 255, 0.8)', 
            fontSize: '1.1rem', 
            marginBottom: '1rem' 
          }}>
            The larger the wheel segment, the higher the chance of victory!
          </div>
          
          {Math.abs(comparison.char1WinProbability - comparison.char2WinProbability) < 10 && (
            <div style={{ 
              color: '#ffd700', 
              fontSize: '1rem', 
              fontWeight: 'bold',
              marginTop: '1rem' 
            }}>
              ⚡ This battle is too close to call! ⚡
            </div>
          )}
        </motion.div>
      )}
    </BattleContainer>
  );
};

export default FinalBattle;