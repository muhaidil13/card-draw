import React, { Component } from 'react'
import Card from './card';
import axios from "axios"
import "./Deck-Area.css"

const API_BASE_URL = "https://deckofcardsapi.com/api/deck"

class Deck extends Component{
    constructor(props){
        super(props);
        this.state = {deck :null, drawn:[]}
        this.getCard = this.getCard.bind(this)
    }
    async componentDidMount(){
        let data = await axios.get(`${API_BASE_URL}/new/shuffle/`)
        this.setState({deck:data.data})
    }
    async getCard(){
        let id = this.state.deck.deck_id
        // get request using id
        try{
            let deckCardUrl = `${API_BASE_URL}/${id}/draw/` 
            let cardres = await axios.get(deckCardUrl)
            if(!cardres.data.success){
                throw new Error("No Card Remaining")
            }
            console.log(cardres.data)
            let card = cardres.data.cards[0]
            this.setState(st => ({
                drawn:[...st.drawn,
                    {id:card.code, image:card.image, name:`${card.suit}${card.value}`}
                ],
            }))
        }catch(err){
            alert(err)
        }
    }
    render(){
        const cards = this.state.drawn.map(c => (
            <Card key={c.id} image={c.image} name={c.name}/>
        ))
        return(
            <div className='Deck'>
                <h1 className='Deck-Title'>Deck Card</h1>
                <h2 className='Deck-Title Subtitle'>Litte Demo With React</h2>
                <button className='Btn' onClick={this.getCard}>Get Card</button>
                <div className='Deck-Area'>
                    {cards}
                </div>
            </div>
        )
    }
}

export default Deck;