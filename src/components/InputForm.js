import React, { Component } from 'react';
import ResultField from './ResultField';

class InputForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            resultTarget:'Nguyen Ngoc Long Phung',
            popSize:'1000',
            regenRate:'0.75',
            mutateRate:'0.01',
            simStart: false
        }
    }

    handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            [name]: value
        })
    }

    handleChangeRate = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            [name]: value/100
        })
    }

    handleInput = () => {
        this.setState({simStart: true})
    }

    handleReset = () => {
        this.setState({
            resultTarget:'Nguyen Ngoc Long Phung',
            popSize:'1000',
            regenRate:'0.75',
            mutateRate:'0.01',
            simStart: false
        }) 
    }

    render() {
        const { resultTarget, popSize, regenRate, mutateRate, simStart } = this.state;

        let startSim = simStart ? (<ResultField resultTarget={resultTarget} popSize={popSize} regenRate={regenRate} mutateRate={mutateRate} handler={this.handleReset} />) : (null);

        return (
            <div className="App">
                <label>
                    Target
                    <br />
                    <input type="text" name="resultTarget" onChange={this.handleChange} value={resultTarget} />
                    <br />
                </label>
                
                <label>
                    Population Size
                    <br />
                    <input type="text" name="popSize" onChange={this.handleChange} value={popSize} />
                    <br />
                </label>
               
                <label>
                    Regeneration Rate
                    <br />
                    <input type="text" name="regenRate" onChange={this.handleChangeRate} value={regenRate*100} />
                    <br />
                </label>
               
                <label>
                    Mutation Rate
                    <br />
                    <input type="text" name="mutateRate" onChange={this.handleChangeRate} value={mutateRate*100} />
                    <br />
                </label>
                
                <button onClick={this.handleInput} >Start Simulation</button>
                <button onClick={this.handleReset} >Reset</button>
                
                {startSim}
            </div>
        );
  }
}

export default InputForm;
