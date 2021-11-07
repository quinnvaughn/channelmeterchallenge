import { Card as CardType } from "../../../../redux/types"
import Card from "../Card"

type IProps = {
  cards: CardType[]
}

export default function CardList(props: IProps) {
  return (
    <>
      {props.cards.map((card) => (
        <Card key={card.id} {...card} />
      ))}
    </>
  )
}
