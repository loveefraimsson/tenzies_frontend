import React from "react";
import '../App.css';

function Highscore(props) {

    return (
        <>
        <section className="highscoreContainer">
            <h2>Highscore</h2>

            <table>
                <thead>
                    <tr>
                        <th>Namn</th>
                        <th>Poäng</th>
                    </tr>
                </thead>
                <tbody>                  
                {
                    props.highscores.map(highscore => {
                        return (                   
                                <tr key={highscore.name}>
                                    <td>{highscore.name}</td>
                                    <td>{highscore.points} poäng</td>
                                </tr>                            
                        ) 
                    })
                }            
                </tbody>
            </table>

        </section>       
        </>
    )
    
}

export default Highscore;