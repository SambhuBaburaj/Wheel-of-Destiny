import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const StatsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const StatRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const StatLabel = styled.div`
  color: white;
  font-weight: bold;
  min-width: 100px;
  font-size: 0.9rem;
`;

const StatBarContainer = styled.div`
  flex: 1;
  height: 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  overflow: hidden;
  position: relative;
`;

const StatBarFill = styled(motion.div)`
  height: 100%;
  background: ${props => props.color};
  border-radius: 10px;
  position: relative;
  box-shadow: inset 0 1px 3px rgba(255, 255, 255, 0.2);
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 50%;
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0.3), transparent);
    border-radius: 10px 10px 0 0;
  }
`;

const StatValue = styled.div`
  color: #ffd700;
  font-weight: bold;
  min-width: 50px;
  text-align: right;
  font-size: 0.9rem;
`;

const STAT_COLORS = {
  strength: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)',
  intelligence: 'linear-gradient(135deg, #4ECDC4 0%, #44A08D 100%)',
  speed: 'linear-gradient(135deg, #96CEB4 0%, #FFECD2 100%)',
  magic: 'linear-gradient(135deg, #A8EDEA 0%, #FED6E3 100%)'
};

const STAT_ICONS = {
  strength: '💪',
  intelligence: '🧠',
  speed: '⚡',
  magic: '✨'
};

const StatBars = ({ stats = {} }) => {
  const maxStat = Math.max(...Object.values(stats), 100);
  const normalizedMax = Math.max(maxStat, 200); // Ensure bars can show progression

  return (
    <StatsContainer>
      {Object.entries(stats).map(([statName, value]) => (
        <StatRow key={statName}>
          <StatLabel>
            {STAT_ICONS[statName]} {statName.charAt(0).toUpperCase() + statName.slice(1)}
          </StatLabel>
          <StatBarContainer>
            <StatBarFill
              color={STAT_COLORS[statName] || STAT_COLORS.strength}
              initial={{ width: 0 }}
              animate={{ width: `${Math.min((value / normalizedMax) * 100, 100)}%` }}
              transition={{ 
                duration: 1.5, 
                delay: 0.2,
                ease: "easeOut"
              }}
            />
          </StatBarContainer>
          <StatValue>{value || 0}</StatValue>
        </StatRow>
      ))}
    </StatsContainer>
  );
};

export default StatBars;