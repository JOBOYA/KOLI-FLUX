import React, { useState } from 'react';
import { PropagateLoader } from 'react-spinners';
import { FcSearch } from 'react-icons/fc';
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
  const [isLoading, setIsLoading] = useState(false);




  const printDocument = () => {
    const selectedItems = items.filter(item => selectionModel.includes(item.id));
    const doc = new jsPDF();
    let yPosition = 10;

    selectedItems.forEach((item) => {
      doc.text(`ID: ${item.id}`, 10, yPosition);
      yPosition += 10;
      doc.text(`Titre: ${item.title}`, 10, yPosition);
      yPosition += 10;
      doc.text(`Ville: ${item.city}`, 10, yPosition);
      yPosition += 10;
      doc.text(`Prix: ${item.price}`, 10, yPosition);
      yPosition += 10;
      doc.text(`Email: ${item.email}`, 10, yPosition);
      yPosition += 10;
      doc.text(`Téléphone: ${item.phoneNumber}`, 10, yPosition);
      yPosition += 20; // add some extra space before next item
    });

    doc.save('output.pdf');
  };





  const handleClick = async () => {
    setIsLoading(true);
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
      setIsLoading(false);
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
      setIsLoading(false);
    }
  };

  const handleRowSelectionModelChange = (newSelectionModel: GridRowId[]) => {
    setSelectionModel(newSelectionModel);

  };

  return (
    <>
      <div className="custom-search">
        <div className="custom-search__container">
          <div className="custom-search__input-container">
            <input
              className="custom-search__input"
              type="text"
              placeholder="Code Postal"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <FcSearch className="custom-search__icon" onClick={handleClick} />
          </div>
        </div>
      </div>
      {isLoading && (
        <div className="loader-container">
          <PropagateLoader color="#4467c7" />
        </div>
      )}


      {selectionModel.length > 0 && (
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
        style={{ marginTop: 30 }}
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
