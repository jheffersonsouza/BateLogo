import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

type CardsGridProps = {
  naipe_display: string
  naipe: string
  maxSelection?: number
  selectedCards: string[]
  onCardSelect: (cardValue: string) => void
  onCardUnselect: (cardValue: string) => void
}

const CardsGrid = ({
  naipe_display,
  naipe,
  maxSelection = 9,
  selectedCards = [],
  onCardSelect,
  onCardUnselect,
}: CardsGridProps) => {
  const cardValues = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
  const handleCardClick = (cardValue: string) => {
    if (selectedCards.includes(cardValue)){
      if (onCardUnselect){
        onCardUnselect(cardValue);
      }
    } else {
    if (onCardSelect) {
      onCardSelect(cardValue);
    }
  }
  };
  const countSelectedCards = () => {
    return selectedCards.length
  }
  const formatCardValue = (cardValue: string) => {
    switch (cardValue) {
      case "A":
        return "Ás"
      case "J":
        return "Valete"
      case "Q":
        return "Dama"
      case "K":
        return "Rei"
      default:
        return cardValue
    }
  }
  return (
    <div className="mt-6">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-white mb-2">
          {naipe_display}
        </h2>
        <div className="flex items-center justify-center gap-4">
          <Badge variant="secondary" className="text-lg px-4 py-2">
            Total: {countSelectedCards()}/{maxSelection}
          </Badge>
          <Badge variant="outline" className="text-sm px-3 py-1">
            {naipe_display}: {selectedCards.filter(c => c.startsWith(naipe + '_')).length}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-4 max-w-6xl mx-auto px-4">
        {cardValues.map(cardValue => {
          cardValue = naipe + "_" + cardValue
          const isSelected = selectedCards.includes(cardValue);
          const canSelect = countSelectedCards() < maxSelection || isSelected;

          return (
            <Card key={cardValue} onClick={() => canSelect && handleCardClick(cardValue)}
              className={`
                relative cursor-pointer transition-all duration-200 transform hover:scale-105 hover:shadow-lg
                ${isSelected ? 'ring-2 ring-primary shadow-lg border-primary' : 'hover:border-primary/50'}
                ${!canSelect ? 'opacity-50 cursor-not-allowed hover:scale-100 hover:shadow-none' : ''}
              `}>
              <CardContent>
                  <img src={`cards/${naipe}/${cardValue}.png`} alt={`${formatCardValue(cardValue)} de ${naipe_display}`}
                    className="w-full h-full object-cover" />
              </CardContent>

              {isSelected && (
                <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center shadow-md">
                  <Check className="w-3 h-3" />
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default CardsGrid;