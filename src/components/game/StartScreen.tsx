import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StartScreenProps {
  onStartGame: () => void;
}

export default function StartScreen({ onStartGame }: StartScreenProps) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <Card className="w-full max-w-md mx-4">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-bold text-green-500 mb-2">
            🐍 Snake Game
          </CardTitle>
          <p className="text-gray-600 dark:text-gray-400">
            A modern web-based implementation
          </p>
        </CardHeader>
        <CardContent className="text-center">
          <div className="space-y-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Use Arrow Keys or WASD to control the snake
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Collect food to grow and earn points
            </p>
            <Button
              onClick={onStartGame}
              size="lg"
              className="w-full bg-green-600 hover:bg-green-700 text-white"
            >
              Start Game
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
