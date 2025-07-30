import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { generateWheelSegments, selectRandomItem, generateSpinRotation } from '../../utils/wheelProbabilities';

const WheelContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 2rem;
`;

const WheelWrapper = styled.div`
  position: relative;
  width: 500px;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  /* Ensure perfect centering */
  & > div {
    transform-origin: center center;
  }
`;

const WheelSVG = styled.svg`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  display: block;
  /* Ensure SVG is perfectly centered */
  transform-origin: 50% 50%;
`;

const Pointer = styled.div`
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-bottom: 40px solid #333;
  z-index: 10;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.4));
  
  /* Ensure pointer is perfectly centered */
  margin-left: 0;
`;

const SpinButton = styled(motion.button)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 50px;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  min-width: 120px;

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const ResultDisplay = styled(motion.div)`
  background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
  padding: 1.5rem;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin-top: 1rem;

  h3 {
    margin: 0 0 0.5rem 0;
    color: #333;
    font-size: 1.4rem;
  }

  p {
    margin: 0;
    color: #666;
    font-size: 1rem;
  }
`;

const PhaseTitle = styled.h2`
  color: #333;
  font-size: 2rem;
  margin-bottom: 1rem;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
`;

const BaseWheel = ({ 
  items = [], 
  onSpinComplete, 
  isSpinning = false, 
  title = "Spin the Wheel",
  disabled = false 
}) => {
  const [segments, setSegments] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [rotation, setRotation] = useState(0);
  const wheelRef = useRef(null);

  useEffect(() => {
    if (items.length > 0) {
      const wheelSegments = generateWheelSegments(items);
      setSegments(wheelSegments);
      setSelectedItem(null);
    }
  }, [items]);

  const handleSpin = () => {
    if (isSpinning || disabled || !segments || segments.length === 0 || !items || items.length === 0) return;

    // Select random item based on probability
    const randomItem = selectRandomItem(items);
    if (!randomItem) return;
    
    const targetSegment = segments.find(seg => seg && seg.name === randomItem.name);
    
    if (!targetSegment) return;

    // Generate spin rotation
    const spinRotation = generateSpinRotation(targetSegment, segments);
    setRotation(prev => prev + spinRotation);

    // Set result after animation completes
    setTimeout(() => {
      setSelectedItem(randomItem);
      if (onSpinComplete) {
        onSpinComplete(randomItem);
      }
    }, 3000);
  };

  const renderSegments = () => {
    if (!segments || segments.length === 0) {
      return null;
    }
    
    return segments.map((segment, index) => {
      if (!segment) return null;
      
      const { startAngle, endAngle, segmentAngle } = segment;
      
      // Calculate path for segment - perfectly centered
      const radius = 225; // Increased from 180
      const centerX = 250; // Exact center of 500px SVG
      const centerY = 250; // Exact center of 500px SVG
      
      // Convert angles to radians
      const startRad = (startAngle * Math.PI) / 180;
      const endRad = (endAngle * Math.PI) / 180;
      
      const x1 = centerX + radius * Math.cos(startRad);
      const y1 = centerY + radius * Math.sin(startRad);
      const x2 = centerX + radius * Math.cos(endRad);
      const y2 = centerY + radius * Math.sin(endRad);
      
      const largeArcFlag = segmentAngle > 180 ? 1 : 0;
      
      const pathData = `
        M ${centerX} ${centerY}
        L ${x1} ${y1}
        A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}
        Z
      `;
      
      // Calculate text position - closer to center for better readability
      const midAngle = (startAngle + endAngle) / 2;
      const midRad = (midAngle * Math.PI) / 180;
      const textRadius = radius * 0.7; // Moved text closer to edge
      const textX = centerX + textRadius * Math.cos(midRad);
      const textY = centerY + textRadius * Math.sin(midRad);
      
      // Calculate text rotation - point text toward center
      let textRotation = midAngle + 90;
      // Adjust text rotation so it's always readable and points toward center
      if (midAngle > 90 && midAngle < 270) {
        textRotation = midAngle - 90; // Flip text for bottom half
      }
      
      // Safely get segment name
      const segmentName = segment.name || `Item ${index + 1}`;
      
      return (
        <g key={segment.id || index}>
          <path
            d={pathData}
            fill={segment.color || `hsl(${(index * 360) / segments.length}, 70%, 60%)`}
            stroke="white"
            strokeWidth="3"
          />
          <text
            x={textX}
            y={textY}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="white"
            fontSize="14"
            fontWeight="bold"
            style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}
            transform={`rotate(${textRotation}, ${textX}, ${textY})`}
          >
            {segmentName && segmentName.length > 15 
              ? `${segmentName.substring(0, 12)}...` 
              : segmentName
            }
          </text>
        </g>
      );
    }).filter(Boolean);
  };

  return (
    <WheelContainer>
      <PhaseTitle>{title}</PhaseTitle>
      
      <WheelWrapper>
        <Pointer />
        <motion.div
          ref={wheelRef}
          animate={{ rotate: rotation }}
          transition={{ 
            duration: 3, 
            ease: "easeOut",
            type: "tween"
          }}
          style={{
            width: '100%',
            height: '100%',
            transformOrigin: '50% 50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <WheelSVG viewBox="0 0 500 500">
            {renderSegments()}
            {/* Center circle for perfect alignment */}
            <circle
              cx="250"
              cy="250"
              r="15"
              fill="rgba(0, 0, 0, 0.8)"
              stroke="white"
              strokeWidth="2"
            />
          </WheelSVG>
        </motion.div>
      </WheelWrapper>

      <SpinButton
        onClick={handleSpin}
        disabled={isSpinning || disabled || !segments || segments.length === 0 || !items || items.length === 0}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isSpinning ? 'Spinning...' : (!items || items.length === 0) ? 'No Items' : 'SPIN!'}
      </SpinButton>

      {selectedItem && (
        <ResultDisplay
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3>{selectedItem.name}</h3>
          <p>{selectedItem.description}</p>
          {selectedItem.statBonus && (
            <div style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: '#555' }}>
              Stats: {Object.entries(selectedItem.statBonus)
                .map(([stat, value]) => `${stat.charAt(0).toUpperCase() + stat.slice(1)}: ${value > 0 ? '+' : ''}${value}`)
                .join(', ')}
            </div>
          )}
          {selectedItem.movie && (
            <div style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: '#555' }}>
              From: {selectedItem.movie}
            </div>
          )}
        </ResultDisplay>
      )}
    </WheelContainer>
  );
};

export default BaseWheel;