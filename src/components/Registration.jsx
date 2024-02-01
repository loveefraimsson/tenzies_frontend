import React from "react";

function Registration(props) {


    return (
        <>
            <section className="registrationContainer">
                <h2>Registrera din poäng efter att du spelat klart!</h2>

                <form onSubmit={props.handleSubmit} className="form">
                    <input 
                        type="text" 
                        name="name" 
                        placeholder="Namn" 
                        onChange={props.handleChange}
                        value={props.formData.name}
                    /> <br />

                    <p className="points">Poäng: {props.tenzies ? props.click : null } </p> 
                    
                    {props.isDisabled ? <button className="disabled" disabled>Skicka</button> : <button>Skicka</button>}
                    <p className="message">{props.tenzies ? props.message : null}</p>
                </form>
            </section>
        </>
    )
}

export default Registration;