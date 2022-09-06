import { render } from 'react-dom';
import './index.css';
import * as React from 'react';
import { SpreadsheetComponent, SheetsDirective, SheetDirective, ColumnsDirective, RangesDirective, RangeDirective, RowsDirective, RowDirective, CellsDirective, CellDirective, ColumnDirective } from '@syncfusion/ej2-react-spreadsheet';
import {getRangeAddress } from '@syncfusion/ej2-spreadsheet';
import { defaultData } from './data';
import { SampleBase } from './sample-base';
import axios from 'axios';

/**
 * Default Spreadsheet sample
 */
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
        const adreses = []
        const inventory = []
        
        
        
   
      await  this.spreadsheet.getData('Transaction'+'!'+'C1:D'+useTransIdx).then((cells)=>{
           // console.log(cells)
            cells.forEach((cell, key)=>{
                adreses.push(cell.value);   
                 })
        })
        
      await  this.spreadsheet.getData('Inventory'+'!'+'G1:H'+useInvetIdx).then((cells)=>{
            cells.forEach((cell, key)=>{
                inventory.push(cell.value);   
        })        
        })
        
        const data = {
            'adreses':adreses,'inventory':inventory
            };

        console.log('dataaaaaaaaaaa >>>>',data);
       const rezolt_data = await  axios.post('https://lost-goods.herokuapp.com/genadres/api/',  data ,)
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