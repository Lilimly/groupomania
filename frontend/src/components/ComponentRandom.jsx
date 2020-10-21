import React from "react";
class ComponentRandom extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            rnd: Math.random()
        }
    }

    render() {
        return <div>
            {this.state.rnd}
        </div>
    }
}

export default ComponentRandom;