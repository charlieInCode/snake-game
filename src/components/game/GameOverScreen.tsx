import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface GameOverScreenProps {
  finalScore: number;
  onRestart: () => void;
}

export default function GameOverScreen({
  finalScore,
  onRestart,
}: GameOverScreenProps) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <Card className="w-full max-w-md mx-4">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-bold text-red-500 mb-2">
            Game Over!
          </CardTitle>
          <p className="text-gray-600 dark:text-gray-400">
            Better luck next time!
          </p>
        </CardHeader>
        <CardContent className="text-center">
          <div className="space-y-6">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Final Score
              </p>
              <p className="text-3xl font-bold text-green-600">{finalScore}</p>
            </div>
            <div className="space-y-3">
              <Button
                onClick={onRestart}
                size="lg"
                className="w-full bg-green-600 hover:bg-green-700 text-white"
              >
                Restart Game
              </Button>
              <p className="text-xs text-gray-500">Press any key to restart</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
