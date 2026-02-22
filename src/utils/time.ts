export const formatTime = (totalMinutes: number): string => {
  const h = Math.floor(totalMinutes / 60) % 24;
  const m = Math.floor(totalMinutes % 60);
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
};

export const timeToDegrees = (minutes: number): number => {
  return (minutes / 1440) * 360;
};

export const degreesToTime = (degrees: number): number => {
  let d = degrees % 360;
  if (d < 0) d += 360;
  return Math.round((d / 360) * 1440);
};

export const getPointOnCircle = (radius: number, degrees: number, cx: number, cy: number) => {
  const radians = (degrees - 90) * (Math.PI / 180); 
  return {
    x: cx + radius * Math.cos(radians),
    y: cy + radius * Math.sin(radians),
  };
};

export const calculateAngle = (x: number, y: number, cx: number, cy: number): number => {
  const dx = x - cx;
  const dy = y - cy;
  let theta = Math.atan2(dy, dx); 
  theta *= 180 / Math.PI; 
  return (theta + 90 + 360) % 360; 
};
