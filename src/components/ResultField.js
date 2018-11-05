import React, { Component } from 'react';
import GeneticAlgorithm from '../algorithm/genetic-algorithm';

const ResultRecord = (props) => {
    let simulation = new GeneticAlgorithm(props.target, props.size, props.regenRate, props.mutateRate);
    
    return simulation.run();
}

class ResultField extends Component {
    
    render() {
        const { resultTarget, popSize, regenRate, mutateRate } = this.props;
        
        return (
            <div className="App">
                <p>Using a population size of {popSize}. Regenerating {regenRate*100}% of the population per generation, {mutateRate*100}% chance of mutation for each chromosome.</p>
                <ResultRecord target={resultTarget} size={popSize} regenRate={regenRate} mutateRate={mutateRate} />
            </div>
        );
    }
}

export default ResultField;
