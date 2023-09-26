import React, { useState } from 'react';
import './stats.css'
import TextField from '@mui/material/TextField';

import SearchIcon from '@mui/icons-material/Search';
import { DataGrid, GridColDef, GridRowId } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import axios from 'axios';
import { jsPDF } from 'jspdf';

const X_RapidAPI_Key: string | undefined = process.env.REACT_APP_X_RapidAPI_Key;
const X_RapidAPI_Host: string | undefined = process.env.REACT_APP_X_RapidAPI_Host;

type Item = {
  id: number;
  title: string;
  city: string;
  price: number;
  email: string;
  phoneNumber: number;
};

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'title', headerName: 'Titre', width: 150 },
  { field: 'city', headerName: 'Ville', width: 150 },
  { field: 'price', headerName: 'Prix', width: 110 },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'phoneNumber', headerName: 'Téléphone', width: 150 },
];

export default function DataGridDemo() {
  const [searchValue, setSearchValue] = useState('');
  const [items, setItems] = useState<Item[]>([]);
  const [selectionModel, setSelectionModel] = useState<GridRowId[]>([]);
  const [showSaveMessage, setShowSaveMessage] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);



  const printDocument = () => {
    const selectedItems = items.filter(item => selectionModel.includes(item.id));
    const doc = new jsPDF();

    selectedItems.forEach((item, index) => {
      doc.text(`ID: ${item.id}`, 10, 10 + index * 10);
      doc.text(`Titre: ${item.title}`, 10, 20 + index * 10);
      doc.text(`Ville: ${item.city}`, 10, 30 + index * 10);
      doc.text(`Prix: ${item.price}`, 10, 40 + index * 10);
      doc.text(`Email: ${item.email}`, 10, 50 + index * 10);
      doc.text(`Téléphone: ${item.phoneNumber}`, 10, 60 + index * 10);

      // Add more fields as needed...
    });

    doc.save('output.pdf');
  };




  const handleClick = async () => {
    const options = {
      method: 'GET',
      url: 'https://seloger.p.rapidapi.com/properties/list',
      params: {
        zipCodes: searchValue,
        pageIndex: '1',
        pageSize: '50',
        realtyTypes: '1',
        transactionType: '1',
        sortBy: '0',
        includeNewConstructions: 'true',
      },
      headers: {
        'x-rapidapi-key': X_RapidAPI_Key,
        'x-rapidapi-host': X_RapidAPI_Host,
      },
    };

    try {
      const response = await axios.request(options);
      const items = response.data.items.map((item: any) => ({
        id: item.id,
        title: item.title,
        city: item.city,
        price: item.price,
        email: item.professional.email,
        phoneNumber: item.professional.phoneNumber,
      }));
      setItems(items);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRowSelectionModelChange = (newSelectionModel: GridRowId[]) => {
    setSelectionModel(newSelectionModel);
    setShowSaveMessage(newSelectionModel.length > 1);
    setShowSuccessMessage(false);
    sessionStorage.setItem('selectedItems', JSON.stringify(newSelectionModel));
  };

  return (
    <>
      <TextField
      style={{ marginTop: 30 , marginLeft: 20, width: '50%'}}
        id="outlined-basic"
        label="Rechercher par code postal"
        variant="outlined"
        value={searchValue}
        onChange={e => setSearchValue(e.target.value)}
        onKeyPress={e => e.key === 'Enter' && handleClick()}
        fullWidth
        InputProps={{
          endAdornment: (
           
              <SearchIcon
                onClick={handleClick}
                style={{ cursor: 'pointer', marginTop: 30 }}
              />
           
          ),
        }}
      />
      {showSaveMessage && (
        <div style={{ margin: '20px 0', color: 'red' }}>
          Sélectionnez un seul élément pour pouvoir sauvegarder.
        </div>
      )}
      {showSuccessMessage && (
        <div style={{ margin: '20px 0', color: 'green' }}>
          Éléments sauvegardés avec succès !
        </div>
      )}
      {selectionModel.length > 0 && !showSaveMessage && !showSuccessMessage && (
        <>

          <Button
            onClick={printDocument}
            variant="contained"
            style={{
              marginTop: 30,
              marginLeft: 20,
              backgroundColor: '#3f51b5',
              color: 'white',
              width: 150,
              height: 50,
            }}
          >
            Télécharger
          </Button>
        </>
      )}
      <DataGrid
        style={{ marginTop: 30}}
        rows={items}
        columns={columns}
        checkboxSelection
        disableRowSelectionOnClick
        onRowSelectionModelChange={handleRowSelectionModelChange}
        rowSelectionModel={selectionModel}
        pagination
        
      
      />
    </>
  );
}
