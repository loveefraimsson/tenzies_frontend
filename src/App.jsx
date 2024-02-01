import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti'
import Die from './components/Die';
import Highscore from './components/Highscore';
import Registration from './components/Registration';
import './App.css';



function App() { 

  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);
  const [click, setClick] = useState(0);
  const [highscores, setHighscores] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);
  const [message, setMessage] = useState('');
  const [formData, setFormdata] = useState({
    name: '',
    points: ''
  });


  //UseEffects
  useEffect(() => {
    if(tenzies) {
        setIsDisabled(false)
    } else {
        setIsDisabled(true)
    }
  }, [tenzies]);



  useEffect(() => {
    fetch("https://tenziesbackend.onrender.com/gethighscore")
    .then(res => res.json())
    .then(data => {
        //Sorts the data by points and sets the first three to state
        data.sort((a, b) => a.points - b.points).slice(0, 3);
        let slicedData = data.slice(0, 3);
        setHighscores(slicedData);
    })
  }, [isDisabled])

  
  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value;
    const allSameValue = dice.every(die => die.value === firstValue);

    if(allHeld && allSameValue) {
      setTenzies(true)
    }
  }, [dice]);



  //Functions of game
  function generateNewDie() {
    return {
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
    }
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  function rollDice() {
    setClick(prevClick => prevClick + 1);

    //New game
    if(tenzies) {
      setDice(allNewDice());
      setTenzies(false);
      setIsDisabled(false);
      setClick(0);
      
    }
    //Roll again
    else {
      setDice(prevDice => prevDice.map(die => {
        return die.isHeld ? 
          die : 
          generateNewDie();    
      }))
    }
  }

  function holdDice(id) {
    setDice(prevState => prevState.map(die => {
      return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
    }))
  }


  //Handle form
  function handleChange(event) {
      const { name, value } = event.target;
      setFormdata(prevFormData => {
          return {
              ...prevFormData,
              [name]: value
          }
      })
  }


  function handleSubmit(evt) {
      evt.preventDefault();

      const registerPerson = {
          name: formData.name,
          points: click
      }
      
      fetch("https://tenziesbackend.onrender.com/register", {
          method: "post",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(registerPerson)
      })
      .then(res => res.json())
      .then(data => {
        setIsDisabled(true);
        setMessage('Din poäng är registrerad!')
        setFormdata({
          name: '',
          points: ''
        })
      })
  }
   

  
  return (
    <>
    {tenzies && <Confetti />}

      <h1 className="title">Tenzies</h1>
      <p className='secondTitle'>Här kan du spela Tenzies och sedan registrera din poäng!</p>

      <Highscore highscores={highscores} />
       
      <section className='main'>
        
        <p className="instructions">Rulla tills alla tärningar är likadana. Klicka på varje tärning för att låsa den till dess nuvarande värde mellan kasten.</p>
        <section className='diceContainer'>  

          {
            dice.map((die, i) => {
              return <Die value={die.value} isHeld={die.isHeld} holdDice={holdDice} key={die.id} id={die.id} />
            })
          }

        </section>

        <button onClick={rollDice} className='rollDiceButton'>{tenzies ? 'Nytt spel' : 'Kasta!'}</button>

        <p className='throws'>Antal kast: {click}</p>
      </section>
      
        <Registration 
            click={click} 
            tenzies={tenzies} 
            handleChange={handleChange} 
            handleSubmit={handleSubmit} 
            formData={formData} 
            isDisabled={isDisabled} 
            message={message} 
          />
    </>
  )
}

export default App;
