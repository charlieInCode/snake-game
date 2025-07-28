import '@testing-library/jest-dom';

// Mock requestAnimationFrame for testing
global.requestAnimationFrame = jest.fn((cb) => {
  return setTimeout(cb, 16); // Simulate 60fps (16ms)
});

global.cancelAnimationFrame = jest.fn((id) => {
  clearTimeout(id);
});

// Mock HTMLCanvasElement for canvas testing
Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
  value: jest.fn(() => ({
    fillRect: jest.fn(),
    strokeRect: jest.fn(),
    fillStyle: '',
    strokeStyle: '',
    lineWidth: 1,
    beginPath: jest.fn(),
    moveTo: jest.fn(),
    lineTo: jest.fn(),
    stroke: jest.fn(),
  })),
});

// Mock ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));