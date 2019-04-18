import React from 'react';

class ButtonOrder extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: 'Botão default',
        }
    }

    render() {
        return (
            <button onClick={()=>this.props.onClick()}>{this.props.title ? this.props.title : this.state.title}</button>

        )
    }
}

export default ButtonOrder;