import '@/styles/Setup.css'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from '@/components/ui/button'
import CardsGrid from '@/components/CardsGrid'
import { useState } from 'react'
import { useNavigate } from "react-router";

function Setup() {
  const navigate = useNavigate()
  const [selectedCards, setSelectedCards] = useState<string[]>([])
  const maxCards = 9
  const canProceed = selectedCards.length == maxCards

  const onCardSelect = (cardValue: string) => {
    setSelectedCards(prev => [...prev, cardValue])
  }
  const onCardUnselect = (cardValue: string) => {
    setSelectedCards(prev => prev.filter(card => card !== cardValue))
  }

  const proceed = () => {
    // mandar as cartas pro back
    navigate('/')
  }

  return (
    <>
      <div className="teste min-h-screen w-screen flex flex-col justify-center pt-1 gap-y-10 overflow-y-auto ">
        <Tabs defaultValue="naipe_espada">
          <div className="flex justify-center">
            <TabsList className="naipe_menu">
              <TabsTrigger value="naipe_espada" className='naipe_menu_trigger'>
                <img src="/cards/spades/espada.webp" alt="Naipe de Espada" className="naipe_menu_img" />
              </TabsTrigger>
              <TabsTrigger value="naipe_paus" className='naipe_menu_trigger'>
                <img src="/cards/clubs/paus.webp" alt="Naipe de Paus" className="naipe_menu_img" />
              </TabsTrigger>
              <TabsTrigger value="naipe_copas" className='naipe_menu_trigger'>
                <img src="/cards/hearts/copas.webp" alt="Naipe de Copas" className="naipe_menu_img" />
              </TabsTrigger>
              <TabsTrigger value="naipe_ouro" className='naipe_menu_trigger'>
                <img src="/cards/diamonds/ouro.webp" alt="Naipe de Ouro" className="naipe_menu_img" />
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="naipe_espada">
            <CardsGrid naipe_display="Espadas" naipe="spades"
              maxSelection={maxCards}
              selectedCards={selectedCards}
              onCardSelect={onCardSelect}
              onCardUnselect={onCardUnselect}
            />
          </TabsContent>
          <TabsContent value="naipe_paus">
            <CardsGrid naipe_display="Paus" naipe="clubs"
              maxSelection={maxCards}
              selectedCards={selectedCards}
              onCardSelect={onCardSelect}
              onCardUnselect={onCardUnselect}
            />
          </TabsContent>
          <TabsContent value="naipe_copas">
            <CardsGrid naipe_display="Copas" naipe="hearts"
              maxSelection={maxCards}
              selectedCards={selectedCards}
              onCardSelect={onCardSelect}
              onCardUnselect={onCardUnselect}
            />
          </TabsContent>
          <TabsContent value="naipe_ouro">
            <CardsGrid naipe_display="Ouro" naipe="diamonds"
              maxSelection={maxCards}
              selectedCards={selectedCards}
              onCardSelect={onCardSelect}
              onCardUnselect={onCardUnselect}
            />
          </TabsContent>
        </Tabs>
        <Button
          variant='outline'
          className={`proceed_btn text-white w-20 mx-auto rounded-full
            ${canProceed ? 'proceed_btn_enabled' : 'proceed_btn_disabled'}
            `}
          disabled={!canProceed}
          onClick={proceed}
        >
          Próximo
        </Button>
      </div>
    </>
  )
}

export default Setup
