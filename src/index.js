import { render } from 'react-dom';

import './index.css';
import * as React from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

// import { useRouter } from 'next/router';

import { SpreadsheetComponent, SheetsDirective, SheetDirective, ColumnsDirective, RangesDirective, RangeDirective, RowsDirective, RowDirective, CellsDirective, CellDirective, ColumnDirective } from '@syncfusion/ej2-react-spreadsheet';
import {getRangeAddress } from '@syncfusion/ej2-spreadsheet';
import { defaultData } from './data';
import { SampleBase } from './sample-base';
import axios from 'axios';

/**
 * Default Spreadsheet sample
 */
function getNextLetter(letter) {
    const nextCharCode = letter.charCodeAt(0) + 1;
    return String.fromCharCode(nextCharCode);
  }

export class Default extends SampleBase {
    constructor() {
        super(...arguments);
        this.boldRight = { fontWeight: 'bold', textAlign: 'right' };
        this.bold = { fontWeight: 'bold' };
        
        this.state = {rezolt: []}
        
        // super(...arguments);
        // this.scrollSettings = { isFinite: true };
    }
    onCreated() {
        
    }
   

    async getData1(){
        var useTransIdx = this.spreadsheet.sheets[0].usedRange.rowIndex;
        var useInvetIdx = this.spreadsheet.sheets[1].usedRange.rowIndex;
        var useInvetArhIdx = this.spreadsheet.sheets[2].usedRange.rowIndex;
        const adreses = []
        const inventory_adreses = []
        const inventory_qtys = []
        const adreses_archive = [] 

        // const params = new URLSearchParams(paramsString); 
        // const tags = params.get('tape_of_delivery');

        // console.log(tags)
        const parsed = queryString.parse(location.search);

        const from_location = parsed.from_location;
        const to_location = parsed.to_location;
        const from_location_arc = parsed.from_location_arc;
        const to_location_arc = parsed.to_location_arc;
        const inventory_adres = parsed.inventory_adres;
        const inventory_qty = parsed.inventory_qty;

    //    await  this.spreadsheet.getData('Transaction'+'!'+`${from_location}1:${getNextLetter(from_location)}`+useTransIdx).then((cells)=>{
    await  this.spreadsheet.getData('Transaction'+'!'+`${from_location}1:${from_location}`+useTransIdx).then((cells)=>{
           
            cells.forEach((cell, key)=>{
                adreses.push(cell.value);   
                 })
        })

    await  this.spreadsheet.getData('Transaction'+'!'+`${to_location}1:${to_location}`+useTransIdx).then((cells)=>{
           
            cells.forEach((cell, key)=>{
                adreses.push(cell.value);   
                 })
        })
        
    await  this.spreadsheet.getData('Inventory'+'!'+`${inventory_adres}1:${inventory_adres}`+useInvetIdx).then((cells)=>{
            cells.forEach((cell, key)=>{
                inventory_adreses.push(cell.value);   
                })        
        })

    await  this.spreadsheet.getData('Inventory'+'!'+`${inventory_qty}1:${inventory_qty}`+useInvetIdx).then((cells)=>{
            cells.forEach((cell, key)=>{
                inventory_qtys.push(cell.value);   
                })        
        })

    await  this.spreadsheet.getData('Archive'+'!'+`${from_location_arc}1:${from_location_arc}`+useInvetArhIdx).then((cells)=>{
            // console.log(cells)
             cells.forEach((cell, key)=>{
                adreses_archive.push(cell.value);   
                })
        })
    await  this.spreadsheet.getData('Archive'+'!'+`${to_location_arc}1:${to_location_arc}`+useInvetArhIdx).then((cells)=>{
            // console.log(cells)
             cells.forEach((cell, key)=>{
                adreses_archive.push(cell.value);   
                })
        })
    
        
        const data = {
            'adreses':adreses,
            'inventory_adreses':inventory_adreses,
            'inventory_qtys':inventory_qtys,
            'adreses_archive':adreses_archive
            };

        console.log('dataaaaaaaaaaa >>>>',data);
    //    const rezolt_data = await  axios.post('https://loastgoods-production.up.railway.app/genadres/api/',  data ,)
       const rezolt_data = await  axios.post('https://loast-goods.onrender.com/genadres/api/',  data ,)


    //    const rezolt_data = await  axios.post('http://127.0.0.1:8000/genadres/api/',  data ,)
       console.log(rezolt_data.data['list_adreses'])
       this.setState({rezolt: rezolt_data.data['list_adreses'] })
       console.log(this.rezolt)
            // .then(res => {
            //   //console.log(res);
            //   console.log(res.data);
            // });

        // if(inventory.length > 0 && adreses.lengt> 0){
        //     console.log("OKKKKKKK")
        //     await  axios.post('http://127.0.0.1:8000/genadres/api/',  data ,)
        //     .then(res => {
        //       console.log(res);
        //       console.log(res.data);
        //     });
        // }

    }
    render() {
        
        return (<div className='control-pane'>
                
                
                <div className='control-section spreadsheet-control'>
                    <SpreadsheetComponent openUrl='https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/open' saveUrl='https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/save' ref={(ssObj) => { this.spreadsheet = ssObj; }} created={this.onCreated.bind(this)}>
                     
                    <SheetsDirective>
                    <SheetDirective name='Transaction'></SheetDirective> 
                    <SheetDirective name='Inventory' ></SheetDirective> 
                    <SheetDirective name='Archive'></SheetDirective>
                    </SheetsDirective>
                    </SpreadsheetComponent>

                    <button className="e-btn" onClick={this.getData1.bind(this)}>Get Data</button>
                    <br></br>
                    <br></br>
                    {this.state.rezolt && 
                    
                    <div>
                            <ul>
                                    {
                                    this.state.rezolt.map((elem) => {
                                        return (
                                        <p><span>{elem}</span></p>
                                        )
                                    })
                                    }
                            </ul>
                    </div>
                }
                   
                </div>
                <br></br>
                
            </div>
            );
    }
}

render(<Default />, document.getElementById('sample'));