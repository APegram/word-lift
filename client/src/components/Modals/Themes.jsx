import React, { Component } from 'react';

export default class Themes extends Component {
    
    onClick = () => {
        this.props.onClick(this.props.theme)
    }


    render(){
        const theme = this.props.theme.replace(' ', '-')
        return (
            <div onClick={this.onClick} className={`${theme} themes`}/>
        )
    }
}