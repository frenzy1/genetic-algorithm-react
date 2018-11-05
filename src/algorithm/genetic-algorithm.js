import React from 'react';

class GeneticAlgorithm {
    constructor (target, popSize, regenRate, mutateRate) {
        this.target = target;
        this.popSize = popSize;
        this.regenRate = regenRate;
        this.mutateRate = mutateRate;
    }

    generateCharacter = () => String.fromCharCode(Math.floor(Math.random() * 94) + 32);

    generatePopulation = (size) => {
        let p = []; // population
        for (let i = 0; i < size; i++) {
            let indiv = ''; // character 
            for (let c of this.target) {
                indiv += this.generateCharacter();
            }
            p.push(indiv)
        }
        return p
    }

    checkFitness = (indiv) => {
        let r = {value: indiv, score: 0};
        for (let i = 0; i < indiv.length; i++) {
            if (r.value[i] === this.target[i]) {
                r.score++
            } 
        }
        return r;
    };

    breed = (indiv1, indiv2) => {
        let child = '';
        for (let i in this.target) {
            if (Math.random() < this.mutateRate) {
                child += this.generateCharacter(); 
            } else  {
                if (Math.random() < 0.5) {
                    child += indiv1[i]
                } else {
                    child += indiv2[i]
                }
            }
        }
        return child;
    }

    selectParent = (p, totalScore) => {
        let selection = Math.random() * totalScore;
        let partialSum = 0;
        for (let i of p) {
            partialSum += i.score;
            if (selection <= partialSum) {
                return i;
            }
        }
    }
    
    run = () => {
        let generation = 0;
        let population = this.generatePopulation(this.popSize);
        let resultList = [];

        do {
            generation += 1;
            let results = population.map(this.checkFitness).sort((x, y) => y.score - x.score);
            
            if (results[0].value !== this.target) {
                //Take elders
                let elders = results.splice(0, this.popSize * (1 - this.regenRate));
                //Selection and breeding
                population = elders.map(indiv => indiv.value);
                let totalScore = elders.reduce((total, indiv) => total + indiv.score, 0);

                for (let i = 0; i < this.popSize * this.regenRate; ++i) {
                    population.push(this.breed(this.selectParent(elders, totalScore).value, this.selectParent(elders, totalScore).value));
                }
            } else {
                population = results.map(indiv => indiv.value)
            }

            resultList.push({
                generation: generation,
                highestScoreIndiv: population[0],
                score: results[0].score
            });
        } while (population[0] !== this.target);
        console.log(resultList);
        return (<div>{resultList.map((value) => (
            <div key={value.generation.toString()} >Generation {value.generation}: '{value.highestScoreIndiv}'. Score: {value.score}</div>
        ))}</div>)
    }
}

export default GeneticAlgorithm;