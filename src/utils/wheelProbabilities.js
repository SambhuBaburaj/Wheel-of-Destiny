export const generateWheelSegments = (items) => {
  const segments = [];
  const totalProbability = items.reduce((sum, item) => sum + item.probability, 0);
  
  // Start from top (12 o'clock = -90 degrees, but we'll adjust for proper alignment)
  let currentAngle = -90;
  
  items.forEach((item, index) => {
    const segmentAngle = (item.probability / totalProbability) * 360;
    
    segments.push({
      ...item,
      startAngle: currentAngle,
      endAngle: currentAngle + segmentAngle,
      segmentAngle,
      index
    });
    
    currentAngle += segmentAngle;
  });
  
  return segments;
};

export const selectRandomItem = (items) => {
  const totalProbability = items.reduce((sum, item) => sum + item.probability, 0);
  const random = Math.random() * totalProbability;
  
  let currentSum = 0;
  for (let item of items) {
    currentSum += item.probability;
    if (random <= currentSum) {
      return item;
    }
  }
  
  return items[items.length - 1]; // fallback
};

export const calculateSpinResult = (segments, finalRotation) => {
  // Normalize rotation to 0-360 degrees
  const normalizedRotation = ((finalRotation % 360) + 360) % 360;
  
  // The pointer is at the top (270 degrees when considering our coordinate system)
  // We need to find which segment the pointer lands on after rotation
  const pointerAngle = (270 - normalizedRotation + 360) % 360;
  
  // Check each segment to see if the pointer lands on it
  for (let segment of segments) {
    let startAngle = ((segment.startAngle + 360) % 360);
    let endAngle = ((segment.endAngle + 360) % 360);
    
    // Handle wrap-around case where segment crosses 0 degrees
    if (startAngle > endAngle) {
      if (pointerAngle >= startAngle || pointerAngle <= endAngle) {
        return segment;
      }
    } else {
      if (pointerAngle >= startAngle && pointerAngle <= endAngle) {
        return segment;
      }
    }
  }
  
  // Fallback to first segment
  return segments[0];
};

export const generateSpinRotation = (targetSegment, segments) => {
  // Generate random number of full rotations (3-8 full spins)
  const fullRotations = Math.floor(Math.random() * 6) + 3;
  const baseRotation = fullRotations * 360;
  
  // Calculate target angle (middle of the target segment)
  const targetAngle = targetSegment.startAngle + (targetSegment.segmentAngle / 2);
  
  // Add some randomness within the segment
  const randomOffset = (Math.random() - 0.5) * targetSegment.segmentAngle * 0.6;
  const finalTargetAngle = targetAngle + randomOffset;
  
  // Calculate the rotation needed to align the target segment with the pointer
  // The pointer is at 270 degrees in our coordinate system
  const requiredRotation = (270 - finalTargetAngle + 360) % 360;
  
  return baseRotation + requiredRotation;
};