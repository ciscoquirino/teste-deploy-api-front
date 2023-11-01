import styles from '../styles/TabelaHistTransacoes.module.css';
import DeleteIcon from '@mui/icons-material/Delete'; // Importe o ícone que deseja usar
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react'; // Importe useState
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

export default function TabelasHistTransacoes() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const [transacoes, setTransacoes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/admTransacoes", {
      method: "GET",
       headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setTransacoes(data)
      })
      .catch((error) => console.log(error));
  }, []);

  const formatarData = (date: string) => {
    const dataformat = new Date(date).toLocaleString('pt-BR');
    return dataformat;
  }

  const index = [1,2,3,4,5];
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentData = transacoes.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (endIndex < transacoes.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      <table className={styles.table}>
        <thead>
          <tr>
            <th style={{width: '5%'}}>Tipo</th>
            <th style={{width: '3%'}}>Data / Hora</th>
            <th style={{width: '3%'}}>Créditos</th>
            <th style={{width: '5%'}}>Parceiro</th>
            <th style={{width: '5%'}}>Estabelecimento</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item: any, index: number) => (
            <tr key={index}>
              <td>{item.tipo}</td>
              <td>{formatarData(item.data)}</td>
              <td>{item.creditos}</td>
              <td>{item.parceiro}</td>
              <td>{item.estabelecimento}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={5}>
              <div style={{ textAlign: 'center' }}>
                <Button
                  startIcon={<KeyboardArrowLeftIcon />}
                  disabled={currentPage === 1}
                  onClick={handlePrevPage}
                  style={{
                    color: currentPage !== 1 ? 'lightblue' : 'lightgray',
                    fontWeight: currentPage !== 1 ? 'bold' : 'normal',
                  }}
                >
                  Anterior
                </Button>
                <Button
                  endIcon={<KeyboardArrowRightIcon />}
                  disabled={endIndex >= transacoes.length}
                  onClick={handleNextPage}
                  style={{
                    color: endIndex < transacoes.length ? 'lightblue' : 'lightgray',
                    fontWeight: endIndex < transacoes.length ? 'bold' : 'normal',
                  }}
                >
                  Próxima
                </Button>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
      <p>ㅤ</p>
      <p>ㅤ</p>
      <p>ㅤ</p>
      <p>ㅤ</p>
    </>
  );
}
