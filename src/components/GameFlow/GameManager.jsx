import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import BaseWheel from '../Wheels/BaseWheel';
import CharacterDisplay from '../Character/CharacterDisplay';
import PowerComparison from '../Battle/PowerComparison';
import FinalBattle from '../Battle/FinalBattle';
import OpponentSelection from '../Battle/OpponentSelection';
import PlayerNameEntry from './PlayerNameEntry';
import { 
  getWheelDataForPhase, 
  getNextPhase, 
  updateCharacterWithSelection, 
  createEmptyCharacter,
  isCharacterComplete 
} from '../../utils/gameLogic';
import { PHASE_NAMES } from '../../data/gameConstants';
import { calculateTotalPower, compareCharacters } from '../../utils/powerCalculations';
import { saveCharacterToFile, generateCharacterName } from '../../data/savedCharacters';

const GameContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const GameBoard = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  gap: 2rem;
  max-width: 1400px;
  width: 100%;
  align-items: start;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const GameHeader = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  margin-bottom: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const Title = styled.h1`
  color: white;
  font-size: 3rem;
  margin: 0 0 1rem 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  background: linear-gradient(45deg, #ffd700, #ffed4e);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Subtitle = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.2rem;
  margin: 0;
`;

const PlayerIndicator = styled(motion.div)`
  background: ${props => props.active ? 
    'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)' : 
    'rgba(255, 255, 255, 0.1)'
  };
  color: ${props => props.active ? '#333' : 'white'};
  padding: 1rem 2rem;
  border-radius: 15px;
  text-align: center;
  font-weight: bold;
  font-size: 1.1rem;
  border: 2px solid ${props => props.active ? '#ffd700' : 'rgba(255, 255, 255, 0.2)'};
  backdrop-filter: blur(10px);
`;

