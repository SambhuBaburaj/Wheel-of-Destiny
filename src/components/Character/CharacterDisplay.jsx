import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import StatBars from './StatBars';
import { calculateTotalPower } from '../../utils/powerCalculations';

const CharacterCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 1.5rem;
  border: 2px solid ${props => props.isActive ? '#ffd700' : 'rgba(255, 255, 255, 0.2)'};
  box-shadow: ${props => props.isActive ? '0 0 20px rgba(255, 215, 0, 0.3)' : '0 4px 16px rgba(0, 0, 0, 0.1)'};
  transition: all 0.3s ease;
  min-height: 600px;
`;

const PlayerHeader = styled.div`
  text-align: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
`;

const PlayerTitle = styled.h2`
  color: ${props => props.isActive ? '#ffd700' : 'white'};
  font-size: 1.8rem;
  margin: 0 0 0.5rem 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

const PowerLevel = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  font-weight: bold;
  font-size: 1.1rem;
  display: inline-block;
`;

const CharacterSection = styled.div`
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h3`
  color: #ffd700;
  font-size: 1.2rem;
  margin: 0 0 0.5rem 0;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
`;

const InfoItem = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  border-left: 3px solid ${props => props.color || '#667eea'};
`;

const ItemName = styled.div`
  font-weight: bold;
  color: white;
  font-size: 1rem;
  margin-bottom: 0.25rem;
`;

const ItemDescription = styled.div`
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  line-height: 1.3;
`;

const ItemStats = styled.div`
  color: #ffd700;
  font-size: 0.85rem;
  margin-top: 0.25rem;
  font-weight: 500;
`;

const EmptySlot = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border: 2px dashed rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  padding: 1rem;
  text-align: center;
  color: rgba(255, 255, 255, 0.5);
  font-style: italic;
`;

const CharacterAvatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: ${props => getAvatarGradient(props.race)};
  margin: 0 auto 1rem auto;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
