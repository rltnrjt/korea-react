import { useState } from 'react';

const SumExam = () => {

    const [num1, setNum1] = useState('');
    const [num2, setNum2] = useState('');
    const [result, setResult] = useState(null);

    const calcSum = () => {
        setResult(Number(num1) + Number(num2));
    };

    return (
        <div>
            <input
                type="number"
                value={num1}
                onChange={(e) => setNum1(e.target.value)}
                placeholder="첫 번째 수"
            />
            <input
                type="number"
                value={num2}
                onChange={(e) => setNum2(e.target.value)}
                placeholder="두 번째 수"
            />
            <button type="button" onClick={calcSum}>합계</button>
            {result !== null && <p>결과 : {result}</p>}
        </div>
    );
};

export default SumExam;