const PhaseIndicator = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 1rem;
  text-align: center;
  color: white;
  font-size: 1.1rem;
  margin-bottom: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const WheelSection = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const NextPlayerButton = styled(motion.button)`
  background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
  color: white;
  border: none;
  border-radius: 15px;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  margin-top: 2rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const GameManager = () => {
  const [gameState, setGameState] = useState({
    currentPlayer: 1,
    currentPhase: 'race-selection',
    player1: createEmptyCharacter(),
    opponent: null,
    playerName: '',
    gamePhase: 'name-entry', // 'name-entry' | 'character-creation' | 'opponent-selection' | 'final-battle' | 'game-over'
    winner: null,
    spinning: false,
    phaseComplete: false
  });

  const [wheelData, setWheelData] = useState([]);

  // Update wheel data when phase changes
  useEffect(() => {
    if (gameState.gamePhase === 'character-creation') {
      const data = getWheelDataForPhase(gameState.currentPhase, gameState.player1);
      setWheelData(data);
      setGameState(prev => ({ ...prev, phaseComplete: false }));
    }
  }, [gameState.currentPhase, gameState.gamePhase]);

  const handleSpinStart = () => {
    setGameState(prev => ({ ...prev, spinning: true }));
  };

  const handleSpinComplete = (selectedItem) => {
    const updatedCharacter = updateCharacterWithSelection(gameState.player1, gameState.currentPhase, selectedItem);
    
    // Update character stats
    const powerData = calculateTotalPower(updatedCharacter);
    updatedCharacter.finalStats = powerData.finalStats;
    updatedCharacter.totalPower = powerData.totalPower;

    setGameState(prev => ({
      ...prev,
      player1: updatedCharacter,
      spinning: false,
      phaseComplete: true
    }));
  };

  const handleNextPhase = () => {
    const nextPhase = getNextPhase(gameState.currentPhase);
    
    if (nextPhase) {
      // Continue to next phase for player
      setGameState(prev => ({
        ...prev,
        currentPhase: nextPhase,
        phaseComplete: false
      }));
    } else {
      // Player character is complete, save and move to opponent selection
      const completedCharacter = { ...gameState.player1 };
      completedCharacter.name = gameState.playerName; // Use the actual player name
      
      // Save character to file
      saveCharacterToFile(completedCharacter);
      
      setGameState(prev => ({
        ...prev,
        player1: completedCharacter,
        gamePhase: 'opponent-selection',
        phaseComplete: false
      }));
    }
  };

  const handlePlayerNameSubmit = (name) => {
    setGameState(prev => ({
      ...prev,
      playerName: name,
      gamePhase: 'character-creation'
    }));
  };

  const handleOpponentSelected = (selectedOpponent) => {
    setGameState(prev => ({
      ...prev,
      opponent: selectedOpponent,
      gamePhase: 'final-battle'
    }));
  };

  const handleFinalBattleComplete = (winner) => {
    setGameState(prev => ({
      ...prev,
      winner,
      gamePhase: 'game-over'
    }));
  };

  const resetGame = () => {
    setGameState({
      currentPlayer: 1,
      currentPhase: 'race-selection',
      player1: createEmptyCharacter(),
      opponent: null,
      playerName: '',
      gamePhase: 'name-entry',
      winner: null,
      spinning: false,
      phaseComplete: false
    });
  };

  const renderCharacterCreation = () => (
    <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '2rem', alignItems: 'start' }}>
      <CharacterDisplay 
        character={gameState.player1} 
        playerNumber={1}
        playerName={gameState.playerName}
        isActive={true}
      />
      
      <WheelSection
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ flex: 1 }}
      >
        <PhaseIndicator>
          <strong>{gameState.playerName}'s Character</strong> - {PHASE_NAMES[gameState.currentPhase]}
        </PhaseIndicator>
        
        <BaseWheel
          items={wheelData}
          onSpinComplete={handleSpinComplete}
          isSpinning={gameState.spinning}
          title={PHASE_NAMES[gameState.currentPhase]}
          disabled={!wheelData.length}
        />
        
        {gameState.phaseComplete && (
          <NextPlayerButton
            onClick={handleNextPhase}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {getNextPhase(gameState.currentPhase) ? 'Continue' : 'Find Opponent!'}
          </NextPlayerButton>
        )}
      </WheelSection>
    </div>
  );

  const renderOpponentSelection = () => (
    <OpponentSelection
      playerCharacter={gameState.player1}
      onOpponentSelected={handleOpponentSelected}
    />
  );

  const renderFinalBattle = () => {
    const comparison = compareCharacters(gameState.player1, gameState.opponent);
    
    return (
      <div>
        <PowerComparison 
          player1={gameState.player1}
          player2={gameState.opponent}
          comparison={comparison}
        />
        <FinalBattle 
          player1={gameState.player1}
          player2={gameState.opponent}
          comparison={comparison}
          onBattleComplete={handleFinalBattleComplete}
        />
      </div>
    );
  };

  const renderGameOver = () => {
    const winnerName = gameState.winner === 1 ? gameState.playerName : gameState.opponent?.name;
    const isPlayerWinner = gameState.winner === 1;
    
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        style={{ textAlign: 'center' }}
      >
        <Title style={{ fontSize: '4rem', color: '#ffd700' }}>
          🎉 VICTORY! 🎉
        </Title>
        <h2 style={{ color: 'white', fontSize: '2rem', margin: '2rem 0' }}>
          {winnerName} Wins!
        </h2>
        <div style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '1.2rem', marginBottom: '2rem' }}>
          {isPlayerWinner 
            ? `🎊 Congratulations ${gameState.playerName}! Your character emerged victorious! 🎊`
            : `😤 Better luck next time ${gameState.playerName}! Your opponent was too strong!`
          }
        </div>
        <PowerComparison 
          player1={gameState.player1}
          player2={gameState.opponent}
          comparison={compareCharacters(gameState.player1, gameState.opponent)}
          showWinner={true}
        />
        <NextPlayerButton
          onClick={resetGame}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{ marginTop: '3rem', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
        >
          Create New Character
        </NextPlayerButton>
      </motion.div>
    );
  };

  return (
    <GameContainer>
      <GameHeader
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Title>🎡 Wheel of Destiny ⚔️</Title>
        <Subtitle>Create your character through the power of spinning wheels!</Subtitle>
      </GameHeader>

      <AnimatePresence mode="wait">
        {gameState.gamePhase === 'name-entry' && (
          <motion.div
            key="name-entry"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <PlayerNameEntry onNameSubmit={handlePlayerNameSubmit} />
          </motion.div>
        )}
        
        {gameState.gamePhase === 'character-creation' && (
          <motion.div
            key="character-creation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {renderCharacterCreation()}
          </motion.div>
        )}
        
        {gameState.gamePhase === 'opponent-selection' && (
          <motion.div
            key="opponent-selection"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {renderOpponentSelection()}
          </motion.div>
        )}
        
        {gameState.gamePhase === 'final-battle' && (
          <motion.div
            key="final-battle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {renderFinalBattle()}
          </motion.div>
        )}
        
        {gameState.gamePhase === 'game-over' && (
          <motion.div
            key="game-over"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {renderGameOver()}
          </motion.div>
        )}
      </AnimatePresence>
    </GameContainer>
  );
};

export default GameManager;