`;

const getAvatarGradient = (race) => {
  switch (race) {
    case 'Human': return 'linear-gradient(135deg, #8B4513 0%, #D2691E 100%)';
    case 'Elf': return 'linear-gradient(135deg, #228B22 0%, #32CD32 100%)';
    case 'Dwarf': return 'linear-gradient(135deg, #B8860B 0%, #DAA520 100%)';
    case 'Dragon': return 'linear-gradient(135deg, #DC143C 0%, #FF6347 100%)';
    case 'Phoenix': return 'linear-gradient(135deg, #FF4500 0%, #FFD700 100%)';
    default: return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
  }
};

const getAvatarEmoji = (race, subRace) => {
  if (race === 'Human') return '👤';
  if (race === 'Elf') return '🧝';
  if (race === 'Dwarf') return '🧔';
  if (race === 'Dragon') return '🐉';  
  if (race === 'Phoenix') return '🔥';
  return '❓';
};

const formatStatBonus = (statBonus) => {
  if (!statBonus) return '';
  return Object.entries(statBonus)
    .map(([stat, value]) => `${stat.charAt(0).toUpperCase() + stat.slice(1)}: ${value > 0 ? '+' : ''}${value}`)
    .join(', ');
};

const CharacterDisplay = ({ character, playerNumber, playerName, isActive = false }) => {
  const powerData = character.race?.main ? calculateTotalPower(character) : { totalPower: 0, finalStats: {} };

  return (
    <CharacterCard
      isActive={isActive}
      initial={{ opacity: 0, x: playerNumber === 1 ? -50 : 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <PlayerHeader>
        <PlayerTitle isActive={isActive}>
          {playerName || `Player ${playerNumber}`}
        </PlayerTitle>
        <CharacterAvatar race={character.race?.main}>
          {getAvatarEmoji(character.race?.main, character.race?.subRace)}
        </CharacterAvatar>
        <PowerLevel>Power Level: {powerData.totalPower}</PowerLevel>
      </PlayerHeader>

      <CharacterSection>
        <SectionTitle>🏰 Race</SectionTitle>
        {character.race?.main ? (
          <InfoItem color="#8B4513">
            <ItemName>{character.race.main} - {character.race.subRace || 'Unknown'}</ItemName>
            <ItemDescription>
              {character.race.description}
              {character.race.subRaceDescription && ` • ${character.race.subRaceDescription}`}
            </ItemDescription>
            <ItemStats>
              Base: {formatStatBonus(character.race.baseStats)}
              {character.race.subRaceBonus && ` | Bonus: ${formatStatBonus(character.race.subRaceBonus)}`}
            </ItemStats>
          </InfoItem>
        ) : (
          <EmptySlot>Race not selected</EmptySlot>
        )}
      </CharacterSection>

      <CharacterSection>
        <SectionTitle>⚡ Powers</SectionTitle>
        
        {character.powers?.raceSpecific ? (
          <InfoItem color="#FF6347">
            <ItemName>{character.powers.raceSpecific.name}</ItemName>
            <ItemDescription>{character.powers.raceSpecific.description}</ItemDescription>
            <ItemStats>{formatStatBonus(character.powers.raceSpecific.statBonus)}</ItemStats>
          </InfoItem>
        ) : (
          <EmptySlot>Race-specific power not selected</EmptySlot>
        )}

        {character.powers?.general ? (
          <InfoItem color="#9370DB">
            <ItemName>{character.powers.general.name}</ItemName>
            <ItemDescription>{character.powers.general.description}</ItemDescription>
            <ItemStats>{formatStatBonus(character.powers.general.statBonus)}</ItemStats>
          </InfoItem>
        ) : (
          <EmptySlot>General power not selected</EmptySlot>
        )}

        {character.powers?.memePower ? (
          <InfoItem color="#FF69B4">
            <ItemName>{character.powers.memePower.name}</ItemName>
            <ItemDescription>
              {character.powers.memePower.description}
              <br />
              <span style={{ fontStyle: 'italic', color: '#ffd700' }}>
                From: {character.powers.memePower.movie}
              </span>
            </ItemDescription>
            <ItemStats>{formatStatBonus(character.powers.memePower.statBonus)}</ItemStats>
          </InfoItem>
        ) : (
          <EmptySlot>Malayalam meme power not selected</EmptySlot>
        )}
      </CharacterSection>

      <CharacterSection>
        <SectionTitle>⚔️ Weapon</SectionTitle>
        {character.weapon ? (
          <InfoItem color="#DAA520">
            <ItemName>{character.weapon.name}</ItemName>
            <ItemDescription>{character.weapon.description}</ItemDescription>
            <ItemStats>{formatStatBonus(character.weapon.statBonus)}</ItemStats>
          </InfoItem>
        ) : (
          <EmptySlot>Weapon not selected</EmptySlot>
        )}
      </CharacterSection>

      <CharacterSection>
        <SectionTitle>📊 Final Stats</SectionTitle>
        <StatBars stats={powerData.finalStats} />
        
        {character.statBoosts && Object.keys(character.statBoosts).some(key => character.statBoosts[key].length > 0) && (
          <div style={{ marginTop: '1rem' }}>
            <ItemDescription style={{ color: '#ffd700', fontWeight: 'bold', marginBottom: '0.5rem' }}>
              Stat Boosts Applied:
            </ItemDescription>
            {Object.entries(character.statBoosts).map(([stat, boosts]) => (
              boosts.length > 0 && (
                <ItemStats key={stat} style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                  {stat.charAt(0).toUpperCase() + stat.slice(1)}: +{boosts.reduce((sum, boost) => sum + boost, 0)} 
                  ({boosts.map(boost => `+${boost}`).join(', ')})
                </ItemStats>
              )
            ))}
          </div>
        )}
      </CharacterSection>
    </CharacterCard>
  );
};

export default CharacterDisplay;