import React, { useState } from "react";

const BMICalculator = () => {
    const initialWeight = 0;
    const initialHeight = 0;

    const [localWeight, setLocalWeight] = useState<number>(0);
    const [localHeight, setLocalHeight] = useState<number>(0);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [bmiResult, setBMIResult] = useState<string>("");

    function calculateBMI(weight: number, height: number): number {
        return weight / (height ** 2);
    }

    function rankingBMI(bmi: number): string {
        if (bmi < 18.5) {
            return `Seu IMC é ${bmi.toFixed(2)} e você está abaixo do peso.`;
        } else if (bmi >= 18.5 && bmi <= 24.9) {
            return `Seu IMC é ${bmi.toFixed(2)} e você está com o peso NORMAL.`;
        } else if (bmi >= 25.0 && bmi <= 29.9) {
            return `Seu IMC é ${bmi.toFixed(2)} e você está com SOBREPESO.`;
        } else if (bmi >= 30.0 && bmi <= 39.9) {
            return `Seu IMC é ${bmi.toFixed(2)} e você está com OBESIDADE II.`;
        } else {
            return `Seu IMC é ${bmi.toFixed(2)} e você está com OBESIDADE GRAVE.`;
        }
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading(true);
        setTimeout(() => {
            const bmi = calculateBMI(localWeight, localHeight);
            const bmiRank = rankingBMI(bmi);
            setBMIResult(bmiRank);
            setLoading(false);

            setLocalWeight(initialWeight);
            setLocalHeight(initialHeight);
        }, 3000);
    }

    return (
      <div className="container">
          <h1 className="title">Cálculo de IMC</h1>
          <p className="text">
              Venha calcular o seu <strong>Índice de Massa Corporal</strong>.
          </p>
          <form onSubmit={handleSubmit} className="form">
              <div>
                <label className="form-label">Inform seu peso em kg:</label>
                <input
                  className="form-input" 
                  type="number" 
                  value={localWeight}
                  onChange={(event) => setLocalWeight(parseFloat(event.target.value))} 
                  required
                  min={1}
                />
              </div>
              <div>
                <label className="form-label">Inform sua altura:</label>
                <input
                    className="form-input"  
                    type="number"
                    value={localHeight}
                    onChange={(event) => setLocalHeight(parseFloat(event.target.value))}
                    required
                  />
              </div>
              <button className="form-button" type="submit">Calcular</button>
          </form>
          <p className="text-result">{isLoading ? <h2 className="-small-title">Processando os dados...</h2> : <span className="result">{ bmiResult }</span>}</p>
          <span className="small-text">Essa calssificação não e valida para massa muscular, poi tem que levar outros fatores em consideração.</span>
      </div>
    );
};

function App() {
    return <BMICalculator />;
}

export default App;
