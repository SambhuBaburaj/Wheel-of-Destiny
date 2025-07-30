import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { compareCharacters } from '../../utils/powerCalculations';

const ComparisonContainer = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  margin: 2rem 0;
  border: 1px solid rgba(255, 255, 255, 0.2);
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
`;

const ComparisonTitle = styled.h2`
  color: #ffd700;
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

const PlayersContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 2rem;
  align-items: center;
  margin-bottom: 2rem;
`;

const PlayerColumn = styled.div`
  text-align: ${props => props.align || 'center'};
`;

const VSIndicator = styled.div`
  background: linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%);
  color: white;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: bold;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
`;

const PlayerName = styled.h3`
  color: white;
  font-size: 1.8rem;
  margin-bottom: 1rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
`;

const PowerDisplay = styled.div`
  background: ${props => props.isWinner ? 
    'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)' :
    'rgba(255, 255, 255, 0.1)'
  };
  color: ${props => props.isWinner ? '#333' : 'white'};
  padding: 1.5rem;
  border-radius: 15px;
  text-align: center;
  border: 2px solid ${props => props.isWinner ? '#ffd700' : 'rgba(255, 255, 255, 0.2)'};
  box-shadow: ${props => props.isWinner ? '0 0 20px rgba(255, 215, 0, 0.3)' : 'none'};
`;

const PowerValue = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const PowerLabel = styled.div`
  font-size: 1.1rem;
  opacity: 0.8;
`;

const WinProbability = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 1rem;
  margin: 1rem 0;
  text-align: center;
`;

const ProbabilityBar = styled.div`
  height: 30px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  overflow: hidden;
  position: relative;
  margin: 1rem 0;
`;

const ProbabilityFill = styled(motion.div)`
  height: 100%;
  background: linear-gradient(135deg, #4ECDC4 0%, #44A08D 100%);
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
`;

const StatsComparison = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-top: 2rem;
`;

const StatComparisonCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  padding: 1rem;
  text-align: center;
`;

const StatName = styled.div`
  color: #ffd700;
  font-weight: bold;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
`;

const StatValues = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StatValue = styled.div`
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
`;

const StatDivider = styled.div`
  color: rgba(255, 255, 255, 0.5);
  font-size: 1rem;
`;

const WinnerBadge = styled(motion.div)`
  background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
  color: #333;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  font-weight: bold;
  display: inline-block;
  margin-top: 1rem;
  box-shadow: 0 4px 12px rgba(255, 215, 0, 0.3);
`;

const PowerComparison = ({ player1, player2, comparison, showWinner = false }) => {
  const comparisonData = comparison || compareCharacters(player1, player2);
  
  const getCharacterSummary = (character) => {
    const parts = [];
    if (character.race?.main) parts.push(character.race.main);
    if (character.race?.subRace) parts.push(character.race.subRace);
    return parts.join(' ');
  };

  return (
    <ComparisonContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <ComparisonTitle>⚔️ POWER COMPARISON ⚔️</ComparisonTitle>
      
      <PlayersContainer>
        <PlayerColumn align="center">
          <PlayerName>Player 1</PlayerName>
          <div style={{ color: 'rgba(255, 255, 255, 0.8)', marginBottom: '1rem', fontSize: '1.1rem' }}>
            {getCharacterSummary(player1)}
          </div>
          <PowerDisplay isWinner={comparisonData.char1Power > comparisonData.char2Power && showWinner}>
            <PowerValue>{comparisonData.char1Power}</PowerValue>
            <PowerLabel>Total Power</PowerLabel>
            {showWinner && comparisonData.char1Power > comparisonData.char2Power && (
              <WinnerBadge
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: 'spring' }}
              >
                🏆 WINNER
              </WinnerBadge>
            )}
          </PowerDisplay>
        </PlayerColumn>
        
        <VSIndicator>VS</VSIndicator>
        
        <PlayerColumn align="center">
          <PlayerName>Player 2</PlayerName>
          <div style={{ color: 'rgba(255, 255, 255, 0.8)', marginBottom: '1rem', fontSize: '1.1rem' }}>
            {getCharacterSummary(player2)}
          </div>
          <PowerDisplay isWinner={comparisonData.char2Power > comparisonData.char1Power && showWinner}>
            <PowerValue>{comparisonData.char2Power}</PowerValue>
            <PowerLabel>Total Power</PowerLabel>
            {showWinner && comparisonData.char2Power > comparisonData.char1Power && (
              <WinnerBadge
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: 'spring' }}
              >
                🏆 WINNER
              </WinnerBadge>
            )}
          </PowerDisplay>
        </PlayerColumn>
      </PlayersContainer>

      {!showWinner && (
        <WinProbability>
          <div style={{ color: 'white', marginBottom: '1rem', fontSize: '1.2rem', fontWeight: 'bold' }}>
            Battle Odds
          </div>
          <ProbabilityBar>
            <ProbabilityFill
              initial={{ width: '50%' }}
              animate={{ width: `${comparisonData.char1WinProbability}%` }}
              transition={{ duration: 2, delay: 0.5 }}
            >
              {comparisonData.char1WinProbability}%
            </ProbabilityFill>
          </ProbabilityBar>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'rgba(255, 255, 255, 0.8)' }}>
            <span>Player 1: {comparisonData.char1WinProbability}%</span>
            <span>Player 2: {comparisonData.char2WinProbability}%</span>
          </div>
        </WinProbability>
      )}

      <StatsComparison>
        {['strength', 'intelligence', 'speed', 'magic'].map(stat => (
          <StatComparisonCard key={stat}>
            <StatName>
              {stat === 'strength' && '💪'} 
              {stat === 'intelligence' && '🧠'} 
              {stat === 'speed' && '⚡'} 
              {stat === 'magic' && '✨'} 
              {stat.charAt(0).toUpperCase() + stat.slice(1)}
            </StatName>
            <StatValues>
              <StatValue 
                style={{ 
                  color: comparisonData.char1Stats[stat] > comparisonData.char2Stats[stat] ? '#ffd700' : 'white' 
                }}
              >
                {comparisonData.char1Stats[stat] || 0}
              </StatValue>
              <StatDivider>vs</StatDivider>
              <StatValue 
                style={{ 
                  color: comparisonData.char2Stats[stat] > comparisonData.char1Stats[stat] ? '#ffd700' : 'white' 
                }}
              >
                {comparisonData.char2Stats[stat] || 0}
              </StatValue>
            </StatValues>
          </StatComparisonCard>
        ))}
      </StatsComparison>

      {comparisonData.powerDifference > 0 && (
        <div style={{ 
          textAlign: 'center', 
          marginTop: '2rem', 
          color: 'rgba(255, 255, 255, 0.8)', 
          fontSize: '1.1rem' 
        }}>
          Power Difference: <span style={{ color: '#ffd700', fontWeight: 'bold' }}>
            {comparisonData.powerDifference} points
          </span>
        </div>
      )}
    </ComparisonContainer>
  );
};

export default PowerComparison;