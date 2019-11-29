import React, { Component } from 'react';

export default class Themes extends Component {
    
    onClick = () => {
        this.props.onClick(this.props.theme)
    }


    render(){
        let theme = this.props.theme.replace(' ', '_')
        const themes = {
            harry_potter: 'images/Harry_Potter/harry_potter.png',
            doctor_who: 'images/Doctor_Who/doctor_who.jpg',
            pokemon: 'images/pokemon/Pokemon.png'
        }
        switch (theme){
            case "harry_potter":
                theme = 'images/Harry_Potter/Harry_Potter.jpg'
                break;
            case "pokemon":
                theme = 'images/pokemon/Pokemon.png'
                break;
            default:
                theme = 'images/Doctor_Who/doctor_who.jpg'
                break;
        }
        return (
            <div onClick={this.onClick} className={`themes`} style={ { backgroundImage: `url(${theme})` } }/>
        )
    }
}