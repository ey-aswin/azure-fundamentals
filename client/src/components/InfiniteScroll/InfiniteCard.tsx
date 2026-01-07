
interface CardType {
    "title": number,
    "id": number,
    "description": string,
    "category": boolean    
}

const InfiniteCard = ({ cardData }: { cardData: CardType }) => {
  return (
    <div style={{border:"1px solid white",margin:"5px",padding:"5px"}}>
      <p>Title: {cardData.title}</p>
      <p>Id: {cardData.id}</p>
      <p>Description: {cardData.description}</p>
      <p>Category: {cardData.category}</p>
    </div>
  )
}

export default InfiniteCard
