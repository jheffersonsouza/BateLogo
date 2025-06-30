import { useState } from 'react';
import { useNavigate } from "react-router";

import { Card, CardContent } from "@/components/ui/card";
import '@/styles/App.css'
import { Button } from '@/components/ui/button';
import { ChevronLeftIcon } from 'lucide-react';

export default function App() {
  const navigate = useNavigate()
  // Receber cards do back
  // Verificar se tem 9 cartas se nao joga de volta pro setup
  const debugCards: string[] = ['spades_J', 'spades_Q', 'spades_K',
    'hearts_A', 'clubs_A', 'diamonds_A',
    'spades_7', 'diamonds_7', 'clubs_7']
  const cards = debugCards

  const [selectedCard, setSelectedCard] = useState<string>('');

  const handleCardClick = (card: string) => {
    if (card == selectedCard) {
      setSelectedCard('')
    } else {
      setSelectedCard(card);

    }
  }
  const canProceed = () => {
    if (cards.length != 9) {
      navigate('/setup')
    }
  }

  return (
    <>
      <div className='flex flex-col gap-35'>
        <div className="cards_holder relative flex justify-center items-end max-w-6xl mx-auto px-4">
          {cards.map((card, index) => {
            const cardParts = card.split('_');
            const naipe = cardParts[0];
            const cardValue = cardParts[1];

            const isSelected = card === selectedCard;

            const totalCards = cards.length;

            // TODO: Configurar o angulo e overlap de maneira proporcional.
            const maxAngle = 10;
            const overlapAmount = 82;
            const centerIndex = (totalCards - 1) / 2;
            const rotation = ((index - centerIndex) / centerIndex) * maxAngle;
            const xOffset = (index - centerIndex) * (120 - overlapAmount);
            const yOffset = -Math.abs(index - centerIndex) * 2;

            return (
              <Card
                key={`${card}-${index}`}
                onClick={() => handleCardClick(card)}
                className={`
                absolute cursor-pointer transition-all duration-300 transform hover:scale-105 card_k
              `}
                style={{
                  left: `calc(50% + ${xOffset}px)`,
                  bottom: `${yOffset}px`,
                  zIndex: isSelected ? 50 : 10 + index,
                  transform: `translateX(-50%) rotate(${rotation}deg) ${isSelected ? 'scale(1.1) translateY(-15px)' : ''}`,
                  transformOrigin: 'center bottom',
                  width: '120px',
                  height: '180px'
                }}
              >
                <CardContent>
                  <img
                    src={`cards/${naipe}/${card}.png`}
                    alt={`${cardValue} de ${naipe}`}
                    className={`w-full h-full object-cover hover:shadow-lg hover:rounded
                    ${isSelected ? 'ring-2 ring-primary shadow-lg border-primary rounded z-50' : 'hover:border-primary/50'}
                  `}
                  />
                </CardContent>
              </Card>
            );
          })}
        </div>
        <div className='px-10'>
          <Button variant="outline" className='button rounded-full size-12' onClick={() => navigate('/setup')}><ChevronLeftIcon/></Button>
        </div>
      </div>
    </>
  )
}