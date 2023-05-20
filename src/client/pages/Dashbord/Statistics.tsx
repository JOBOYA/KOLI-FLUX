import React, { useState } from "react";
import { FcSearch } from "react-icons/fc";
import axios from "axios";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";


const X_RapidAPI_Key: string | undefined = process.env.REACT_APP_X_RapidAPI_Key;
const X_RapidAPI_Host: string | undefined = process.env.REACT_APP_X_RapidAPI_Host;

type Item = {
  id: number;
  Object: {
    title: string;
    bedrooms: number;
    city: string;
    price: number;
    livingArea: number;
    livingAreaUnit: string;
    professional: {
      email: string;
      phoneNumber: number;
    };
    photos: {
      url: string;
    }[];
    medias: {
      url: string;
    }[];
  };
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    padding: "20pt",
  },
  table: {
    format: "table",
    width: "auto",
    margin: "auto",
    borderStyle: "solid",
    borderWidth: "1pt",
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableColHeader: {
    width: "20%",
    borderStyle: "solid",
    borderBottomWidth: "1pt",
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderRightWidth: "1pt",
    backgroundColor: "#f0f0f0",
    textAlign: "center",
    padding: "5pt",
  },
  tableCol: {
    width: "20%",
    borderStyle: "solid",
    borderBottomWidth: "1pt",
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderRightWidth: "1pt",
    textAlign: "center",
    padding: "5pt",
  },
  
});



const PDFTable = ({ items }: { items: Item[] }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}>
              <Text>Titre</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text>Ville</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text>Prix</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text>Email</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text>Téléphone</Text>
            </View>
          </View>
          {items.map((item) => (
            <View key={item.id} style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text>{item.Object.title}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text>{item.Object.city}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text>{item.Object.price}</Text>
              </View>
              <View style={styles.tableCol}>  
                <Text>{item.Object.professional.email}</Text> 
              </View>
              <View style={styles.tableCol}>
                <Text>{item.Object.professional.phoneNumber}</Text>
              </View> 
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

const Table: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);

    const options = {
      method: "GET",
      url: "https://seloger.p.rapidapi.com/properties/list",
      params: {
        zipCodes: searchValue,
        pageIndex: "1",
        pageSize: "50",
        realtyTypes: "1",
        transactionType: "1",
        sortBy: "0",
        includeNewConstructions: "true",
      },
      headers: {
        "x-rapidapi-key": X_RapidAPI_Key,
        "x-rapidapi-host": X_RapidAPI_Host,
      },
    };

    try {
      const response = await axios.request(options);
      const items = response.data.items.map((item: any) => ({
        id: item.id,
        Object: {
          title: item.title,
          bedrooms: item.bedrooms,
          city: item.city,
          price: item.price,
          livingArea: item.livingArea,
          livingAreaUnit: item.livingAreaUnit,
          professional: {
            email: item.professional.email,
            phoneNumber: item.professional.phoneNumber,
          },
          photos: item.photos,
          medias: item.medias,
        },
      }));
      setItems(items);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  
  return (
    <div className="search">
      <div className="search__container">
        <div className="search">
          <input
            type="text"
            placeholder="Rechercher par code postal"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          
            <FcSearch className="search-icon" onClick={handleClick} />
          
        </div>

             
        <div className="search__results">
          {loading ? (
            <p style={{color: "black"}}>Chargement...</p>
          ) : (
            <>
              {items.length > 0 ? (
                <table className="table table-striped table-hover table-responsive">
                  <thead>
                    <tr>
                      <th scope="col">Type</th>
                      <th scope="col">Ville</th>
                      <th scope="col">Prix</th>
                      <th scope="col">Email</th>
                      <th scope="col">Téléphone</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <tr key={item.id}>
                        <td>{item.Object.title}</td>
                        <td>{item.Object.city}</td>
                        <td>{item.Object.price}€</td>
                        <td>{item.Object.professional.email}</td>
                        <td>{item.Object.professional.phoneNumber}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>Aucun résultat.</p>
              )}
              <PDFDownloadLink
                document={<PDFTable items={items} />}
                  fileName="seloger.pdf"
                  style={{
                    textDecoration: "none",
                    padding: "10px",
                    color: "#4a4a4a",
                    backgroundColor: "#f0f0f0",
                    border: "1px solid #4a4a4a",
                  }}

              >
                {({ loading }) =>
                  loading ? "Loading document..." : "Télécharger le PDF"
                }
                </PDFDownloadLink>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Table;
