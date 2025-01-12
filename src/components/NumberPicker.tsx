import { useState } from 'react';
import styles from './NumberPicker.module.css';

type BingoColumn = 'B' | 'I' | 'N' | 'G' | 'O';

export function NumberPicker() {
  const [number, setNumber] = useState<number | null>(null); 
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [drawnNumbers, setDrawnNumbers] = useState<{
    B: number[];
    I: number[];
    N: number[];
    G: number[];
    O: number[];
  }>({
    B: [],
    I: [],
    N: [],
    G: [],
    O: [],
  });

  const getLetterForNumber = (num: number): BingoColumn => {
    if (num >= 1 && num <= 15) return 'B';
    if (num >= 16 && num <= 30) return 'I';
    if (num >= 31 && num <= 45) return 'N';
    if (num >= 46 && num <= 60) return 'G';
    if (num >= 61 && num <= 75) return 'O';
    return 'B';
  };

  const sortNumber = (): void => {
    if (Object.values(drawnNumbers).flat().length === 75) {
      alert('Todos os números já foram sorteados!');
      return;
    }

    setNumber(null);
    setIsSpinning(true);

    setTimeout(() => {
      let sortedNumber = Math.floor(Math.random() * 75) + 1; 

      while (Object.values(drawnNumbers).flat().includes(sortedNumber)) {
        sortedNumber = Math.floor(Math.random() * 75) + 1; 
      }

      const letra: BingoColumn = getLetterForNumber(sortedNumber);
      setDrawnNumbers(prevNumbers => ({
        ...prevNumbers,
        [letra]: [...prevNumbers[letra], sortedNumber],
      }));

      setNumber(sortedNumber);
      setIsSpinning(false);
    }, 1000);
  };

  return (
    <div className={styles.container}>
      <button onClick={sortNumber} className={styles.button}>
        Sortear Número
      </button>

      {/* Animação da roleta */}
      <div className={`${styles.roulette} ${isSpinning ? styles.spinning : ''}`}>
        {/* Bola preta onde o número será exibido */}
        <div className={styles.blackBall}>
          <div className={styles.numberDisplay}>
            {/* Exibe a letra acima e o número abaixo */}
            {isSpinning ? (
              <span className={styles.questionMark}>?</span>
            ) : (
              <>
                <div className={styles.letter}>{getLetterForNumber(number!)}</div>
                <div className={styles.number}>{number}</div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Tabela com os números sorteados */}
      <div className={styles.table}>
        <table>
          <thead>
            <tr>
              <th>B</th>
              <th>I</th>
              <th>N</th>
              <th>G</th>
              <th>O</th>
            </tr>
          </thead>
          <tbody>
            {/* Preenche as linhas da tabela com os números sorteados */}
            <tr>
              <td>{drawnNumbers.B.join(', ')}</td>
              <td>{drawnNumbers.I.join(', ')}</td>
              <td>{drawnNumbers.N.join(', ')}</td>
              <td>{drawnNumbers.G.join(', ')}</td>
              <td>{drawnNumbers.O.join(', ')}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}